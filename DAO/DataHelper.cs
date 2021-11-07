using System;
using System.Data;
using System.Data.SqlClient;

namespace DAO
{
    class DataHelper
    {
        string stcon;
        SqlConnection con;
        public DataHelper(string conStr)
        {
            this.stcon = conStr;
            con = new SqlConnection(conStr);
        }
        public DataHelper()
        {
            stcon = @"Data Source=LAPTOP-QQ8KE09K\SQLEXPRESS;Initial Catalog=CellphoneS;User ID=sa; Password=123;";
            con = new SqlConnection(stcon);
        }
        public DataTable FillDataTable(string sql)
        {
            SqlDataAdapter da = new SqlDataAdapter(sql, stcon);
            DataTable dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
        public void Open()
        {
            if (con.State == ConnectionState.Closed)
            {
                con.Open();
            }
        }
        public void Close()
        {
            if (con.State != ConnectionState.Closed)
            {
                con.Close();
            }
        }

        public SqlDataReader StoreReaders(string tenStore, params object[] giatri) {

            SqlCommand cm;
            Open();
            try
            {
                cm = new SqlCommand(tenStore, con); 
                cm.CommandType = CommandType.StoredProcedure; 
                SqlCommandBuilder.DeriveParameters(cm);
                for (int i = 1; i < cm.Parameters.Count; i++) 
                { cm.Parameters[i].Value = giatri[i - 1]; }
                SqlDataReader dr = cm.ExecuteReader(); 
                return dr;
            }
            catch { return null; }
        }
    }
}
