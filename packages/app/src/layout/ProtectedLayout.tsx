import Header from "@/components/base/header/Header";
import useStore from "@/store";
import { AUTH_STATUS } from "@/store/user";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: JSX.Element;
}

const ProtectedLayout = ({ children }: IProps) => {
  const { authStatus } = useStore();
  const navigate = useNavigate();
  const {
    userDetails: { data: userDetails },
    googleLogout,
  } = useStore();

  useEffect(() => {
    if (authStatus === AUTH_STATUS.UNAUTHENTICATED) {
      navigate("/");
    }
  }, [authStatus]);

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
