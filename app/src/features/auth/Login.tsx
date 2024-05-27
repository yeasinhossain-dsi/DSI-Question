import { FormattedMessage } from "react-intl";
import loginHero from "@assets/login-hero.png";
import Gmail from "@components/icons/Gmail";
import useAuth from "./useAuth";
import useStore from "@store/index";

const Login = () => {
  const {
    userDetails: { data: userDetails },
    googleLogout,
  } = useStore();
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
            {userDetails ? (
              <div>
                <img
                  src={userDetails.picture}
                  alt="Profile"
                  style={{ width: "96px", height: "96px" }}
                />
                <p>
                  <FormattedMessage id="label.name" /> : {userDetails.name}
                </p>
                <p>
                  <FormattedMessage id="label.email" />: {userDetails.email}
                </p>
                <br />
                <br />
                <button onClick={() => googleLogout()}>
                  <FormattedMessage id="link.signOut" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => login()}
                  className="flex items-center gap-2 border rounded p-3  bg-slate-50 font-semibold text-slate-800"
                >
                  <Gmail />
                  <FormattedMessage id="placeholder.signInWithEmail" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
