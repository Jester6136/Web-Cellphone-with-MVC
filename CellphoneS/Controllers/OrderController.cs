using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BUS;

namespace CellphoneS.Controllers
{
    public class OrderController : Controller
    {
        OrderBUS orderBUS = new OrderBUS();
        // GET: Order
        public ActionResult Index()
        {
            return View();
        }
        public void InsertOrder(string json)
        {
            orderBUS.InsertOrder(json);
        }
    }
}