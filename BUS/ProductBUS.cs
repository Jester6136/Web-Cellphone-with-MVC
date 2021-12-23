﻿using System;
using System.Collections.Generic;
using BUS.Interface;
using DAO;
using DAO.Interface;
using OBJ;

namespace BUS
{
    public class ProductBUS : IProductBUS
    {
        ProductDAO productDAO = new ProductDAO();

        public List<ProductDetailsADMIN> GetProductDetailsADMIN(string memoryID)
        {
            return productDAO.GetProductDetailsADMIN(memoryID);
        }

        public List<MemoriesDetailADMIN> GetMemoriesDetailADMIN(string productID)
        {
            return productDAO.GetMemoriesDetailADMIN(productID);
        }

        public List<Product> GetProductsBrand(string categoryID, string brandID)
        {
            return productDAO.GetProductsBrand(categoryID, brandID);
        }
        public void EditProduct(string id, string name, string date, string imageName)
        {
            productDAO.EditProduct(id, name, date, imageName);
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
        public string GetNextProductID()
        {
           return productDAO.GetNextProductID();
        }
        public string GetProductDetail(string productID)
        {
            return productDAO.GetProductDetail(productID);
        }
        public string GetTop15ProductPhone()
        {
            return productDAO.GetTop15ProductPhone();
        }
        public string GetOldProducts()
        {
            return productDAO.GetOldProducts();
        }
        public string GetCategoryBrandADMIN()
        {
            return productDAO.GetCategoryBrandADMIN();
        }

        public void EditMemory(string memoryID, string memoryName, string description)
        {
            productDAO.EditMemory(memoryID, memoryName, description);
        }

        public void EditColor(string colorID, string colorName, string colorImage, string quantity, string price)
        {
            productDAO.EditColor(colorID, colorName, colorImage, quantity, price);
        }

        public void InsertMemory(string productID, string memoryName, string description)
        {
            productDAO.InsertMemory( productID, memoryName, description);
        }
        public void InsertColor(string productID, string memoryID, string colorName, string colorImage, string quantity, string price)
        {
            productDAO.InsertColor(productID, memoryID, colorName, colorImage, quantity, price);
        }
        public void DeleteColor(string id)
        {
            productDAO.DeleteColor(id);
        }
        public void DeleteMemory(string id)
        {
            productDAO.DeleteMemory(id);
        }
    }
}
