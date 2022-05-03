import { Route, Link, BrowserRouter as Router, Routes } from "react-router-dom";
import ListAnime from "../pages/anime";
import AnimeDetail from "../pages/anime-detail";

const SwitchRouter = () => {
  return (
    <>
      <Router>
        <>
          <nav id="navbar">
            <div className="nav-wrapper">
              <div className="logo">Logo</div>
              <ul id="menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/collection">Collection</Link>
                </li>
              </ul>
            </div>
          </nav>
          <hr />
        </>

        <Routes>
          <Route path="/" element={<ListAnime />} />
          <Route path="/detail/:id" element={<AnimeDetail />} />
        </Routes>
      </Router>
    </>
  );
};

export default SwitchRouter;
