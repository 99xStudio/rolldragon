namespace RollDragon.Objects;

public class AuthUser
{
    public LoginInfo Login;
    public string UserId;
    public string Email;
    public string Phone;
    public string Role;

    public AuthUser(LoginInfo login, string userId, string email, string phone, string role)
    {
        Login = login;
        UserId = userId;
        Email = email;
        Phone = phone;
        Role = role;
    }
}