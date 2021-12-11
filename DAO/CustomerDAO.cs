using DAO.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using OBJ;
using System.Data.SqlClient;

namespace DAO
{
    public class CustomerDAO : ICustomerDAO
    {
        DataHelper dh = new DataHelper();
        public Customer CheckCustomer(string Email, string Password)
        {
            string spName = "CheckCustomer";
            
            SqlDataReader dr = dh.StoreReaders(spName, Email, Password);
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    Customer c = new Customer();
                    c.CustomerID = dr["CustomerID"].ToString();
                    c.CustomerName = dr["CustomerName"].ToString();
                    c.Email = dr["Email"].ToString();
                    c.Phone = dr["Phone"].ToString();
                    c.Dob = dr["Dob"].ToString();
                    return c;
                }
            }
            else
            {
                return null;
            }
            return null;
        }
    }
}
