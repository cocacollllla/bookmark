import { useState, useEffect } from "react";
import { getUsers } from "../../api/axios";
import styled from "styled-components";

const RecommendCard = ({ card, goToDetailView }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      const list = await getUsers(card.uid);
      setUserInfo(list);
    };

    getUserInfo();
  }, [card]);

  return (
    <Container onClick={() => goToDetailView(card, userInfo)}>
      <ProfileBox>
        <ProfileImage>
          <img
            src={
              userInfo.photoUrl === ""
                ? "/assets/default_profile.jpg"
                : userInfo.photoUrl
            }
            alt="프로필사진"
          />
        </ProfileImage>
        <div>{userInfo.name}</div>
      </ProfileBox>
      <RecommendContent>
        <div>
          <span>{userInfo.name}</span> 님이 책을 추천하셨습니다.
        </div>
        <div className="bookinfo">
          <div>
            <img src={card.cover} alt="" />
          </div>
          <div>
            <p>{card.title}</p>
            <p>{card.author}</p>
          </div>
        </div>
        <div className="content">"{card.content}"</div>
      </RecommendContent>
    </Container>
  );
};

export default RecommendCard;

const Container = styled.div`
  padding-bottom: 25px;
  margin-top: 25px;
  font-size: 0.9rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor}; ;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const RecommendContent = styled.div`
  margin-left: 40px;
  padding: 0 5px;

  span {
    font-weight: 500;
  }

  .bookinfo {
    display: flex;
    align-items: center;
    padding: 15px 0;

    div:first-child {
      width: 50px;

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
