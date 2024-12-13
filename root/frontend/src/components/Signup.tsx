import React, { useState } from "react";
import Input from "./Input";
import {
  errorState,
  usernameState,
  passwordState,
  loginState,
  loadingState,
} from "../store/atom";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";
import { Token } from "../interface";
import Loading from "./Loading";

export default function Signup() {
  const username = useRecoilValue(usernameState);
  const password = useRecoilValue(passwordState);
  const setError = useSetRecoilState(errorState);
  const setLogin = useSetRecoilState(loginState);
  const [loading, setLoading] = useRecoilState(loadingState);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('username', username)
    axios
      .post("http://localhost:3000/api/v1/auth/signup", {
        username: username,
        password: password,
      })
      .then((response) => {
        const result = response.data as Token;
        if (result.token) {
          localStorage.setItem("token", result.token);
          setLogin(true);
        } else {
          setError({ present: true, type: "Unable to login" });
        }
  });
  };

  return (
    <div className="mt-5 w-full px-7">
      <>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
          <Input type="text" />
          <Input type="password" extraInput={true} />
          <button type="submit">Sign up</button>
        </form>
        <div className="text-center text-sm mt-5">
          <p>Already have an account?</p>
          <p>Login to continue</p>
        </div>
      </>
    </div>
  );
}
