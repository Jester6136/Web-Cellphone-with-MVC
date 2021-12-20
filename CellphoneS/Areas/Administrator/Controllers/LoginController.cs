using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using BUS;
using Newtonsoft.Json;
using OBJ;

namespace CellphoneS.Areas.Administrator.Controllers
{
    [AllowAnonymous]
    public class LoginController : Controller
    {
        StaffBUS staffBUS = new StaffBUS();
        // GET: Administrator/Login
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        public JsonResult CheckStaff(string id,string pas)
        {
            string result = staffBUS.CheckStaff(id, pas);
            if (result == "")
            {
                Staff obj = JsonConvert.DeserializeObject<Staff>(result.Substring(1, result.Length - 2));
                return Json(obj, JsonRequestBehavior.AllowGet);
            }
            else
            {
                FormsAuthentication.SetAuthCookie(id, false);
                Staff obj = JsonConvert.DeserializeObject<Staff>(result.Substring(1, result.Length - 2));
                return Json(obj, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login");
        }       
    }
}