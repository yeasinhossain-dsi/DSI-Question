import Header from "@/components/base/header/Header";
import useStore from "@/store";
import { AUTH_STATUS } from "@/store/user";
import { FormattedMessage } from "react-intl";
import { Navigate } from "react-router-dom";

interface IProps {
  children: JSX.Element;
}

const ProtectedLayout = ({ children }: IProps) => {
  const { authStatus } = useStore();
  const {
    userDetails: { data: userDetails },
    googleLogout,
  } = useStore();

  if (authStatus === AUTH_STATUS.UNAUTHENTICATED) {
    return <Navigate to="/" replace />;
  }

  return (
    userDetails && (
      <>
        <Header
          applicationName={<FormattedMessage id="application.name" />}
          email={userDetails.email}
          logout={googleLogout}
          name={`${userDetails.name}`}
          picture={userDetails.picture}
        />
        <div className="p-6">{children}</div>
      </>
    )
  );
};

export default ProtectedLayout;
