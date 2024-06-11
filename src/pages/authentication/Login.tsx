import { FunctionComponent, useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "@/services/AuthService";
import "@/pages/authentication/Login.css";
import axios from "axios";

const Login: FunctionComponent = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [globalError, setGlobalError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalError(null);

    try {
      const data = await AuthService.signin(credentials);
      localStorage.setItem("authToken", data.bearer);
      navigate("/calender");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status !== 500
      ) {
        setGlobalError(error.response.data.message);
      } else {
        setGlobalError("Login failed, please try again later");
      }
    }
  };

  return (
    <div className="connexion-container">
      <div className="left-container">
        <img src="/public/assets/lyseplogo.png" alt="Logo LYS'EP" className="logo" />  
      </div>
      <div className="right-container">     
        <div className="auth-container">
          <h2>Connexion</h2>
          {globalError && <div className="error global-error">{globalError}</div>}
          <form onSubmit={handleSubmit} className="connexion-form">
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Mot de passe:
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Connexion</button><br></br>
          </form>
          <div className="auth-links">
            <p>
              Vous n'avez pas de compte ?{" "}
              <Link to="/authentication/signup">Inscris toi ici !</Link>
            </p>
            <p>
              <Link to="/authentication/password/reset">
                Mot de passe oublié ?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
