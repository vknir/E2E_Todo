import { useRecoilState, useRecoilValue } from "recoil";
import { showSignUpState, loadingState } from "../store/atom";
import Signup from "./Signup";
import Login from "./Login";
import Loading from "./Loading";

export default function Auth() {
  const [showSignUp, setShowSignup] = useRecoilState(showSignUpState);
  const loading = useRecoilValue(loadingState);
  return (
    <div className="bg-white rounded min-h-96 h-fit min-w-80 p-5 flex flex-col items-center gap-2">
      <div className="flex items-center text-center">
        <p className="text-3xl font-bold text-blue-950">Make-a-List</p>
        <div></div>
      </div>

      <p className="text-lg ">An app to create lists</p>
      <div className="flex justify-between text-3xl gap-36 mt-3 px-5">
        <button
          onClick={() => setShowSignup(true)}
          className={`hover:scale-110 rounded`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setShowSignup(false)}
          className={`hover:scale-110 rounded    `}
        >
          Login
        </button>
      </div>
      {showSignUp ? <Signup /> : <Login />}
    </div>
  );
}
