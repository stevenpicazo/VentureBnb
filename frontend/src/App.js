import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots"
import SpotDetails from "./components/SpotsDetails/SpotDetails";
import CreateSpot from "./components/CreateSpot/CreateSpot";
import CurrentUserSpots from "./components/CurrenUserSpots/CurrentUsersSpots";
// import MySpots from "./components/MySpots"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = "/">
            <Spots/>
          </Route>
          <Route path={'/listings'}>
            <CurrentUserSpots />
          </Route>
          <Route path={"/host"}>
            <CreateSpot />
          </Route>
 
          <Route exact path={"/spots/:spotId"}>
            <SpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;