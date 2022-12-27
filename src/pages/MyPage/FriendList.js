import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getFriends, userProfileUpdate } from "../../api/axios";
import Loading from "../../components/Loading";
import { usersActions } from "../../store/users/users-slice";
import FriendCard from "./FriendCard";

const FriendList = () => {
  const [loading, setLoading] = useState(false);
  const [friendList, setFriendList] = useState(null);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (users.friends.length === 0) {
      setFriendList(null);
      return;
    }
    const getFriendList = async () => {
      setLoading(true);
      const list = await getFriends(users.friends);
      setFriendList(list);
      setLoading(false);
    };

    getFriendList();
  }, [users]);

  const deleteFriend = async (friendUid) => {
    setLoading(true);
    const list = users.friends.filter((el) => el !== friendUid);
    await userProfileUpdate(users.uid, { friends: list });
    dispatch(usersActions.updateFriends(list));
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {!!friendList ? (
        friendList.map((friend) => (
          <div key={friend.uid}>
            <FriendCard
              friend={friend}
              users={users}
              deleteFriend={deleteFriend}
            />
          </div>
        ))
      ) : (
        <NoData>
          <p>친구가 없습니다.</p>
          <div onClick={() => navigate("/addfriend")}>친구 추가</div>
        </NoData>
      )}
    </div>
  );
};

export default FriendList;

const NoData = styled.div`
  text-align: center;
  font-size: 0.9rem;

  p {
    padding: 50px 0;
  }

  div {
    width: 90px;
    height: 40px;
    margin: 0 auto;
    background-color: ${(props) => props.theme.mainColor};
    border-radius: 10px;
    color: white;
    line-height: 40px;
    font-weight: 500;
  }
`;
