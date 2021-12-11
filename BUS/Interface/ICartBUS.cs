using System;
using System.Collections.Generic;
using System.Text;
using DAO;
using OBJ;

namespace BUS.Interface
{
    interface ICartBUS
    {
        void InsertCart(Cart cart);
        string GetCart(string userID);
    }
}
