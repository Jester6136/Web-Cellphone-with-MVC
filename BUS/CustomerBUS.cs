using BUS.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using OBJ;
using DAO;

namespace BUS
{
    public class CustomerBUS : ICustomerBUS
    {
        CustomerDAO customerDAO = new CustomerDAO();
        public Customer CheckCustomer(string Email, string Password)
        {
            return customerDAO.CheckCustomer(Email, Password);
        }
    }
}
