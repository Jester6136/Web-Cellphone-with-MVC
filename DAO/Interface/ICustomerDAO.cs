using System;
using System.Collections.Generic;
using System.Text;
using OBJ;
namespace DAO.Interface
{
    interface ICustomerDAO
    {
        Customer CheckCustomer(string Email, string Password);
    }
}
