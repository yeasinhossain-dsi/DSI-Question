import useStore from "@/store";
import { AUTH_STATUS } from "@/store/user";
import { Dropdown } from "flowbite-react";
import { FormattedMessage } from "react-intl";
import { Link, Navigate } from "react-router-dom";

interface IProps {
  children: JSX.Element;
}

const ProtectedLayout = ({ children }: IProps) => {
  const {
    authStatus,
    userDetails: { data: userDetails },
    googleLogout,
  } = useStore();

  if (authStatus === AUTH_STATUS.UNAUTHENTICATED) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="flex bg-slate-800 p-3 justify-between text-white items-center">
        <Link to="/" className="text-3xl">
          <FormattedMessage id="application.name" />
        </Link>
        <Dropdown
          label={
            <div className="flex gap-4 items-center">
              <div className="flex flex-col justify-end items-end">
                <span>
                  {userDetails?.given_name} {userDetails?.family_name}
                </span>
                <span className="text-[12px]">{userDetails?.email}</span>
              </div>
              <img
                className="rounded-full"
                src={userDetails?.picture}
                alt="Profile"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          }
          dismissOnClick={false}
          inline
        >
          <Dropdown.Item onClick={googleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
      <div className="p-3">{children}</div>
    </>
  );
};

export default ProtectedLayout;
