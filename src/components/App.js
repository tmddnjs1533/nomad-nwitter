import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { authService } from "myBase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "로딩중"
      )}
      {/*<footer>&copy; {new Date().getFullYear()} Nwitter</footer>*/}
    </>
  );
}

export default App;
