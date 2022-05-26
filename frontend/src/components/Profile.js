import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  const [user, setUser] = useState([]);
  const [isFriend, setIsFriend] = useState();
  const [friends, setFriends] = useState([]);
  const { id } = useParams();

  const handleStyling = () => {
    if (isFriend) {
      return { backgroundColor: "rgb(255, 0, 60)" };
    } else {
      return { backgroundColor: "rgb(4, 218, 246)" };
    }
  };

  const fetchLoggedIn = async () => {
    const fetchUser = await fetch(`/api/users/${loggedIn.id}`);
    const loggedUser = await fetchUser.json();
    setLoggedIn(loggedUser.data);
  };

  const fetchFriend = async () => {
    try {
      const fetchedUser = await fetch(`/api/users/${id}`);
      const userInfo = await fetchedUser.json();

      setUser(userInfo.data);

      const friends = userInfo.data.friends;

      const friendData = await Promise.all(
        friends.map(async (friend) => {
          return await fetch(`/api/users/${friend}`)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              return res.data;
            });
        })
      );

      setFriends(friendData);

      return userInfo;
    } catch (err) {
      console.log(err);
    }
  };

  const friendArr = JSON.stringify({ newFriends: [loggedIn.id, user.id] });

  const addFriend = async () => {
    try {
      return await fetch("/api/friends", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: friendArr,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        })
        .then(fetchFriend)
        .then(fetchLoggedIn);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFriend();
    if (Object.keys(loggedIn).length > 0) {
      if (loggedIn.friends.includes(id)) {
        setIsFriend(true);
      } else setIsFriend(false);
    }
  }, [id]);

  return (
    <Wrapper>
      <ProfileCard>
        <BannerWrapper>
          <Banner src="/images/Banner.jpeg" />
        </BannerWrapper>
        <ProfilePic src={user.avatarUrl} />
        <Bio>{user.bio}</Bio>
        <Name>{user.name}</Name>
        {Object.keys(loggedIn).length && user.id !== loggedIn.id ? (
          <AddFriend
            style={handleStyling()}
            onClick={async () => {
              await addFriend();
              setIsFriend(!isFriend);
            }}
          >
            {isFriend ? "Unfriend" : "Add friend"}
          </AddFriend>
        ) : (
          ""
        )}
        <FriendBox>
          &#8201; Chooms
          <FriendPicWrapper>
            {friends.length > 0 &&
              friends.map((friend) => (
                <LinkContainer key={friend.id} to={`/users/${friend.id}`}>
                  <FriendPic src={friend.avatarUrl} />
                </LinkContainer>
              ))}
          </FriendPicWrapper>
        </FriendBox>
      </ProfileCard>
    </Wrapper>
  );
};

const ProfilePic = styled.img`
  height: 200px;
  position: absolute;
  margin-top: 120px;
  margin-left: 50px;
  border: solid;
  border-color: rgb(255, 0, 60);
  border-width: 3px;
`;

const Name = styled.div`
  font-family: "Syne Mono";
  font-size: 40px;
  font-weight: bold;
`;

const Bio = styled.div`
  font-family: "Syne Mono";
  position: absolute;
  width: 500px;
  background-color: rgb(0, 0, 0, 0.6);
  color: yellow;
  padding: 20px;
  font-size: 18.5px;
  border-radius: 20px;
  margin-left: 300px;
  margin-top: 130px;
  word-wrap: break-word;
`;

const LinkContainer = styled(Link)``;

const Wrapper = styled.div`
  background-color: rgb(243, 230, 0);
  width: 100vw;
  height: 1500px;
`;

const BannerWrapper = styled.div`
  padding-top: 50px;
  position: absolute;
`;

const Banner = styled.img`
  height: 500px;
`;

const FriendPic = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  transition: transform 0.5s;
  border: solid;
  border-width: 2px;
  margin-left: 10px;
  top: 10px;
  border-color: rgb(4, 218, 246);
  &:active,
  &:hover {
    transform: scale(1.2);
  }
`;

const FriendPicWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 150px;
  padding-top: 5px;
`;

const ProfileCard = styled.div`
  height: 500px;
  width: 890px;
  padding: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const AddFriend = styled.button`
  position: absolute;
  width: 100px;
  height: 50px;
  font-family: "Syne Mono";
  font-weight: bold;
  font-size: 15px;
  color: black;
  margin-left: 780px;
  top: 150px;
`;

const FriendBox = styled.div`
  color: white;
  flex-wrap: wrap;
  position: absolute;
  width: 270px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 170px;
  margin-top: 300px;
  margin-left: 10px;
  background-color: rgb(0, 0, 0, 0.6);
  font-family: "Syne Mono";
  font-size: 25px;
  font-weight: bold;
  border-radius: 20px;
`;

export default Profile;
