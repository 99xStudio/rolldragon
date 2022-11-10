namespace RollDragon.Objects;

public class UserData
{
    public string UserId;
    public string DisplayName;

    public UserData(string userId, string displayName)
    {
        UserId = userId;
        DisplayName = displayName;
    }
}