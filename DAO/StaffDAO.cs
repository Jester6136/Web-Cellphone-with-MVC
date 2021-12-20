using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using OBJ;
namespace DAO
{
    public class StaffDAO
    {
        DataHelper dh = new DataHelper();
        public string CheckStaff(string id,string pas)
        {
            string spName = "CheckStaff";
            SqlDataReader dr = dh.StoreReaders(spName,id,pas);
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
    }
}
