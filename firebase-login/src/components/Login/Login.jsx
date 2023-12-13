import styles from "./Login.module.css";
import { InputControl } from "../InputControl/InputControl";
import { Link, useNavigate } from "react-router-dom"; // Cambiar "Enlace" por "Link"
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Button from "@mui/material/Button";

export function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", pass: "" });
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const Loguearse = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Dat1os incompletos");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async () => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <div className={styles.centered}>
          <img src="/LogoProyecto.png" alt="" height={100} />
        </div>
        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              email: event.target.value,
            }))
          }
          placeholder="Ingrese su correo"
        />
        <InputControl
          label="Contraseña"
          type="password"
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              pass: event.target.value,
            }))
          }
          placeholder="Ingrese su contraseña"
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <br />
          <Button
            onClick={Loguearse}
            disabled={submitButtonDisabled}
            variant="contained"
          >
            Login
          </Button>
          <div className={styles.crearCuenta}>
            <p>
              Crear cuenta
              <span>
                <Link to="/signup">Registrar cuenta</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
