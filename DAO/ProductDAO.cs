using DAO.Interface;
using OBJ;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Newtonsoft.Json;
namespace DAO
{
    public class ProductDAO : IProductDAO
    {
        DataHelper dh = new DataHelper();

        public List<Product> GetProductsBrand(string categoryID, string brandID)
        {
            List<Product> result = new List<Product>();
            string spName = "GetProductsbyBrand";
            SqlDataReader dr = dh.StoreReaders(spName,categoryID,brandID);
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    Product p = new Product(
                        dr["ProductID"].ToString(),
                        dr["MemoryID"].ToString(),
                        dr["ColorID"].ToString(),
                        dr["ProductName"].ToString(),
                        Convert.ToDouble(dr["NewPrice"]),
                        Convert.ToDouble(dr["OldPrice"]),
                        dr["ImageName"].ToString(),
                        dr["PromotionName"].ToString()
                        );
                    result.Add(p);
                }
            }
            return result;
        }

        public ListProduct GetProductsbyBrandPagination(int pageIndex, int pageSize, string productName, string categoryID, string brandID)
        {
            ListProduct listProduct = new ListProduct();
            List<Product> products = new List<Product>();
            SqlDataReader dr = dh.StoreReaders("GetProductsbyBrandPagination", pageIndex, pageSize, productName,categoryID,brandID);
            while (dr.Read())
            {
                Product p = new Product(
                       dr["ProductID"].ToString(),
                       dr["MemoryID"].ToString(),
                       dr["ColorID"].ToString(),
                       dr["ProductName"].ToString(),
                       Convert.ToDouble(dr["NewPrice"]),
                       Convert.ToDouble(dr["OldPrice"]),
                       dr["ImageName"].ToString(),
                       dr["PromotionName"].ToString()
                       ); 
                products.Add(p);
            }
            listProduct.Products = products;
            dr.NextResult();
            while (dr.Read())
            {
                listProduct.TotalCount = dr["TotalCount"].ToString();
            }
            return listProduct;
        }

        public List<ProductAdmin> GetProductsByCategory(string categoryID)
        {
            List<ProductAdmin> result = new List<ProductAdmin>();
            string spName = "GetProductsByCategory";
            SqlDataReader dr = dh.StoreReaders(spName, categoryID);
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    ProductAdmin p = new ProductAdmin(
                        dr["ProductID"].ToString(),
                        dr["ProductName"].ToString(),
                        dr["MemoryName"].ToString(),
                        dr["CategoryName"].ToString(),
                        dr["BrandName"].ToString(),
                        dr["ImageName"].ToString()
                        );
                    result.Add(p);
                }
            }
            return result;
        }
        public List<ProductDetailsADMIN> GetProductDetailsADMIN(string productID, string memoryID)
        {
            List<ProductDetailsADMIN> result = new List<ProductDetailsADMIN>();
            string spName = "GetProductDetailsADMIN";
            SqlDataReader dr = dh.StoreReaders(spName, productID,memoryID);
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    ProductDetailsADMIN pd = new ProductDetailsADMIN(
                        dr["ProductID"].ToString(),
                        dr["MemoryID"].ToString(),
                        dr["ColorID"].ToString(),    
                        dr["ColorName"].ToString(),
                        dr["ColorImage"].ToString(),
                        dr["NewPrice"].ToString(),
                        dr["OldPrice"].ToString()
                        );
                    result.Add(pd);
                }
            }
            return result;
        }

        public void InsertProductMemosColors(ProductMemosColors p)
        {
            string spName = "InsertProductMemosColors";
            string ListMemories = JsonConvert.SerializeObject(p.Memories);
            SqlDataReader dr = dh.StoreReaders(spName, p.ProductName,p.CategoryName,p.BrandName,p.DateRelease,ListMemories);
        }
    }
}
