using DAO.Interface;
using OBJ;
using System;
using System.Collections.Generic;
using System.Text;
using OBJ;
using System.Data.SqlClient;

namespace DAO
{
    public class CartDAO : ICardDAO
    {
        DataHelper dh = new DataHelper();

        public string GetCart(string userID)
        {
            string spName = "GetCart";
            SqlDataReader dr = dh.StoreReaders(spName, userID);
            string result = "";
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    result = dr["json"].ToString();
                }
            }
            return result;
        }

        public void InsertCart(Cart cart)
        {
            string spName = "InsertCart";
            dh.StoreReaders(spName, cart.UserID,cart.ColorID,cart.MemoryID,cart.ProductID);
        }
    }
}
