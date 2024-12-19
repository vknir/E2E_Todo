import { useEffect } from "react";
import Error from "./Error";
import {
  usernameState,
  passwordState,
  confirmPasswordState,
  errorState,
  showSignUpState,
} from "../store/atom";
import { useRecoilState } from "recoil";
import { Props } from "../interface";

export default function Input({ type, extraInput }: Props) {
  const [, setUsername] = useRecoilState(usernameState);
  const [confirmPassword, setConfirmPassword] =
    useRecoilState(confirmPasswordState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [error, setError] = useRecoilState(errorState);
  const [showSignUp] = useRecoilState(showSignUpState);

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{3,10}$/;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (confirmPassword != password) {
        setError({ present: true, type: "Password should be same" });
      } else if (confirmPassword === password && confirmPassword != "" && password !='') {
        if (!regexPassword.test(password)) {
          if (password.length > 10) {
            setError({
              present: true,
              type: "Length should be less than 10 characters",
            });
          } else if (password.length < 3) {
            setError({
              present: true,
              type: "Length should be greater thane 3 characters",
            });
          } else {
            setError({
              present: true,
              type: "Should contain atleast a special, small and a capital character",
            });
          } 
        } else {
          setError({ present: false, type: "" });
        }
      }
    }, 700);
    () => clearTimeout(timer);
  }, [confirmPassword,password]);

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
                onChange={(e) => setPassword(e.target.value.trim())}
                className="p-2 border rounded focus:outline-none focus:border-blue-800 "
              ></input>
              {extraInput ? (
                <input
                  required
                  placeholder={`Confirm Password`}
                  type={`${type}`}
                  onChange={(e) => setConfirmPassword(e.target.value.trim())}
                  className="p-2 border rounded focus:outline-none focus:border-blue-800"
                ></input>
              ) : (
                <></>
              )}
              {error.present && showSignUp && confirmPassword != "" ? (
                <Error type={`${error.type}`} />
              ) : (
                <></>
              )}
            </>
          }
        </>
      ) : (
        <>
          <input
            required
            placeholder={`Username`}
            type={`${type}`}
            onChange={(e) => setUsername(e.target.value.trim())}
            className="p-2 border rounded focus:outline-none focus:border-blue-800 "
          ></input>
        </>
      )}
    </>
  );
}
