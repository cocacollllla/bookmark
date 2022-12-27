import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { searchFriend, userProfileUpdate } from "../../api/axios";
import Loading from "../../components/Loading";
import { usersActions } from "../../store/users/users-slice";
import FriendCard from "./FriendCard";

const AddFriend = () => {
  const [loading, setLoading] = useState(false);
  const [searchFriendResult, setSearchFriendResult] = useState(null);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const location = useLocation();
  const keyword = location.state;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await searchFriend(keyword);
      setSearchFriendResult(result[0]);
      setLoading(false);
    };

    if (keyword !== null) {
      getData();
    }
  }, [keyword]);

  const addFriendHandler = async (friendUid) => {
    let friends = [];
    if (users.friends) {
      friends = [...users.friends, friendUid];
    } else {
      friends.push(friendUid);
    }

    setLoading(true);
    await userProfileUpdate(users.uid, { friends });
    dispatch(usersActions.updateFriends(friends));
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {searchFriendResult === undefined && (
        <NoData>찾으시는 친구가 없습니다.</NoData>
      )}
      {searchFriendResult && (
        <FriendCardWrap>
          <FriendCard
            friend={searchFriendResult}
            addFriendHandler={addFriendHandler}
            users={users}
          />
        </FriendCardWrap>
      )}
    </div>
  );
};

export default AddFriend;

const FriendCardWrap = styled.div`
  margin-top: 60px;
`;

const NoData = styled.div`
  padding: 100px 0;
  text-align: center;
  font-size: 0.9rem;
`;
