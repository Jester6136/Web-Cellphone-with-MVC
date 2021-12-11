using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OBJ;
using BUS;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CellphoneS.Areas.Administrator.Controllers
{
    public class ProductController : Controller
    {
        ProductBUS productBUS = new ProductBUS();
        // GET: Administrator/Product
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetProductsByCategory(string categoryID)
        {
            List<ProductAdmin> products = productBUS.GetProductsByCategory(categoryID);
            return Json(products, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetMemoriesDetailADMIN(string productID)
        {
            List<MemoriesDetailADMIN> productdetails = productBUS.GetMemoriesDetailADMIN(productID);
            return Json(productdetails, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetProductDetailsADMIN(string memoryID)
        {
            List<ProductDetailsADMIN> productdetails = productBUS.GetProductDetailsADMIN(memoryID);
            return Json(productdetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UploadImage()
        {
            List<string> l = new List<string>();
            string path = Server.MapPath("~/assets/images/");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            foreach(string key in Request.Files)
            {
                HttpPostedFileBase pf = Request.Files[key];
                pf.SaveAs(path + pf.FileName);
                l.Add(pf.FileName);
            }
            return Json(l, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InsertProduct(string p)
        {
            ProductMemosColors obj = JsonConvert.DeserializeObject<ProductMemosColors>(p);
            //productBUS.InsertProductMemosColors(obj);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetNextProductID()
        {
            return Json(JObject.Parse(productBUS.GetNextProductID()), JsonRequestBehavior.AllowGet);
        }
    }
}