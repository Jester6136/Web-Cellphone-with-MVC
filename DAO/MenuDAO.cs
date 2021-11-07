using DAO.Interface;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace DAO
{
    public class MenuDAO : IMenuDAO
    {
        DataHelper dh = new DataHelper();
        public string GetMenu()
        {
            string result = null;
            string spName = "GetCategoriesBrands";
            SqlDataReader dr=dh.StoreReaders(spName);
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    result = dr["Menu"].ToString();
                }
            }
            return result;
        }
    }
}
