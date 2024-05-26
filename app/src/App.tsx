import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import router from "./config/routes";
import useStore from "./store";
import { AUTH_STATUS } from "./store/user";

function App() {
  const { refreshAuthStatus, authStatus } = useStore();

  useEffect(() => {
    (async () => {
      await refreshAuthStatus();
    })();
  }, []);
  return (
    <>
      {authStatus === AUTH_STATUS.FETCHING ? (
        <div className="h-screen flex justify-center items-center">
          <PropagateLoader color={"#1e293b"} />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
