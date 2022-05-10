import { useQuery } from "@apollo/client";
import { GET_DATA_BY_ID } from "../utils/graphql/query";
import { ConvertString20 } from "../utils/helper/ConvertString";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AnimeContext } from "./ContextAnime";
import Button from "../component/button";
import IncludeCollection from "../component/collection";
import CollectionDetail from "./collection-detail";
import Loading from "../component/loading";

const AnimeDetail = () => {
  let { id } = useParams();

  const [anime, setAnime] = useContext(AnimeContext);

  let list = JSON.parse(localStorage.getItem("listCollection"));
  let NewArray = [];
  useEffect(() => {
    const infoCollection = (id) => {
      for (var ojectNumbers in list) {
        for (let i = 0; i < list[ojectNumbers].data.length; i++) {
          if (list[ojectNumbers].data[i].id == id) {
            if (NewArray.includes(list[ojectNumbers]) == false) {
              NewArray.push(list[ojectNumbers]);
            }
          }
        }
      }
    };
    infoCollection(id);
    setAnime(NewArray);
  }, [id]);

  const { loading, error, data } = useQuery(GET_DATA_BY_ID, {
    variables: { id: id },
  });

  const addNewCollection = async (data) => {
    let colectionname = prompt(
      "Please input your Collection Name. Your Collection Name must unique and doesn't have special character"
    );
    //check collection name is already added
    let checkName = list.some((element) => element.name === colectionname);

    //checkSpecialChar
    function containsSpecialChars(colectionname) {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specialChars.test(colectionname);
    }
    containsSpecialChars(colectionname);

    //ifspecialchar
    if (containsSpecialChars(colectionname) === true) {
      colectionname = prompt(
        "Your Collection Name have special character, Please add another collection name"
      );
    }

    //if collcetionname is null, show prompt again
    while (colectionname !== null && colectionname === "") {
      colectionname = prompt("Collection Name");
    }

    //if collectionname is already added, call another prompt message
    if (checkName === true) {
      colectionname = prompt(
        "Collection name is already added. Please add another collection name"
      );
    }

    //If collection name  input isn't null and name is unique, add collection
    if (colectionname !== null && checkName === false) {
      let newData = {
        name: colectionname,
        data: [data],
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

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className="Layout">
        <div key={data.Media.id} className="card-anime">
          <img
            src={data.Media.coverImage.large}
            alt={data.Media.title.english}
          ></img>
          <div className="text-card">
            <div>
              <p className="item-name">
                {ConvertString20(data.Media.title.romaji)}
              </p>
            </div>
          </div>
          <div className="btn-group">
            <Button onClick={() => addNewCollection(data.Media)}>
              add to the new collection
            </Button>
            <Button>add to an existing collection</Button>
          </div>
        </div>

        <div className="test">
          {anime.length !== 0 ? (
            <>
              <div>This item is in collection :</div>
              <IncludeCollection />
            </>
          ) : (
            <div style={{ color: "red" }}>Not added to any collection yet</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnimeDetail;
