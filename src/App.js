import { useContext } from "react";
import { AuthContext } from "./components/Context/AuthProvider.js";
import Desktop from "./components/Desktop.js";
import Login from "./components/Login.js";
import "./styles/css/style.css";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return <div className="App">{!isAuthenticated ? <Login /> : <Desktop />}</div>;
};

export default App;
