import { Link } from "react-router-dom";
import Card from "../component/card";

const ListCollection = () => {
  let list = JSON.parse(localStorage.getItem("listCollection"));

  const removeItem = (item) => {
    let listColl = JSON.parse(localStorage.getItem("listCollection"));
    var remove = listColl.filter((x) => x.name !== item.name);

    localStorage.setItem("listCollection", JSON.stringify(remove));
    alert(`Collection:${item.name} has been delete`);
    list = JSON.parse(localStorage.getItem("listCollection"));
  };

  return (
    <>
      <div className="Layout">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "30px",
          }}
        >
          <button>add new collection</button>
        </div>
        <div className="list-anime">
          {(list || []).map((item, index) => (
            //grid
            <Card key={index} className="card-anime">
              <Link to={`/collection/detail/` + item.name}>
                <img src={item.data[0].coverImage.large} alt={item.name}></img>
                <div>{item.name}</div>
              </Link>
              <button onClick={() => removeItem(item)}>
                remove collection
              </button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListCollection;
