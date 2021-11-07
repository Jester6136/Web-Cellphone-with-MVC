using DAO.Interface;
using OBJ;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
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
    }
}
