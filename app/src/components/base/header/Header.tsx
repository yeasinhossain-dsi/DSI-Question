import { Dropdown } from "flowbite-react";
import { FormattedMessage } from "react-intl";

import { Link } from "react-router-dom";

export interface IProps {
  applicationName: React.ReactNode;
  name: React.ReactNode;
  email: React.ReactNode;
  picture: string;
  logout: () => void;
}

const Header = ({ applicationName, email, logout, name, picture }: IProps) => {
  return (
    <div className="flex bg-slate-800 p-3 justify-between text-white items-center">
      <Link to="/" className="text-3xl">
        {applicationName}
      </Link>
      <Dropdown
        label={
          <div className="flex gap-4 items-center">
            <div className="flex flex-col justify-end items-end">
              <span>{name}</span>
              <span className="text-[12px]">{email}</span>
            </div>
            <img
              className="rounded-full"
              src={picture}
              alt="Profile"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
        }
        dismissOnClick={false}
        inline
      >
        <Dropdown.Item onClick={logout}>
          <FormattedMessage id="link.signOut" />
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Header;
