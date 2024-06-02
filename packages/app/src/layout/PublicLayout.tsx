import useStore from "@/store";
import { AUTH_STATUS } from "@/store/user";
import { Navigate } from "react-router-dom";

interface IProps {
  children: JSX.Element;
}

const PublicLayout = ({ children }: IProps) => {
  const { authStatus } = useStore();

  if (authStatus === AUTH_STATUS.AUTHENTICATED) {
    return <Navigate to="/questions" replace />;
  }

  return children;
};

export default PublicLayout;
