import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./Context/AuthProvider";
import Input from "./Input/Input";
import { EMAIL, PASSWORD } from "../utils/constants";

const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [user, setUser] = useState({ email: "", password: "" });
  const [passwordType, setPasswordType] = useState("password");
  const [isError, setIsError] = useState(false);

  const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.email === EMAIL && user.password === PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", true);
    } else {
      setIsError(true);
    }
  };

  /*function that enables for user to show/hide their password*/
  const changePasswordType = () =>
    setPasswordType(passwordType == "password" ? "text" : "password");

  return (
    <section className="login flex justify-space-around align-center p-4">
      <div className="titles flex justify-center align-center">
        <img src="/images/the-one-ring.png" />
        <div>
          <h1 className="mt-0 mb-2">Mord OS</h1>
          <h2 className="m-0 p-0">The operating system to rule them all!</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-column justify-center align-center">
        <Input
          className="mb-4"
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
          icon={<FontAwesomeIcon icon={faEnvelope} size="lg" />}
        />
        <Input
          className="mb-4"
          type={passwordType}
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
          icon={
            <FontAwesomeIcon
              icon={passwordType == "password" ? faEye : faEyeSlash}
              size="lg"
              className="pointer"
              onClick={changePasswordType}
            />
          }
        />
        <p className="m-0" style={isError ? { opacity: 1, color: "red" } : { opacity: 0 }}>
          Wrong email or password!
        </p>
        <Input
          type="submit"
          className="mt-4"
          value="Login to Your Account"
          icon={<FontAwesomeIcon icon={faArrowRight} size="lg" className="pointer" />}
        />
      </form>
    </section>
  );
};

export default Login;
