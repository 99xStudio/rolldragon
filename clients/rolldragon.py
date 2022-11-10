import requests

SB_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdXpxaGd1cGlmZWJrY3l4YnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyMDIwMzEsImV4cCI6MTk4MTc3ODAzMX0.D1tmALf7KQZucz0vt1tKJgLwiRagMGGfIv50BakFxCo"
SB_API_URL = "https://uduzqhgupifebkcyxbtt.supabase.co"

class RD_LoginCookies:
    def __init__(self, resp: requests.Response):
        self.access_token = resp.cookies.get("sb-access-token")
        self.refresh_token = resp.cookies.get("sb-refresh-token")

class RD_User:
    def __init__(self, rep: requests.Response, login: RD_LoginCookies) -> None:
        self.json = rep.json()
        self.login = login
        self.parse_from_json()
    def parse_from_json(self):
        user = self.json["user"]
        self.user_id = user["id"]
        self.email = user["email"]
        self.role = user["role"]
        self.phone = user["phone"] if user["phone"] != "" else None

def login_eml_pass(email: str, pw: str) -> RD_User:
    headers = {
        "apikey": SB_ANON_KEY
    }
    body = {
        "email": email,
        "password": pw
    }
    resp = requests.post(SB_API_URL + "/auth/v1/token?grant_type=password", headers=headers, json=body)
    return RD_User(resp, RD_LoginCookies(resp))

class RD_UserDataNS:
    def __init__(self, uid: str, display_name: str) -> None:
        self.uid = uid
        self.display_name = display_name

def get_ns_data(user: RD_User) -> RD_UserDataNS:
    headers = {
        "apikey": SB_ANON_KEY
    }
    resp = requests.get(SB_API_URL + "/rest/v1/user_data_ns?select=*&user_id=eq." + user.user_id, headers=headers)
    json = resp.json()
    if len(json) < 1:
        rd_log("No UserDataNS entry found. Creating now")
        data = RD_UserDataNS(user.user_id, input("Enter your new display name >> "))
        set_ns_data(user.login, data)
        return data
        
    else:
        return RD_UserDataNS(json[0]["user_id"], json[0]["display_name"])


def set_ns_data(auth: RD_LoginCookies, data: RD_UserDataNS):
    headers = {
        "apikey": SB_ANON_KEY,
        "Prefer": "return=representation",
        "Authorization": "Bearer " + auth.access_token
    }
    body = {
        "user_id": data.uid,
        "display_name": data.display_name
    }
    resp = requests.post(SB_API_URL + "/rest/v1/user_data_ns", headers=headers, json=body)
    if resp.status_code != 201:
        rd_log("Error inserting to UserDataNS: HTTP " + resp.status_code)

def rd_log(msg: str):
    print("[RollDragon]", msg)

if __name__ == "__main__":
    user = login_eml_pass("some@random.email", "password")
    rd_log("Logged in ID: " + user.user_id)
    ns_data = get_ns_data(user)
    rd_log(f"Hello, {ns_data.display_name}!")
