import SpotNavigation from "./Navigation";
import AdminHomePage from "./Admin";
import PostScreen from "./Post";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import RedirectPage from "./Post/RedirectPage";

const Spot = () => {
  return (
    <Provider store={store}>
      <div className="kb-container">
    <SpotNavigation />

    <Routes>
      <Route path="/" element={<Navigate to="/Feed" />} />
      <Route path="/Profile/*" element={<h1>Profile</h1>} />
      <Route path="/Post/*" element={<PostScreen />} />
      <Route path="/Admin" element={<AdminHomePage />} />
      <Route path="/Feed" element={<h1>Feed</h1>} />
      <Route path="/redirect" element={<RedirectPage />} />
    </Routes>
  </div>
    </Provider>)

};

export default Spot;