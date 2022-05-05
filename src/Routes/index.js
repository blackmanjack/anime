import { useState } from "react";
import { Route, Link, BrowserRouter as Router, Routes } from "react-router-dom";
import ListAnime from "../pages/anime";
import AnimeDetail from "../pages/anime-detail";
import ListCollection from "../pages/collection";
import CollectionDetail from "../pages/collection-detail";
import { AnimeContext } from "../pages/ContextAnime";

const SwitchRouter = () => {
  const [anime, setAnime] = useState([]);
  const [formCollection, setFormCollection] = useState({});
  const [listCollection, setListCollection] = useState([formCollection]);

  //console.log("ListCollection", listCollection);
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

        <AnimeContext.Provider
          value={[
            listCollection,
            setListCollection,
            anime,
            setAnime,
            formCollection,
            setFormCollection,
          ]}
        >
          <Routes>
            <Route path="/" element={<ListAnime />} />
            <Route path="/detail/:id" element={<AnimeDetail />} />
            <Route path="/collection" element={<ListCollection />} />
            <Route
              path="/collection/detail/:id"
              element={<CollectionDetail />}
            />
          </Routes>
        </AnimeContext.Provider>
      </Router>
    </>
  );
};

export default SwitchRouter;
