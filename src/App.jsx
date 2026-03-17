import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import AuthContext from "./AuthContext";
import RequireAuth from "./components/RequireAuth";
import useLocalStorage from "use-local-storage";
import WishlistContext from "./WishlistContext";
import NavbarMod from "./pages/NavbarMod";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [userWishlist, setUserWishlist] = useLocalStorage("user", []);

  document.body.classList.add("bg-secondary");
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <WishlistContext.Provider value={{ userWishlist, setUserWishlist }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavbarMod />}>
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WishlistContext.Provider>
    </AuthContext.Provider>
  );
}
