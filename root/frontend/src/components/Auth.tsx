import { useRecoilState } from "recoil";
import { showSignUpState, loadingState } from "../store/atom";
import Signup from "./Signup";
import Login from "./Login";
import Loading from "./Loading";

export default function Auth() {
  const [showSignUp, setShowSignup] = useRecoilState(showSignUpState);
  const [loading] = useRecoilState(loadingState);
  return (
    <div className="bg-white rounded min-h-96 h-fit min-w-80 px-2 py-5 md:p-4 flex flex-col items-center gap-2 md:gap-0.5 transition-all ease-linear">
      <div className="flex items-center text-center">
        <p className="text-3xl font-bold text-blue-950">Make-a-List</p>
        <div></div>
      </div>

      <p className="text-lg ">An app to create lists</p>
      <div className="flex justify-between text-base sm:text-lg md:text-2xl gap-24 mt-3 px-5">
        <button
          onClick={() => setShowSignup(true)}
          className={`hover:scale-110 rounded-xl border px-3 transition-all ease-in duration-100 py-2 ${
            showSignUp ? `bg-orange-400 text-white` : `border-orange-300`
          }`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setShowSignup(false)}
          className={`hover:scale-110 rounded-xl border px-3 py-2 transition-all ease-in duration-100 ${
            showSignUp ? `border-orange-300` : `bg-orange-400 text-white`
          } `}
        >
          Login
        </button>
      </div>
      {loading ? <Loading/> : <>{showSignUp ? <Signup /> : <Login />}</>}
    </div>
  );
}
