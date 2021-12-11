using System;
using System.Collections.Generic;
using System.Text;
using DAO;
using BUS.Interface;

namespace BUS
{
    public class OrderBUS : IOrderBUS
    {
        OrderDAO orderDAO = new OrderDAO();
        public void InsertOrder(string json)
        {
            orderDAO.InsertOrder(json);
        }
    }
}
