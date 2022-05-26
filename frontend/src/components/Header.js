import styled from "styled-components";
import { UserContext } from "./UserContext";
import React from "react";
import { Link } from "react-router-dom";
import "./Fonts.css";

const Header = () => {
  const { loggedIn, setLoggedIn } = React.useContext(UserContext);

  const handleLoggedIn = () => {
    setLoggedIn("");
  };

  return (
    <Heading>
      <HomeLink to={"/"}>Cyberspace</HomeLink>

      <UserManegement>
        {Object.keys(loggedIn).length > 0 ? (
          <ManagementWrapper>
            Hello, {loggedIn.name}
            <LinksWrapper>
              <SwitchUser
                type="button"
                to={"/signin"}
                onClick={() => handleLoggedIn()}
              >
                Switch Users
              </SwitchUser>
              |
              <Logout type="button" to={"/"} onClick={() => handleLoggedIn()}>
                Logout
              </Logout>
            </LinksWrapper>
          </ManagementWrapper>
        ) : (
          <RegLinks>
            <SignInLink to={"/signin"}>Sign In</SignInLink>|
            <SignUpLink to={"/signup"}>Sign Up</SignUpLink>
          </RegLinks>
        )}
      </UserManegement>
    </Heading>
  );
};

const Heading = styled.div`
  background-color: black;
  width: 100vw;
  height: 100px;
  font-size: 35px;

  color: white;
`;

const SignInLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 10px;
  font-family: "Syne Mono";
  color: rgb(255, 0, 60);
  font-size: 20px;

  &:hover {
    color: rgb(243, 230, 0);
  }
`;

const SignUpLink = styled(Link)`
  text-decoration: none;
  color: white;

  margin-left: 12px;
  font-family: "Syne Mono";
  color: rgb(4, 218, 246);
  font-size: 20px;

  &:hover {
    color: rgb(243, 230, 0);
  }
`;

const HomeLink = styled(Link)`
  display: absolute;
  float: left;
  margin-left: 20px;
  margin-top: 10px;
  font-size: 60px;

  font-family: "Syne Mono";
  text-decoration: none;
  color: rgb(4, 218, 246);
`;

const SwitchUser = styled(Link)`
  text-decoration: none;
  margin-right: 10px;
  font-family: "Syne Mono";
  color: rgb(4, 218, 246);
  font-size: 20px;

  &:hover {
    color: rgb(243, 230, 0);
  }
`;

const Logout = styled(Link)`
  text-decoration: none;
  margin-left: 10px;
  color: rgb(255, 0, 60);
  font-size: 20px;

  &:hover {
    color: rgb(243, 230, 0);
  }
`;

const UserManegement = styled.div`
  display: absolute;
  font-family: "Syne Mono";
  float: right;
  margin-right: 20px;
  font-size: 20px;
  padding-top: 25px;
  text-decoration: none;
  color: rgb(243, 230, 0);
`;

const ManagementWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinksWrapper = styled.div`
  display: flex;
  margin-top: 5px;
`;

const RegLinks = styled.div`
  display: absolute;
  margin-top: 40px;
`;

export default Header;
