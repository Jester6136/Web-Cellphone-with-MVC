using DAO.Interface;
using OBJ;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Newtonsoft.Json;
using System.Data;

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
                        dr["CategoryName"].ToString(),
                        dr["BrandName"].ToString(),
                        dr["ImageName"].ToString()
                        );
                    result.Add(p);
                }
            }
            return result;
        }
        public string GetProductDetail(string productID)
        {
            string spName = "GetProductDetail";
            SqlDataReader dr = dh.StoreReaders(spName, productID);
            string result = "";
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    result = dr[0].ToString();
                }
            }
            return result;
        }
        public List<ProductDetailsADMIN> GetProductDetailsADMIN(string memoryID)
        {
            List<ProductDetailsADMIN> result = new List<ProductDetailsADMIN>();
            string spName = "GetProductDetailsADMIN";
            SqlDataReader dr = dh.StoreReaders(spName,memoryID);
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
        public List<MemoriesDetailADMIN> GetMemoriesDetailADMIN(string productID)
        {
            List<MemoriesDetailADMIN> result = new List<MemoriesDetailADMIN>();
            string spName = "GetMemoriesDetailADMIN";
            SqlDataReader dr = dh.StoreReaders(spName, productID);
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    MemoriesDetailADMIN pd = new MemoriesDetailADMIN(
                        dr["ProductID"].ToString(),
                        dr["MemoryID"].ToString(),
                        dr["MemoryName"].ToString(),
                        dr["Description"].ToString()
                        );
                    result.Add(pd);
                }
            }
            return result;
        }
        public string GetNextProductID()
        {
            DataTable dt = dh.FillDataTable("getNextProductID");
            foreach (DataRow r in dt.Rows)
            {
                return r[0].ToString();
            }
            return null;
        }
        public void InsertProductMemosColors(ProductMemosColors p)
        {
            string ColorID = GetNextColorID();
            string MemoryID = GetNextMemoryID();
            for(int i = 0; i < p.Memories.Count; i++)
            {
                p.Memories[i].Number = MemoryID;
                MemoryID = NextMemoryID(MemoryID);
                for(int j = 0; j < p.Memories[i].Colors.Count; j++)
                {
                    p.Memories[i].Colors[j].ColorID = ColorID;
                    ColorID = NextColorID(ColorID);
                }
            }
            string spName = "InsertProductMemosColors";
            string ListMemories = JsonConvert.SerializeObject(p.Memories);
            SqlDataReader dr = dh.StoreReaders(spName, p.ProductName,p.CategoryName,p.BrandName,p.DateRelease,ListMemories);
        }

        private string NextColorID(string id)
        {
            string number = id.Substring(2,8);
            int idd = int.Parse(number);
            number = (++idd).ToString();
            string key = "CL";
            switch (number.Length)
            {
                case 1:
                    key += "0000000" + number;
                    break;
                case 2:
                    key += "000000" + number;
                    break;
                case 3:
                    key += "00000" + number;
                    break;
                case 4:
                    key += "0000" + number;
                    break;
                case 5:
                    key += "000" + number;
                    break;
                case 6:
                    key += "00" + number;
                    break;
                case 7:
                    key += "0" + number;
                    break;
                case 8:
                    key +=number;
                    break;
                default:
                    break;
            }
            return key;
        }
        private string GetNextColorID()
        {
            DataTable dt = dh.FillDataTable("getNextColorID");
            foreach (DataRow r in dt.Rows)
            {
                return r[0].ToString();
            }
            return null;
        }
        private string GetNextMemoryID()
        {
            DataTable dt = dh.FillDataTable("getNextMemoryID");
            foreach (DataRow r in dt.Rows)
            {
                return r[0].ToString();
            }
            return null;
        }
        private string NextMemoryID(string id)
        {
            string number = id.Substring(3, 7);
            int idd = int.Parse(number);
            number = (++idd).ToString();
            string key = "MEM";
            switch (number.Length)
            {
                case 1:
                    key += "000000" + number;
                    break;
                case 2:
                    key += "00000" + number;
                    break;
                case 3:
                    key += "0000" + number;
                    break;
                case 4:
                    key += "000" + number;
                    break;
                case 5:
                    key += "00" + number;
                    break;
                case 6:
                    key += "0" + number;
                    break;
                case 7:
                    key += number;
                    break;
                default:
                    break;
            }
            return key;
        }
    }
}
