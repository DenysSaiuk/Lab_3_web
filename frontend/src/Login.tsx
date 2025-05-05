import { useNavigate } from "react-router-dom";

const CASDOOR_CLIENT_ID = "acc667173afa64d95bdc";
const CASDOOR_REDIRECT_URI = "https://localhost:3000/auth/casdoor/callback";
const CASDOOR_AUTH_URL = "https://localhost:8443/login/oauth/authorize";

function LoginPage() {

  const handleLogin = () => {
    const authUrl = `${CASDOOR_AUTH_URL}?client_id=${CASDOOR_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      CASDOOR_REDIRECT_URI
    )}&response_type=code&scope=openid profile email`;
    window.location.href = authUrl;
  };
  return (
    <div>
      <button onClick={handleLogin}>Login with Casdoor</button>
    </div>
  );
}

export default LoginPage;
