using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using BUS;
using OBJ;
using Newtonsoft.Json.Linq;
using System.Web.Security;
using Newtonsoft.Json;

namespace CellphoneS.Controllers
{
    public class HomeController : Controller
    {
        MenuBUS menuBUS = new MenuBUS();
        CustomerBUS customerBUS = new CustomerBUS();
        ProductBUS productBUS = new ProductBUS();
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

        [HttpGet]
        public JsonResult GetTop15ProductPhone()
        {
            return Json(productBUS.GetTop15ProductPhone(), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult Logout()
        {
            Session.Remove("login");
            Session.Remove("khach");
            return Json(0, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult Login(string us, string pw, bool rp)
        {
            Customer u = customerBUS.CheckCustomer(us, pw);

            if (u == null)   //DN ko thành công
            {
                Session["login"] = "0";
                Session["khach"] = "";
            }
            else             //DN thành công
            {
                if (!rp)
                {
                    u.Password = "";
                }
                Session["login"] = "1";
                Session["khach"] = JsonConvert.SerializeObject(u);
                Session.Timeout = 360;
            }
            //return Json(new { login = "1", Khach = u }, JsonRequestBehavior.AllowGet);
            return Json(new { login = Session["login"], Khach = u }, JsonRequestBehavior.AllowGet);
        }
    }
}