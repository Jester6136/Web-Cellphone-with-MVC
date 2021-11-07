using System;
using System.Collections.Generic;
using System.Text;
using OBJ;

namespace DAO.Interface
{
    interface ICategoryDAO
    {
        List<Category> GetCategories();
    }
}
