namespace RollDragon.Objects;

public class User
{
    public LoginInfo Login;
    public string UserId;
    public string Email;
    public string Phone;
    public string Role;

    public User(LoginInfo login, string userId, string email, string phone, string role)
    {
        Login = login;
        UserId = userId;
        Email = email;
        Phone = phone;
        Role = role;
    }
}