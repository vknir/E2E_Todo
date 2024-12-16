import { useEffect, useState } from "react";
import Error from "./Error";
import {
  usernameState,
  passwordState,
  confirmPasswordState,
  errorState
} from "../store/atom";
import { useRecoilState } from "recoil";
import {Props} from '../interface'

export default function Input({ type, extraInput }: Props) {
  const [username, setUsername] = useRecoilState(usernameState);
  const [confirmPassword, setConfirmPassword] =
    useRecoilState(confirmPasswordState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [error, setError] = useRecoilState(errorState);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (confirmPassword != password) {
        setError({ present: true, type: "Password should be same" });
      } else if (confirmPassword === password && confirmPassword != "") {
        if (!regexPassword.test(password)) {
          setError({
            present: true,
            type: "Password should have atlest one special character",
          });
        } else {
          setError({ present: false, type: "" });
        }
      }
    }, 700);
    () => clearTimeout(timer);
  }, [confirmPassword]);

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{3,10}$/;

  return (
    <>
      {type === "password" ? (
        <>
          {
            <>
              <input
                required
                placeholder={`Password`}
                type={`${type}`}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded focus:outline-none focus:border-blue-800 "
              ></input>
              {extraInput ? (
                <input
                  required
                  placeholder={`Confirm Password`}
                  type={`${type}`}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2 border rounded focus:outline-none focus:border-blue-800"
                ></input>
              ) : (
                <></>
              )}
              {error.present && confirmPassword!='' ? <Error type={`${error.type}`} /> : <></>}
            </>
          }
        </>
      ) : (
        <>
          <input
            required
            placeholder={`Username`}
            type={`${type}`}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:border-blue-800 "
          ></input>
        </>
      )}
    </>
  );
}
