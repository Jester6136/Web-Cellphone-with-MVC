using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using BUS;
using Newtonsoft.Json.Linq;

namespace CellphoneS.Controllers
{
    public class HomeController : Controller
    {
        MenuBUS menuBUS = new MenuBUS();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpGet]
        public JsonResult GetMenu()
        {
            string menu = menuBUS.GetMenu();
            return Json(menu, JsonRequestBehavior.AllowGet);
        }
    }
}