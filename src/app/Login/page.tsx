"use client";
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "./LoginPage.module.scss";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Тут ви можете додати логіку для обробки введених даних (наприклад, відправка їх на сервер)

    // Приклад виводу введених даних
    console.log("Login:", login);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <>
      <div className={s.cont}>
        <h2>Форма реєстрації</h2>
        <Form onSubmit={handleSubmit} className={s.FormWidth}>
          <div className={s.additionalLabel}>
            <Form.Label className={s.LabelStyle}>Login</Form.Label>
            <Form.Label className={s.LabelStyle}>Password</Form.Label>
          </div>
          <div className={s.additionalContent}>
            <Form.Group className={s.formGroup}>
              <Form.Control
                className={s.SearchStyle}
                type="login"
                placeholder="Введіть логін"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Form.Group>

            <Form.Group className={s.formGroup}>
              <Form.Control
                className={s.SearchStyle}
                type="password"
                placeholder="Введіть пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                className={s.RememberMeLabel}
                type="checkbox"
                label="Remember me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </Form.Group>

            <Button
              variant="secondary"
              type="submit"
              className={s.submitButton}
            >
              Sign up
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
