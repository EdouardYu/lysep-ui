import {
  FunctionComponent,
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
import AuthService from "@/services/AuthService";
import "@/pages/authentication/Signup.css";
import axios from "axios";

interface Option {
  value: string;
  label: string;
}

const roleOptions: Option[] = [
  { value: "STUDENT", label: "Élève" },
  { value: "PROFESSOR", label: "Professeur" },
];

const Signup: FunctionComponent = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
    role: "STUDENT",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [showActivationPopup, setShowActivationPopup] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [activationError, setActivationError] = useState<string | null>(null);

  const flag = useRef(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (selectedOption: SingleValue<Option> ) => {
    setFormData({ ...formData, role: selectedOption ? selectedOption.value : "STUDENT" });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%&*+<=>?@^_-]).{8,128}$/;
    const phoneRegex = /^\(\+\d{1,3}\)\d{9}$/; // Format phone number

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (! # $ % & * + - < = > ? @ ^ _)";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be in the format (+33)123456789";
    }
    if (!formData.firstname) {
      newErrors.firstname = "First name is required";
    }
    if (!formData.lastname) {
      newErrors.lastname = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); console.log(formData)
    setGlobalError(null);
    //if (!validateForm()) return;

    try {
      await AuthService.signup(formData);
      setShowActivationPopup(true);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status !== 500
      ) {
        setGlobalError(error.response.data.message); 
      } else {
        setGlobalError("Signup failed, please try again later");
      }
    }
  };

  const handleActivate = async () => {
    try {
      await AuthService.activate(`${formData.firstname.toLowerCase()}.${formData.lastname.toLowerCase()}@${formData.role === "STUDENT" ? "eleve." : ""}isep.fr`, activationCode);
      setShowActivationPopup(false);
      navigate("/authentication/login");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status !== 500
      )
        setActivationError(error.response.data.message);
      else setActivationError("Activation failed, please try again later");
    }
  };

  const handleResendActivationCode = async () => {
    try {
      await AuthService.resendActivationCode(`${formData.firstname.toLowerCase()}.${formData.lastname.toLowerCase()}@${formData.role === "STUDENT" ? "eleve." : ""}isep.fr`);
      setActivationError("Activation code resent successfully to " + `${formData.firstname.toLowerCase()}.${formData.lastname.toLowerCase()}@${formData.role === "STUDENT" ? "eleve." : ""}isep.fr`);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status !== 500
      )
        setActivationError(error.response.data.message);
      else
        setActivationError(
          "Failed to resend activation code, please try again later"
        );
    }
  };

  const customSelectStyles: StylesConfig<Option, boolean> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      textAlign: "left",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
    }),
  };

  return (
    <div className="signup-container">
      <div className="left-container">
        <img src="/public/assets/lyseplogo.png" alt="Logo LYS'EP" className="logo" />
      </div>
      <div className="right-container2">
        <div className="auth-container2">
          <h2>Inscription</h2>
          {globalError && <div className="error global-error">{globalError}</div>}
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="text"
              name="firstname"
              placeholder="Prénom"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Nom"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Téléphone (e.g., (+33)123456789)"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <Select
              className="select"
              styles={customSelectStyles}
              name="role"
              options={roleOptions}
              value={roleOptions.find(
                (option) => option.value === formData.role
              )}
              onChange={(value) => handleRoleChange (value as SingleValue<Option>)} 
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Inscription</button>
          </form>
          <div className="auth-links">
            <p>
              Vous avez déjà un compte ?{" "}
              <Link to="/authentication/login">Connectez-vous ici !</Link>
            </p>
          </div>
        </div>
      </div>
      {showActivationPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Activer le compte</h3>
            {activationError && (
              <div className="error global-error">{activationError}</div>
            )}
            <label>
              Code d'activation:
              <input
                type="text"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value)}
                required
              />
            </label>
            <div className="popup-buttons">
              <button className="submit-button" onClick={handleActivate}>
                Activer
              </button>
              <button
                className="submit-button"
                onClick={handleResendActivationCode}
              >
                Renvoyer le code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
