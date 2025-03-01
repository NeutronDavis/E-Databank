using System.Text;
using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.General;
using EDataBank.Core.Enums;
using EDataBank.Core.Views;
using EDataBank.Web.Api.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;


namespace EDataBank.Web.Api.Api;

[Route("api/[controller]")]
[AuthorizeUser]
public class FeedbackController : BaseApiController
{
  private readonly IFeedbackService _feedbackService;

  private readonly ILogger<FeedbackController> _logger;

  public FeedbackController(IFeedbackService feedbackService ,ILogger<FeedbackController> logger)
  {
    _feedbackService = feedbackService;
    _logger = logger;
  }

	 [HttpGet("[action]")]
  public IActionResult LoadFeedbackProfile()
  {

    try
    {
      var feedbacks =  _feedbackService.GetFeedbackAsync();

      ////this is returned to the inteface base on user that logs , in react the user is store in the localstorage currentUser, register your self and create an account then ypu shuold get local mail
      ///get your otp and validate your account 
      ///then login to create your user object that is store in local storage , from there you can get  your userId
      ///study the main controller for more information
      ///
      List<FeedbackView> feeeds = new List<FeedbackView>();
      foreach (var feedback in feedbacks)
      {
        FeedbackView feedsView = new FeedbackView();
        feedsView.FeedbackText = feedback.FeedbackText;
        feedsView.FeedbackId = feedback.FeedbackId;
        feedsView.FeedbackCategory = feedback.FeedbackCategory;
        feedsView.UserEmail = feedback.UserEmail;
        feedsView.FeedbackStatus = (FeedbackStatus)feedback.FeedbackStatus;
        feedsView.FeedbackOpenDate = feedback.FeedbackOpenDate;
        feedsView.FeedbackStatusChangeDate = feedback.FeedbackStatusChangeDate;
        feedsView.FeedbackActionTaken = feedback.FeedbackActionTaken;

        if (feedback.FeedbackAttachment != null)
        {
          //convert byte array to base64 string
          string feedStrUrl = Encoding.Default.GetString(feedback.FeedbackAttachment);
          feedsView.FeedbackAttachment = feedStrUrl;

        }

        feeeds.Add(feedsView);
      }

      return Ok(new { status = true, data = feeeds });
    }
    catch (Exception ex)
    {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { success = false, msg = "invalid data was supplied" });
    }
    
  
  }
  [HttpPost("[action]")]
  public async Task<IActionResult> Feedback([FromBody] JObject param)
  {
    try
    {
      string urlSring = param["base64String"]!.ToObject<string>()!;
      var data = param["feedbackData"]!.ToObject<Feedback>()!;
      if (data == null) return BadRequest(new { status = false, msg = "request form cannot be empty" });
      data.FeedbackStatus = data.FeedbackCategory!.Equals("Praise/thumbs up") ? FeedbackStatus.Close : FeedbackStatus.Open;
      data.FeedbackOpenDate = DateTime.Now;
      if (!string.IsNullOrEmpty(urlSring))
      {
        //reading all characters as byte and storing them to byte[]
        byte[] attachment = Encoding.ASCII.GetBytes(urlSring);
        data.FeedbackAttachment = attachment;

      }
     
      await _feedbackService.sendFeedback(data);
      return Ok(new { status = true, msg = "Feedback Successfully Sent" });

    }
    catch (Exception ex)
    {
#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { status = false, msg = ex.Message });
    }
  }

  [HttpPost("[action]")]
	public async Task<IActionResult> UpdateFeedback([FromBody] JObject param)
	{
        try
        {
            string? submitType = param["submitType"]!.ToObject<string>();
            string? actionTaken = param["feedbackText"]!.ToObject<string>();
             int feedbackId = param["feedbackId"]!.ToObject<int>();
            var feedbackInfo = await _feedbackService.FindFeedbackByIdAsync(feedbackId);
            if (feedbackInfo == null)
            {
              return NotFound();
            }
            if (submitType == "save")
            {
                  feedbackInfo.FeedbackActionTaken = actionTaken;
                  feedbackInfo.FeedbackStatus = FeedbackStatus.InProgress;
                   await _feedbackService.UpdateFeedbackAsync(feedbackInfo);
            }
            else
            {
                feedbackInfo.FeedbackActionTaken = actionTaken;
                feedbackInfo.FeedbackStatus = FeedbackStatus.Close;
                await _feedbackService.UpdateFeedbackAsync(feedbackInfo);
            }

            return Ok(new {status = true, msg = "Feedback updated Successfully" });
         
        }
        catch (Exception ex)
        {

#pragma warning disable CA2254 // Template should be a static expression
            _logger.Log(LogLevel.Error, ex.Message);
#pragma warning restore CA2254 // Template should be a static expression
            return BadRequest(new { status = false, msg = ex.Message });
        }
	}

}
