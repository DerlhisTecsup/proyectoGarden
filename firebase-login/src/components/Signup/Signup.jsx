import styles from "./Signup.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../firebase"; //conusmiendo el api de firebase parte del back end remplaza
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { InputControl } from "../InputControl/InputControl";
import Button from "@mui/material/Button";

export function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", pass: "" });
  const [errorMsg, setErrorMsg] = useState([]);

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const registro = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("llene todos los campos");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name, //base de datos internamente interactuando
        });
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
        <h1 className={styles.heading}>Registro</h1>
        <InputControl
          label="Name"
          placeholder="ingrese un nombre"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="ingrese un correo"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="password"
          placeholder="ingrese una contraseña"
          type="password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <Button
            onClick={registro}
            disabled={submitButtonDisabled}
            variant="contained"
          >
            Guardar
          </Button>
          <div className={styles.login}>
            <p>
              Inicia sesion con tu cuenta
              <span>
                <Link to="/login"> Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
