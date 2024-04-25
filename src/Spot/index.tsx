import SpotNavigation from "./Navigation";
import AdminHomePage from "./Admin";
import PostScreen from "./Post";
import Profile from "./Profile";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import RedirectPage from "./Post/RedirectPage";
import Feed from "./Feed";
import Signin from "./Login/Signin";
import AdminSignin from "./Admin/Signin";

const Spot = () => {
  return (
    <Provider store={store}>
      <div className="kb-container">
    <SpotNavigation />

    <Routes>
      <Route path="/" element={<Navigate to="/Feed" />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Admin/Signin" element={<AdminSignin />} />
      <Route path="/Profile/*" element={<Profile/>} />
      <Route path="/Post/*" element={<PostScreen />} />
      <Route path="/Admin" element={<AdminHomePage />} />
      <Route path="/Feed" element={<Feed />} />
      <Route path="/redirect" element={<RedirectPage />} />
    </Routes>
  </div>
    </Provider>)

};

export default Spot;