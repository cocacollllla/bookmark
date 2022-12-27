import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./config/keys";
import { doc, getDoc } from "firebase/firestore";
import Routes from "./Routes/Routes";
import { usersActions } from "./store/users/users-slice";
import Loading from "./components/Loading";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDoc(doc(db, "users", user.uid));

        dispatch(usersActions.replaceData(snapshot.data()));
        setIsLoggedIn(true);
      } else {
        dispatch(usersActions.replaceData(null));
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [dispatch]);
  return <>{init ? <Routes isLoggedIn={isLoggedIn} /> : <Loading />}</>;
}

export default App;
