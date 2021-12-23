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

        public void DeleteCart(string cartID)
        {
            string spName = "DeleteCart";
            dh.StoreReaders(spName, cartID);
        }
        public string GetCartQuantity(string id)
        {
            string spName = "GetCartQuantity";
            SqlDataReader dr = dh.StoreReaders(spName, id);
            string result="";
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
