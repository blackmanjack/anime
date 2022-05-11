import { Link } from "react-router-dom";
import Card from "../component/card";

const ListCollection = () => {
  let list = JSON.parse(localStorage.getItem("listCollection"));

  const addCollection = () => {
    let colectionname = prompt(
      "Please input your Collection Name. Your Collection Name must unique and doesn't have special character"
    );

    function CheckName() {
      if (list !== null) {
        let checkName = list.some((element) => element.name === colectionname);
        return checkName;
      }
    }

    //Input Collection Name again if :
    //Have special char, input == null, name isn't unique
    while (
      containsSpecialChars(colectionname) === true ||
      (colectionname !== null && colectionname === "") ||
      CheckName() === true
    ) {
      colectionname = prompt(
        "Please input your Collection Name. Your Collection Name must unique and doesn't have special character"
      );
    }

    //checkSpecialChar
    function containsSpecialChars(colectionname) {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specialChars.test(colectionname);
    }
    containsSpecialChars(colectionname);

    if (colectionname !== null) {
      let newData = {
        name: colectionname,
        data: [],
      };
      localStorage.setItem("newCollection", JSON.stringify(newData));
      // Parse any JSON previously stored in listCollection
      var existinglist = JSON.parse(localStorage.getItem("listCollection"));
      if (existinglist == null) existinglist = [];
      let newList = JSON.parse(localStorage.getItem("newCollection"));
      localStorage.setItem("newdata", JSON.stringify(newList));
      // Save listCollection back to local storage
      existinglist.push(JSON.parse(localStorage.getItem("newCollection")));
      localStorage.setItem("listCollection", JSON.stringify(existinglist));
    }
  };

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
          <button onClick={() => addCollection()}>add new collection</button>
        </div>
        <div className="list-anime">
          {(list || []).map((item, index) => (
            //grid
            <Card key={index} className="card-anime">
              <Link to={`/collection/detail/` + item.name}>
                {item.data.length === 0 ? (
                  <img src={"/logo512.png"} alt={item.name}></img>
                ) : (
                  <img
                    src={item.data[0].coverImage.large}
                    alt={item.name}
                  ></img>
                )}
                {/* <img src={item.data[0].coverImage.large} alt={item.name}></img> */}
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
