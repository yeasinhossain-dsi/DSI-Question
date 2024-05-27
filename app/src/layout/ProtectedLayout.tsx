import Header from "@/components/base/header/Header";
import useStore from "@/store";
import { AUTH_STATUS } from "@/store/user";
import { Navigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

interface IProps {
  children: JSX.Element;
}

const ProtectedLayout = ({ children }: IProps) => {
  const { authStatus } = useStore();
  const {
    userDetails: { data: userDetails },
    googleLogout,
  } = useStore();

  if (authStatus === AUTH_STATUS.UNAUTHENTICATED || userDetails === null) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header
        applicationName={<FormattedMessage id="application.name" />}
        email={userDetails.email}
        logout={googleLogout}
        name={`${userDetails.given_name} ${userDetails.family_name}`}
        picture={userDetails.picture}
      />
      <div className="p-6">{children}</div>
    </>
  );
};

export default ProtectedLayout;
