using RollDragon.Objects;

namespace RollDragon;

public class RollDragon
{
    public AuthUser user;
    
    public void Login(string email, string password)
    {
        var creds = new Credentials.EmailPassword(email, password);
        user = InternalApi.EmailPasswordLogin(creds);
    }

    public string DisplayName
    {
        get => InternalApi.GetDisplayName(user);
        set => InternalApi.SetDisplayName(user, value);
    }

    private RollDragon()
    {
    }

    public static RollDragon Create()
    {
        return new RollDragon();
    }
}