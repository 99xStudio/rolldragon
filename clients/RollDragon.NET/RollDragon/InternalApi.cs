using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using RollDragon.Json;
using RollDragon.Objects;

namespace RollDragon;

public class InternalApi
{
    private const string SbApiUrl = "https://uduzqhgupifebkcyxbtt.supabase.co";
    private const string SbAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdXpxaGd1cGlmZWJrY3l4YnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyMDIwMzEsImV4cCI6MTk4MTc3ODAzMX0.D1tmALf7KQZucz0vt1tKJgLwiRagMGGfIv50BakFxCo";
    private static HttpClient _client = new();

    internal static AuthUser EmailPasswordLogin(Credentials.EmailPassword credentials)
    {
        HttpRequestMessage requestMessage = new();
        requestMessage.RequestUri = new Uri(SbApiUrl + "/auth/v1/token?grant_type=password");
        requestMessage.Method = HttpMethod.Post;
        
        requestMessage.Headers.Add("apikey", SbAnonKey);
        var body = JsonSerializer.Serialize(credentials);
        requestMessage.Content = new StringContent(body);
        
        var response = _client.Send(requestMessage);
        var json = response.Content.ReadFromJsonAsync<LoginResponse>().Result;
        var login = new LoginInfo(json.access_token, json.refresh_token);

        return new AuthUser(login, json.user.id, json.user.email, json.user.phone, json.user.role);
    }

    internal static string GetDisplayName(AuthUser user)
    {
        HttpRequestMessage requestMessage = new();
        requestMessage.RequestUri = new Uri(SbApiUrl + "/rest/v1/user_data_ns?select=*&user_id=eq." + user.UserId);
        requestMessage.Method = HttpMethod.Get;
        requestMessage.Headers.Add("apikey", SbAnonKey);

        var response = _client.Send(requestMessage);
        var json = response.Content.ReadFromJsonAsync<IEnumerable<GetNameResponse>>().Result;
        return json.First().display_name;
    }

    internal static void SetDisplayName(AuthUser user, string newName)
    {
        HttpRequestMessage requestMessage = new();
        requestMessage.RequestUri = new Uri(SbApiUrl + "/rest/v1/user_data_ns?user_id=eq." + user.UserId);
        requestMessage.Method = HttpMethod.Patch;
        
        requestMessage.Headers.Add("apikey", SbAnonKey);
        requestMessage.Headers.Add("Authorization", "Bearer " + user.Login.AccessToken);

        var body = JsonSerializer.Serialize(new SetNameRequest(newName));
        requestMessage.Content = new StringContent(body);
        requestMessage.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");

        _client.Send(requestMessage);
    }
}