import { useContext } from "react";
import { Link } from "react-router-dom";
import { AnimeContext } from "../pages/ContextAnime";

const IncludeCollection = () => {
  const [anime] = useContext(AnimeContext);
  return (anime || []).map((item, index) => (
    <div key={index}>
      <Link to={`/collection/detail/` + item.name}>
        <div>{item.name}</div>
      </Link>
    </div>
  ));
};

export default IncludeCollection;
