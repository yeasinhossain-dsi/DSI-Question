import loginHero from "@assets/login-hero.png";
import Gmail from "@components/icons/Gmail";
import { FormattedMessage } from "react-intl";
import useAuth from "./useAuth";

const Login = () => {
  const { login } = useAuth();

  return (
    <>
      <div className="grid grid-cols-2 h-screen">
        <div className="flex items-center">
          <img src={loginHero} />
        </div>
        <div className="flex flex-col justify-evenly items-center border border-l bg-slate-800 p-6 gap-10">
          <h1 className="mb-4 text-4xl font-light leading-none tracking-tight text-white md:text-5xl lg:text-6xl ">
            <FormattedMessage id="heading.welcome" />
          </h1>
          <div className="App">
            <button
              onClick={() => login()}
              className="flex items-center gap-2 border rounded p-3  bg-slate-50 font-semibold text-slate-800"
            >
              <Gmail />
              <FormattedMessage id="placeholder.signInWithEmail" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
