using System;
using System.Collections.Generic;
using System.Text;
using DAO;
using OBJ;

namespace BUS
{
    public class StaffBUS
    {
        StaffDAO staffDAO = new StaffDAO();
        public string CheckStaff(string email,string pas)
        {
            return staffDAO.CheckStaff(email, pas);
        }
    }
}
