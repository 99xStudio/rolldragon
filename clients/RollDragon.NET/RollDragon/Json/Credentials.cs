namespace RollDragon.Objects;

public class Credentials
{
    public class EmailPassword
    {
        public string email { get; set; }
        public string password { get; set; }

        public EmailPassword(string email, string password)
        {
            this.email = email;
            this.password = password;
        }
    }
}