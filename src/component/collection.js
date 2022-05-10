import { useContext } from "react";
import { Link } from "react-router-dom";
import { AnimeContext } from "../pages/ContextAnime";

const IncludeCollection = () => {
  const [anime] = useContext(AnimeContext);
  return (anime || []).map((item, index) => (
    <div>
      <Link to={`/collection/detail/` + item.name}>
        <div key={index}>{item.name}</div>
      </Link>
    </div>
  ));
};

export default IncludeCollection;
