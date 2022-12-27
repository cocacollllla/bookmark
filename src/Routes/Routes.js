import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import Login from "../pages/Sign/Login";
import Signup from "../pages/Sign/Signup";
import Welcome from "../pages/Welcome/Welcome";
import BookInfo from "../pages/BookInfo/BookInfo";
import Write from "../pages/Write/Write";
import View from "../pages/View/View";
import AddBookmark from "../pages/AddBookmark/AddBookmark";
import Loading from "../components/Loading";
import MyPage from "../pages/MyPage/MyPage";
import AddFriend from "../pages/MyPage/AddFriend";
import FriendList from "../pages/MyPage/FriendList";
import RecommendWrite from "../pages/Recommend/RecommendWrite";
import Recommend from "../pages/Recommend/Recommend";
import RecommendDetail from "../pages/Recommend/RecommendDetail";
import MyRecommend from "../pages/Recommend/MyRecommend";
import Favorite from "../pages/MyPage/Favorite";
import MyBookList from "../pages/MyBookList/MyBookList";
import Chart from "../pages/Chart/Chart";
import SetGoals from "../pages/Chart/SetGoals";
import styled from "styled-components";

const Routing = ({ isLoggedIn }) => {
  return (
    <Router>
      <Wrap>
        <Header />
        <Container>
          <Routes>
            {isLoggedIn && (
              <>
                <Route path={"/"} exact={true} element={<Home />} />
                <Route
                  path={"/booklist"}
                  exact={true}
                  element={<MyBookList />}
                />
                <Route path={"/search"} exact={true} element={<Search />} />
                <Route
                  path={"/bookinfo/:id"}
                  exact={true}
                  element={<BookInfo />}
                />
                <Route path={"/write/:id"} exact={true} element={<Write />} />
                <Route path={"/view/:id"} exact={true} element={<View />} />
                <Route
                  path={"/addbookmark/:id"}
                  exact={true}
                  element={<AddBookmark />}
                />
                <Route path={"/mypage"} exact={true} element={<MyPage />} />
                <Route
                  path={"/addfriend"}
                  exact={true}
                  element={<AddFriend />}
                />
                <Route
                  path={"/friendlist"}
                  exact={true}
                  element={<FriendList />}
                />
                <Route
                  path={"/recommend/write"}
                  exact={true}
                  element={<RecommendWrite />}
                />
                <Route
                  path={"/recommend/view"}
                  exact={true}
                  element={<Recommend />}
                />
                <Route
                  path={"/recommend/detailview"}
                  exact={true}
                  element={<RecommendDetail />}
                />
                <Route
                  path={"/recommend/myrecommend"}
                  exact={true}
                  element={<MyRecommend />}
                />
                <Route path={"/chart"} exact={true} element={<Chart />} />
                <Route path={"/setgoals"} exact={true} element={<SetGoals />} />
                <Route path={"/favorite"} exact={true} element={<Favorite />} />
                <Route path={"/loading"} exact={true} element={<Loading />} />
              </>
            )}
            {!isLoggedIn && (
              <>
                <Route path={"/welcome"} exact={true} element={<Welcome />} />
                <Route path={"/signup"} exact={true} element={<Signup />} />
                <Route path={"/login"} exact={true} element={<Login />} />
              </>
            )}
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/welcome"} />}
            />
          </Routes>
        </Container>
      </Wrap>
    </Router>
  );
};
export default Routing;

const Wrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  margin: 0 auto;
  outline: 1px solid #ddd;
`;

const Container = styled.div`
  padding: 65px 25px 0 25px;
  height: 100%;
  overflow: auto;
`;
