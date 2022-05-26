import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [isHovered, setIsHovered] = useState();
  const { loggedIn } = useContext(UserContext);

  let friendsArray = [""];

  if (Object.keys(loggedIn).length > 0) {
    friendsArray = loggedIn.friends;
  }

  const fetchUser = async () => {
    try {
      const user = await fetch("/api/users");
      return user.json();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser().then((res) => setUsers(res.data));
  }, [loggedIn]);

  return (
    <Wrapper>
      <PicsWrapper>
        {users.length > 0 &&
          users.map((user, index) => (
            <LinkContainer key={user.id} to={`/users/${user.id}`}>
              {friendsArray.includes(user.id) ? (
                <div>
                  {isHovered === user.id && <Name>{user.name}</Name>}
                  <FriendTag>Choom</FriendTag>
                  <ProfilePic
                    onMouseOver={() => setIsHovered(user.id)}
                    onMouseOut={() => setIsHovered("")}
                    src={user.avatarUrl}
                    id={user.id}
                  />
                </div>
              ) : (
                <div>
                  {isHovered === user.id && <Name>{user.name}</Name>}
                  <ProfilePic
                    onMouseOver={() => setIsHovered(user.id)}
                    onMouseOut={() => setIsHovered("")}
                    src={user.avatarUrl}
                    id={user.id}
                  />
                </div>
              )}
            </LinkContainer>
          ))}
      </PicsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: rgb(243, 230, 0);
  color: black;
  font-size: 30px;
  height: 100vh;
  width: 100vw;
`;

const PicsWrapper = styled.div`
  margin-top: 25px;
  position: absolute;
  width: 50vw;
  left: 50%;
  transform: translateX(-46%);
  display: flex;
  flex-wrap: wrap;
`;

const ProfilePic = styled.img`
  width: 140px;
  height: 140px;

  margin: 10px;
  transition: transform 0.5s;

  &:active,
  &:hover {
    transform: scale(1.2);
  }
`;

const LinkContainer = styled(Link)`
  text-decoration: none;
  transition: transform 0.5s;

  &:active,
  &:hover {
    transform: scale(1.1);
  }
`;

const FriendTag = styled.div`
  background-color: rgb(4, 218, 246, 0.6);
  height: 20px;
  color: rgb(243, 230, 0);
  width: 60px;
  font-family: "Syne Mono";
  text-align: center;
  font-size: 15px;
  text-decoration: none;
  position: absolute;
  margin-left: 90px;
  margin-top: 130px;
  z-index: 100;
`;

const Name = styled.div`
  position: absolute;
  color: yellow;
  font-size: 20px;
  font-family: "Syne Mono";
  font-weight: bold;
  text-align: center;
  height: 20px;
  width: 60px;
  z-index: 1000;
  top: 110px;
  margin-left: 40px;

  transform: translateX(-50%);
`;

export default Homepage;
