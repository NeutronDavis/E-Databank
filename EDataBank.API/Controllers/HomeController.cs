﻿using Microsoft.AspNetCore.Mvc;

using System.Diagnostics;

namespace EDataBank.API.Controllers
{
    /// <summary>
    /// A sample MVC controller that uses views.
    /// Razor Pages provides a better way to manage view-based content, since the behavior, viewmodel, and view are all in one place,
    /// rather than spread between 3 different folders in your Web project. Look in /Pages to see examples.
    /// See: https://ardalis.com/aspnet-core-razor-pages-%E2%80%93-worth-checking-out/
    /// </summary>
    public class HomeController : Controller
    {
       
        public IActionResult Index()
        {
            return View();
        }
    }
}