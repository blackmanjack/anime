import { Link } from "react-router-dom";

const IncludeCollection = ({ item, index }) => {
  return (
    <>
      <div>
        <Link to={`/collection/detail/` + item.name}>
          <div key={index}>{item.name}</div>
        </Link>
      </div>
    </>
  );
};

export default IncludeCollection;
