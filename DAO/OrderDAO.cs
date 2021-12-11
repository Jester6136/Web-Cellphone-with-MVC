using System;
using System.Collections.Generic;
using System.Text;
using DAO.Interface;
namespace DAO
{
    public class OrderDAO:IOrderDAO
    {
        DataHelper dh = new DataHelper();
        public void InsertOrder(string json)
        {
            string spName = "InsertOrder";
            dh.StoreReaders(spName, json);
        }
    }
}
