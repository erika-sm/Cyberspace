import React from "react";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";
import "./Fonts.css";

const SignUp = () => {
  const { newUser, setNewUser, setLoggedIn } = useContext(UserContext);
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState();

  let redirect = useHistory();

  const avatarArr = [];

  for (let i = 0; i < 14; i++) {
    avatarArr.push("");
  }

  let charactersLeft = 500 - newUser.bio.length;

  const handleStyling = () => {
    if (charactersLeft <= 125 && charactersLeft > 0) return { color: "orange" };
    else if (charactersLeft <= 0) return { color: "red" };
    else
      return {
        color: "grey",
      };
  };

  const randomId = Math.floor(Math.random() * 10000) + 2000;

  useEffect(() => {
    setNewUser({ ...newUser, id: randomId.toString(), name: "", bio: "" });
  }, []);

  const addNewUser = async () => {
    try {
      return await fetch("/api/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }).then((res) => res.json());
    } catch (err) {
      return err;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewUser().then((res) => {
      if (res.message === "Registration successful") {
        setSuccessfullyRegistered(true);
        setRegistrationMessage(res.message);
        setLoggedIn(newUser);
        setTimeout(() => redirect.push("/"), 2500);
      } else setRegistrationMessage(res.message);
    });
  };

  return (
    <Wrapper>
      {successfullyRegistered === false ? (
        <div>
          <Title>Cyberspace Registration</Title>
          <ErrorMessage>{registrationMessage}</ErrorMessage>
          <Form onSubmit={handleSubmit}>
            <Details>
              <Label>
                {" "}
                Your name
                <Name
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </Label>
              <Label>
                Bio (optional)
                <Bio
                  type="text"
                  placeholder="500 character limit"
                  value={newUser.bio}
                  onChange={(e) =>
                    setNewUser({ ...newUser, bio: e.target.value })
                  }
                />
                {newUser.bio.length > 0 && (
                  <CharacterCountdown style={handleStyling()}>
                    {charactersLeft}
                  </CharacterCountdown>
                )}
              </Label>
            </Details>
            <div>
              <ChooseAvatar>Choose your avatar</ChooseAvatar>
              <AvatarContainer>
                {avatarArr.map((avatar, index) => (
                  <div key={index + 30}>
                    <Label key={index + 20}>
                      <Avatars
                        key={index}
                        src={`../images/Avatars/${index + 1}.PNG`}
                        tabIndex={-1}
                        required
                      />
                      <RadioWrapper>
                        <RadioButton
                          key={index + 10}
                          type="radio"
                          name="avatars"
                          required
                          onClick={() =>
                            setNewUser({
                              ...newUser,
                              avatarUrl: `/images/Avatars/${index + 1}.PNG`,
                            })
                          }
                        />
                      </RadioWrapper>
                    </Label>
                  </div>
                ))}
              </AvatarContainer>
            </div>

            <SubmitButton>Submit</SubmitButton>
          </Form>
        </div>
      ) : (
        <SuccessfulRegistration>
          Successfully Registered! Redirecting to the homepage...
        </SuccessfulRegistration>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 1100px;
  background-color: rgb(243, 230, 0);
`;

const Details = styled.div`
  position: absolute;
  width: 400px;
`;

const SubmitButton = styled.button`
  position: absolute;
  margin-left: 450px;
  margin-top: 215px;
  background-color: rgb(243, 230, 0);
  width: 70px;
  height: 30px;
  font-weight: bold;
  font-size: 15px;
  font-family: "Syne Mono";

  &:hover {
    background-color: rgb(4, 218, 246);
  }
`;

const Title = styled.div`
  position: absolute;
  font-family: "Syne Mono";
  left: 30%;
  font-size: 50px;
  margin-top: 20px;
  background-color: rgb(255, 0, 60);
  border-top: solid;
  border-right: solid;
  border-color: rgb(4, 218, 246);
  border-width: 15px;
  color: rgb(243, 230, 0);
`;
const RadioButton = styled.input`
  display: absolute;
  left: 10px;
`;

const AvatarContainer = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  width: 900px;
  left: -130px;
  top: 300px;
  justify-content: center;
  text-align: center;
`;
const Avatars = styled.img`
  height: 150px;
  width: 150px;
  margin-left: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Name = styled.input`
  margin-left: 30px;
`;
const RadioWrapper = styled.div`
  position: relative;
`;

const Bio = styled.textarea`
  position: absolute;
  resize: none;
  outline: none;
  margin-left: 10px;
  width: 300px;
  height: 200px;
`;

const Form = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 30%;
  left: 30%;
`;

const ChooseAvatar = styled.div`
  font-weight: bold;
  position: absolute;
  top: 270px;
  width: 200px;
  left: -70px;
`;

const CharacterCountdown = styled.div``;

const SuccessfulRegistration = styled.div`
  font-family: "Syne Mono";
  font-size: 40px;
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  position: absolute;
  left: 50%;
  top: 30%;
  color: red;
  font-weight: bold;
`;

export default SignUp;
