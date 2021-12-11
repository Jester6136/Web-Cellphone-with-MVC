using OBJ;
using System;
using System.Collections.Generic;
using System.Text;

namespace BUS.Interface
{
    interface ICustomerBUS
    {
        Customer CheckCustomer(string Email, string Password);
    }
}
