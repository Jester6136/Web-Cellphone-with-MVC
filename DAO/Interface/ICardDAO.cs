using System;
using System.Collections.Generic;
using OBJ;
using System.Text;

namespace DAO.Interface
{
    interface ICardDAO
    {
        void InsertCart(Cart cart);
        string GetCart(string userID);

    }
}
