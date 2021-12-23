using System;
using System.Collections.Generic;
using BUS.Interface;
using OBJ;
using DAO;
using System.Text;

namespace BUS
{
    public class CartBUS : ICartBUS
    {
        CartDAO cartDAO = new CartDAO();

        public string GetCart(string userID)
        {
            return cartDAO.GetCart(userID);
        }

        public void InsertCart(Cart cart)
        {
            cartDAO.InsertCart(cart);
        }
        public void DeleteCart(string cartID)
        {
            cartDAO.DeleteCart(cartID);
        }
        public string GetCartQuantity(string id)
        {
            return cartDAO.GetCartQuantity(id);
        }
    }
}
