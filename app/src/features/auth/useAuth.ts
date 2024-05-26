import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import useStore from "../../store";

const useAuth = () => {
  const { getUserDetails } = useStore();
  const [error, setError] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => {
      setError(false);
      (async (token) => {
        await getUserDetails(token);
      })(codeResponse.access_token);
    },
    onError: (_error) => setError(true),
  });

  useEffect(() => {}, []);
  return { login, error };
};

export default useAuth;
