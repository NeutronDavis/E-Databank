
using System.Globalization;
using EDataBank.Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace EDataBank.Core.Views;

public class FeedbackView
{
  public int FeedbackId { get; set; }

  public string? UserEmail { get; set; }

  public string? FeedbackAttachment { get; set; }

  public string? FeedbackCategory { get; set; }

  public string? FeedbackText { get; set; }

  public string? FeedbackActionTaken { get; set; }

  public FeedbackStatus FeedbackStatus { get; set; }
  public DateTime FeedbackOpenDate { get; set; }

  public DateTime FeedbackStatusChangeDate { get; set; }

}

