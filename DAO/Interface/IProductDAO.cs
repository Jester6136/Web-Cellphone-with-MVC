using System;
using System.Collections.Generic;
using System.Text;
using OBJ;

namespace DAO.Interface
{
    interface IProductDAO
    {
        List<Product> GetProductsBrand(string categoryID, string brandID);

        ListProduct GetProductsbyBrandPagination(int pageIndex, int pageSize, string productName, string categoryID, string brandID);

        List<ProductAdmin> GetProductsByCategory(string categoryID);

        List<ProductDetailsADMIN> GetProductDetailsADMIN(string memoryID);

        void InsertProductMemosColors(ProductMemosColors p);
    }
}
