using System.Diagnostics.Contracts;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.IdentityModel.Tokens;
using EDataBank.Application.Interfaces;
using Microsoft.Extensions.Configuration;

namespace EDataBank.Web.Api.Filters;
[System.AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true)]
public class AuthorizeUserAttribute : Attribute, IAuthorizationFilter
{

    private const string jwtSec = "THISISUSEDTOSIGNANDVERIFYJWTTOKENSREPLACEITWITHYOUROWNSECRETITCANBEANYSTRING";



    public void OnAuthorization(AuthorizationFilterContext context)
  {

    try
    {
      string? authorization = context.HttpContext.Request.Headers["authorization"];
      string? userId = context.HttpContext.Request.Headers["specimen"];

      var allowAnonymous = context.ActionDescriptor.EndpointMetadata.Where(x=>x is AllowAnonymousAttribute).Any();
      if(allowAnonymous)
      {
        return;
      }


      if (!string.IsNullOrEmpty(authorization))
      {
        var tokenString = authorization.Split(" ").LastOrDefault(string.Empty);
        var isValidToken = ValidateCurrentToken(tokenString);
        var claimUserId = GetClaim(tokenString, "unique_name");
        var userService = context.HttpContext.RequestServices.GetService<IUserService>();
        if (!isValidToken || string.IsNullOrEmpty(claimUserId) || userId != claimUserId || userService?.GetUserViewById(claimUserId) == null)
        {
          context.Result = new StatusCodeResult((int)System.Net.HttpStatusCode.Forbidden);
          return;
        }

      }
      else
      {
        context.Result = new StatusCodeResult((int)System.Net.HttpStatusCode.Forbidden);
        return;
      }
    }
    catch (Exception ex)
    {

      context.Result = new StatusCodeResult((int)System.Net.HttpStatusCode.Forbidden);
            return;
        }
    }

    public bool ValidateCurrentToken(string token)
    {
        var key = Encoding.ASCII.GetBytes(jwtSec);
        var tokenHandler = new JwtSecurityTokenHandler();
    try
    {
      tokenHandler.ValidateToken(token, new TokenValidationParameters
      {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = false,
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(key)
      }, out SecurityToken validatedToken);
    }
    catch
    {
      return false;
    }
    return true;
  }


  public string? GetClaim(string token, string claimType)
  {

    var tokenHandler = new JwtSecurityTokenHandler();
    var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

    var stringClaimValue = securityToken?.Claims.First(claim => claim.Type == claimType).Value ?? "";
    return stringClaimValue;
  }
}


