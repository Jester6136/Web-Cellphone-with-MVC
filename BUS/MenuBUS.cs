using System;
using BUS.Interface;
using DAO;
using OBJ;

namespace BUS
{
    public class MenuBUS : IMenuBUS
    {
        MenuDAO menuDAO = new MenuDAO();
        public string GetMenu()
        {
            return menuDAO.GetMenu();
        }
    }
}
