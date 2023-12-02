using Medfar.Interview.Types;
using System.Data.SqlClient;

namespace Medfar.Interview.DAL.Repositories
{
    public class UserRepository
    {
        private static string _connectionString = @"Data Source=localhost;Initial Catalog=MEDFAR_DEV_INTERVIEW;Integrated Security=True";
        private static SqlConnection _dbConnection;

        public UserRepository()
        {
        }

        public List<User> GetAll()
        {
            _dbConnection = new SqlConnection(_connectionString);


            SqlCommand command = new("SELECT * FROM Users", _dbConnection);

            _dbConnection.Open();

            SqlDataReader reader = command.ExecuteReader();

            List<User> messages = new List<User>();
            User obj = default(User);
            while (reader.Read())
            {
                User message = new();

                message.id = (Guid)reader["id"];
                message.last_name = (string)reader["last_name"];
                message.first_name = (string)reader["first_name"];
                message.email = (string)reader["email"];
                message.date_created = (DateTime)reader["date_created"];

                messages.Add(message);
            }
            return messages;
        }

        public List<User> GetById(Guid id)
        {
            _dbConnection = new SqlConnection(_connectionString);

            string sqlQuery = @"SELECT * FROM" +
                              " Users " +
                              "WHERE id = '" + id +"'";
            SqlCommand command = new SqlCommand(sqlQuery, _dbConnection);

            _dbConnection.Open();
            SqlDataReader reader = command.ExecuteReader();

            List<User> messages = new List<User>();
            User obj = default(User);
            while (reader.Read())
            {
                User message = new User();

                message.id = (Guid)reader["id"];
                message.last_name = (string)reader["last_name"];
                message.first_name = (string)reader["first_name"];
                message.email = (string)reader["email"];
                message.date_created = (DateTime)reader["date_created"];

                messages.Add(message);
            }
            return messages;
        }

        public int Insert(User u)
        {
            _dbConnection = new SqlConnection(_connectionString);

            string sqlQuery = @"INSERT INTO" +
                              " Users " +
                              "values ('" + u.id + "', '" + u.last_name + "', '" + u.first_name + "', '" + u.email + "', '" + u.date_created + "')";

            SqlCommand command = new SqlCommand(sqlQuery, _dbConnection);

            _dbConnection.Open();

            int nbresult = command.ExecuteNonQuery();

            return nbresult;
        }

        public int Update(User u)
        {
            _dbConnection = new SqlConnection(_connectionString);

            string sqlQuery = @"UPDATE   " +
                              " Users" +
                              " SET last_name='" + u.last_name + "', first_name='" + u.first_name + "', email='" + u.email + "', date_created='" + u.date_created + "' " +
                              "WHERE id= '" + u.id + "'";

            SqlCommand command = new SqlCommand(sqlQuery, _dbConnection);
            _dbConnection.Open();

            int nbresult = command.ExecuteNonQuery();

            return nbresult;
        }

        public int Delete(User u)
        {
            _dbConnection = new SqlConnection(_connectionString);

            string sqlQuery = @"DELETE FROM  " +
                                 " Users " +
                                 " WHERE id= '" + u.id + "'";

            SqlCommand command = new SqlCommand(sqlQuery, _dbConnection);

            _dbConnection.Open();

            int nbresult = command.ExecuteNonQuery();

            return nbresult;
        }

    }
}