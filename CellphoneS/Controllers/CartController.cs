using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OBJ;
using BUS;
using Newtonsoft.Json;

namespace CellphoneS.Controllers
{
    public class CartController : Controller
    {
        CartBUS cartBUS = new CartBUS();
        // GET: Cart
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public void InsertCart(string cart)
        {
            Cart obj = JsonConvert.DeserializeObject<Cart>(cart);
            cartBUS.InsertCart(obj);
        }
        public JsonResult GetCart(string userID)
        {
            return Json(cartBUS.GetCart(userID),JsonRequestBehavior.AllowGet);
        }
        public void DeleteCart(string cartID)
        {
            cartBUS.DeleteCart(cartID);
        }

    }
}