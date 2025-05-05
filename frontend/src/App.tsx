import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CallbackPage from "./Callback";
import LoginPage from "./Login";
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/callback" element={<CallbackPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
