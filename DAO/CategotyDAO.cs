using DAO.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using OBJ;

namespace DAO
{
    class CategotyDAO : ICategoryDAO
    {
        DataHelper dh = new DataHelper();
        public List<Category> GetCategories()
        {
            return null;
        }
    }
}
