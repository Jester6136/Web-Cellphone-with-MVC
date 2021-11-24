using System;
using System.Collections.Generic;
using BUS.Interface;
using DAO;
using OBJ;

namespace BUS
{
    public class ProductBUS : IProductBUS
    {
        ProductDAO productDAO = new ProductDAO();

        public List<ProductDetailsADMIN> GetProductDetailsADMIN(string productID, string memoryID)
        {
            return productDAO.GetProductDetailsADMIN(productID, memoryID);
        }

        public List<Product> GetProductsBrand(string categoryID, string brandID)
        {
            return productDAO.GetProductsBrand(categoryID, brandID);
        }

        public ListProduct GetProductsbyBrandPagination(int pageIndex, int pageSize, string productName, string categoryID, string brandID)
        {
            return productDAO.GetProductsbyBrandPagination(pageIndex, pageSize, productName, categoryID, brandID);
        }
        public List<ProductAdmin> GetProductsByCategory(string categoryID)
        {
            return productDAO.GetProductsByCategory(categoryID);
        }
        public void InsertProductMemosColors(ProductMemosColors p)
        {
            productDAO.InsertProductMemosColors(p);
        }
    }
}
