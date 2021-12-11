using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OBJ;
using BUS;

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
        public void InsertCart(Cart cart)
        {
            cartBUS.InsertCart(cart);
        }
        public string GetCart(string userID)
        {
            return cartBUS.GetCart(userID);
        }
    }
}