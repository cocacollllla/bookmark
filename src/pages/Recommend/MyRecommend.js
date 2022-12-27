import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMyRecommend } from "../../api/axios";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { authorSlice } from "../../util/util";

const Recommend = () => {
  const users = useSelector((state) => state.users);
  const [recommendList, setRecommendList] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getFriendList = async () => {
      setLoading(true);
      const list = await getMyRecommend(users.uid);
      setRecommendList(list);
      setLoading(false);
    };

    getFriendList();
  }, [users]);

  const goToDetailView = (card) => {
    navigate(`/recommend/detailview`, { state: card });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      {(!recommendList || recommendList.length === 0) && (
        <NoData>추천한 책이 없습니다.</NoData>
      )}
      {recommendList?.map((card) => (
        <RecommendCard key={card.docId}>
          <RecommendContent>
            <div className="bookinfo">
              <div>
                <img src={card.cover} alt="" />
              </div>
              <div>
                <p>{card.title}</p>
                <p>{authorSlice(card.author)}</p>
              </div>
            </div>
            <div className="content">"{card.content}"</div>
            <div className="moreIcon" onClick={() => goToDetailView(card)}>
              <IoIosArrowDown className="icon" />
            </div>
          </RecommendContent>
        </RecommendCard>
      ))}
    </Container>
  );
};

export default Recommend;

const Container = styled.div`
  font-size: 0.9rem;
`;

const RecommendCard = styled.div`
  margin-bottom: 20px;
`;

const RecommendContent = styled.div`
  padding: 15px;
  background-color: ${(props) => props.theme.gray100};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;

  span {
    font-weight: 500;
  }

  .bookinfo {
    display: flex;
    align-items: center;
    padding: 0 0 15px 0;

    div:first-child {
      width: 60px;

      img {
        width: 100%;
      }
    }

    div:last-child {
      margin-left: 10px;

      p {
        padding: 5px 0;
      }
    }
  }

  .content {
    line-height: 20px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .moreIcon {
    padding-top: 10px;
    text-align: center;
    font-size: 25px;
    color: ${(props) => props.theme.mainColor};
  }
`;

const NoData = styled.div`
  padding: 50px 0;
  text-align: center;
`;
