import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import PersonalSpending from "./pages/PersonalSpending";
import DefaultLayout from "./components/Layout";
import Login from "./pages/Login";
import PublicRoute from "./components/Router/PublicRoute";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import ProtectedRoute from "./components/Router/ProtectedRoute";
import PageNotFound from "./pages/PagNotFound";
import Tools from "./pages/Tools";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myspending" element={<PersonalSpending />} />
            <Route exact path="/tools" element={<Tools />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;