using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using BUS;
using OBJ;
using Newtonsoft.Json.Linq;

namespace CellphoneS.Controllers
{
    public class ProductController : Controller
    {
        ProductBUS productBUS = new ProductBUS();
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ProductsBrand()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetProductsBrand(string categoryID, string brandID)
        {
            List<Product> products = productBUS.GetProductsBrand(categoryID, brandID);
            return Json(products, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetProductsbyBrandPagination(int pageIndex, int pageSize, string productName, string categoryID, string brandID)
        {
            ListProduct listProduct = productBUS.GetProductsbyBrandPagination(pageIndex, pageSize, productName, categoryID, brandID);
            return Json(listProduct, JsonRequestBehavior.AllowGet);
        }
    }
}