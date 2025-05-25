import { useState } from "react";
import axios from "axios";
import BinanceStreamToggle from "./BinanceStreamToggle";

interface ServerUser {
  name: string;
  displayName: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}

const CallbackPage = () => {
  const [user, setUser] = useState<ServerUser | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = () => {
    setLoading(true);
    axios
      .get("https://localhost:3000/auth/casdoor/profile", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user profile", err);
        alert("Failed to load user data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mainCallBackContainer">
      <h1>Callback Page</h1>
      <button
        className="loadUserButton"
        onClick={fetchProfile}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load User from Cookie"}
      </button>

      {user && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Display Name: {user.displayName}</p>
          <p>Role: {user.isAdmin ? "Admin" : "User"}</p>
          <img src={user.avatar} alt="User Avatar" width={100} />
        </div>
      )}
      {user && <BinanceStreamToggle />}
    </div>
  );
};

export default CallbackPage;
