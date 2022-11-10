namespace RollDragon.Json;

public class SetNameRequest
{
    public string display_name { get; set; }

    public SetNameRequest(string displayName)
    {
        display_name = displayName;
    }
}