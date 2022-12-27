import { useState, useEffect } from "react";
import { MdClose, MdAdd } from "react-icons/md";
import styled from "styled-components";

const FriendCard = ({ users, friend, addFriendHandler, deleteFriend }) => {
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const isf = users.friends.findIndex((el) => el === friend.uid);
    if (isf !== -1) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  }, [friend, users]);

  return (
    <Card>
      <Image>
        <img
          src={
            friend.photoUrl === ""
              ? "/assets/default_profile.jpg"
              : friend.photoUrl
          }
          alt="친구 프로필사진"
        />
      </Image>
      <div>{friend.name}</div>
      {!isFriend && (
        <AddButton onClick={() => addFriendHandler(friend.uid)}>
          <MdAdd />
        </AddButton>
      )}
      {isFriend && (
        <AddButton onClick={() => deleteFriend(friend.uid)}>
          <MdClose className="deleteIcon" />
        </AddButton>
      )}
    </Card>
  );
};

export default FriendCard;

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  font-size: 0.9rem;
`;

const Image = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const AddButton = styled.div`
  margin-left: auto;
  font-size: 1.2rem;
  color: ${(props) => props.theme.mainColor};

  .deleteIcon {
    color: ${(props) => props.theme.accentColor};
  }
`;
