import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import GetStarted from "./Pages/GetStarted/GetStarted";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import { RequireAuth } from "./components/ProtectedRoutes/RequireAuth";
import { LoggedUser } from "./components/ProtectedRoutes/LoggedUser";
import Profile from "./Pages/Profile/Profile";
import Category from "./Pages/Category/Category";
import TopChallengers from "./Pages/TopChallengers/TopChallengers";
import ChatView from "./Pages/Chat/ChatView";
import ChallengePage from "./Pages/ChallengePage/ChallengePage";
import { useContext } from "react";
import { DarkLightContext } from "./context/DarkLightContext";

function App() {
  const { changeMode } = useContext(DarkLightContext);
  return (
    <div className={`App ${changeMode ? "light" : "dark"}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <LoggedUser>
                <GetStarted />
              </LoggedUser>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/categories"
            element={
              <RequireAuth>
                <Category />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/:usernameParams"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/challenge/:cid"
            element={
              <RequireAuth>
                <ChallengePage />
              </RequireAuth>
            }
          />
          <Route
            path="/messages"
            element={
              <RequireAuth>
                <ChatView />
              </RequireAuth>
            }
          />
          <Route
            path="/category"
            element={
              <RequireAuth>
                <Category />
              </RequireAuth>
            }
          />
          <Route
            path="/top-challengers"
            element={
              <RequireAuth>
                <TopChallengers />
              </RequireAuth>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
