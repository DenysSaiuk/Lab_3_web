import axios from "axios";

const CASDOOR_CLIENT_ID = "4f95f03badb51594a6f3";
const CASDOOR_REDIRECT_URI = "https://localhost:3000/auth/casdoor/callback";
const CASDOOR_AUTH_URL = "https://localhost:8445/login/oauth/authorize";

const LoginPage = () => {
  const handleLogin = () => {
    const authUrl = `${CASDOOR_AUTH_URL}?client_id=${CASDOOR_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      CASDOOR_REDIRECT_URI
    )}&response_type=code&scope=openid profile email`;
    window.location.href = authUrl;
  };

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(
        "https://localhost:3000/auth/casdoor/profile",
        {
          withCredentials: true,
        }
      );
      alert(`User is logged in as: ${response.data.name}`);
    } catch (error) {
      alert("User is not logged in.");
    }
  };

  return (
    <div className="mainLoginContainer">
      <h1>Welcome to the App</h1>
      <div className="buttonContainer">
        <div className="loginButtonS" onClick={handleLogin}>
          Login with Casdoor
        </div>
        <div className="checkStatus" onClick={checkLoginStatus}>
          Check Login Status
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
