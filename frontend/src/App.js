import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
// import SpotDetails from "./components/SpotsDetails/SpotDetails";
import CreateSpot from "./components/CreateSpot/CreateSpot";
import CurrentUserSpots from "./components/CurrenUserSpots/CurrentUsersSpots";
import EditSpotForm from "./components/EditSpotForm";
import Trips from "./components/Bookings/Trips";
import SpotDetails from "./components/SpotsDetails";

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
          <Route exact path="/">
            <Spots />
          </Route>
          <Route path={'/listings'}>
            <CurrentUserSpots />
          </Route>
          <Route exact path={'/edit/listing/:spotId'}>
            <EditSpotForm />
          </Route>
          <Route path={"/host"}>
            <CreateSpot />
          </Route>
          <Route path={"/trips"}>
            <Trips />
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