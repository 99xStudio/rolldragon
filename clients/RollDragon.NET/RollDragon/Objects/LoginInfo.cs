namespace RollDragon.Objects;

public class LoginInfo
{
    public string AccessToken;
    public string RefreshToken;

    public LoginInfo(string accessToken, string refreshToken)
    {
        AccessToken = accessToken;
        RefreshToken = refreshToken;
    }
}