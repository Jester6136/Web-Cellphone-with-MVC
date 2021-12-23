using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web;
using System.Web.Mvc;
using OBJ;
using BUS;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CellphoneS.Areas.Administrator.Controllers
{
    [Authorize]
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
            productBUS.InsertProductMemosColors(obj);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetNextProductID()
        {
            return Json(productBUS.GetNextProductID(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCategoryBrandADMIN()
        {
            return Json(productBUS.GetCategoryBrandADMIN(), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetProductDetail(string productID)
        {
            string json = productBUS.GetProductDetail(productID);
            return Json(json, JsonRequestBehavior.AllowGet);
        }
        public void EditProduct(string id, string name, string date, string imageName)
        {
            productBUS.EditProduct(id, name, date, imageName);
        }
        [HttpPost]
        public void EditMemory(string memoryID, string memoryName, string description)
        {
            productBUS.EditMemory(memoryID, memoryName, description);
        }
        [HttpPost]
        public void EditColor(string colorID, string colorName, string colorImage, string quantity, string price)
        {
            productBUS.EditColor(colorID, colorName, colorImage, quantity, price);
        }
        [HttpPost]
        public void InsertMemory(string productID, string memoryName, string description)
        {
            productBUS.InsertMemory(productID, memoryName, description);
        }
        [HttpPost]
        public void InsertColor(string productID, string memoryID, string colorName, string colorImage, string quantity, string price)
        {
            productBUS.InsertColor(productID, memoryID, colorName, colorImage, quantity, price);
        }
        [HttpPost]
        public void DeleteColor(string id)
        {
            productBUS.DeleteColor(id);
        }
        [HttpPost]
        public void DeleteMemory(string id)
        {
            productBUS.DeleteMemory(id);
        }
    }
}