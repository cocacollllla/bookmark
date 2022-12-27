import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getRecommend } from "../../api/axios";
import RecommendCard from "./RecommendCard";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Recommend = () => {
  const users = useSelector((state) => state.users);
  const [recommendList, setRecommendList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (users.friends.length === 0) {
      setRecommendList(null);
      return;
    }
    const getFriendList = async () => {
      setLoading(true);
      const list = await getRecommend(users.friends);
      setRecommendList(list);
      setLoading(false);
    };

    getFriendList();
  }, [users]);

  const goToDetailView = (card, userInfo) => {
    navigate(`/recommend/detailview`, { state: { card, userInfo } });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      {(!recommendList || recommendList.length === 0) && (
        <NoData>추천받은 책이 없습니다.</NoData>
      )}
      {recommendList?.map((card) => (
        <RecommendCard
          key={card.docId}
          card={card}
          goToDetailView={goToDetailView}
        />
      ))}
    </Container>
  );
};

export default Recommend;

const Container = styled.div`
  font-size: 0.9rem;
`;

const NoData = styled.div`
  padding: 50px 0;
  text-align: center;
`;
