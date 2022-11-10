namespace RollDragon.Json
{

    public class AppMetadata
    {
        public string provider { get; set; }
        public IList<string> providers { get; set; }
    }

    public class UserMetadata
    {
    }

    public class IdentityData
    {
        public string sub { get; set; }
    }

    public class Identity
    {
        public string id { get; set; }
        public string user_id { get; set; }
        public IdentityData identity_data { get; set; }
        public string provider { get; set; }
        public DateTime last_sign_in_at { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }

    public class User
    {
        public string id { get; set; }
        public string aud { get; set; }
        public string role { get; set; }
        public string email { get; set; }
        public DateTime email_confirmed_at { get; set; }
        public string phone { get; set; }
        public DateTime confirmation_sent_at { get; set; }
        public DateTime confirmed_at { get; set; }
        public string last_sign_in_at { get; set; }
        public AppMetadata app_metadata { get; set; }
        public UserMetadata user_metadata { get; set; }
        public IList<Identity> identities { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }

    public class LoginResponse
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public int expires_in { get; set; }
        public string refresh_token { get; set; }
        public User user { get; set; }
    }

}