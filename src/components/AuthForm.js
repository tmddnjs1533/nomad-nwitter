import React, { useState } from "react";
import { authService } from "fBase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          className="authInput"
        />
        <input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          className="authInput"
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {errorMsg && <span className="authError">{errorMsg}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Log In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
