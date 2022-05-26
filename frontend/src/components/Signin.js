import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./Fonts.css";

const SignIn = () => {
  const { setLoggedIn, setError, error, user, setUser, loggedIn } =
    useContext(UserContext);

  let redirect = useHistory();

  const login = async () => {
    setError(false);
    setUser("");
    try {
      let loggedUser = "";

      const fetchUsers = await fetch("api/users");
      const users = await fetchUsers.json();

      const validUser = users.data.filter(
        (username) => username.name.toLowerCase() === user.toLowerCase()
      );

      if (validUser.length > 0) {
        loggedUser = JSON.stringify(validUser[0]);
        redirect.push("/");
      } else {
        loggedUser = user;
      }

      const verifyLogin = await fetch("/api/users/", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: loggedUser,
      });

      if (verifyLogin.ok) {
        const loggedMessage = await verifyLogin.json();
        return loggedMessage;
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = await login();

    if (userData) {
      setLoggedIn(userData.data);
    }
  };

  return (
    <Wrapper>
      {Object.keys(loggedIn).length > 0 ? (
        <div>You're already logged in. Stop that.</div>
      ) : (
        <InputWrapper>
          <form onSubmit={handleLogin}>
            <InputBox
              type="text"
              required
              placeholder="Enter you name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <SignInButton>Login</SignInButton>
          </form>
          {error && <ErrorMessage>User not found</ErrorMessage>}
        </InputWrapper>
      )}
    </Wrapper>
  );
};

const InputWrapper = styled.div`
  width: 500px;
  height: 200px;
  background-color: rgb(255, 0, 60);
  border-top: solid;
  border-right: solid;
  border-color: rgb(4, 218, 246);
  border-width: 20px;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
`;
const InputBox = styled.input`
  background-color: rgb(243, 230, 0);
  color: black;
  margin-top: 70px;
  margin-left: 80px;
  width: 300px;
  font-size: 30px;
  font-family: "Syne Mono";
`;

const Wrapper = styled.div`
  background-color: rgb(243, 230, 0);
  width: 100vw;
  height: 100vh;
`;

const ErrorMessage = styled.div`
  color: black;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 160px;
  font-size: 20px;
`;

const SignInButton = styled.button`
  background-color: rgb(243, 230, 0);
  width: 70px;
  height: 30px;
  margin-left: 20px;
  font-weight: bold;
  font-size: 15px;
  font-family: "Syne Mono";

  &:hover {
    background-color: rgb(4, 218, 246);
  }
`;

export default SignIn;
