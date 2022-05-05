import { useQuery } from "@apollo/client";
import { GET_DATA_BY_ID } from "../utils/graphql/query";
import { ConvertString20 } from "../utils/helper/ConvertString";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AnimeContext } from "./ContextAnime";

const AnimeDetail = () => {
  let { id } = useParams();

  const [anime, setAnime] = useContext(AnimeContext);

  console.log("idParams", id);

  let list = JSON.parse(localStorage.getItem("listCollection"));
  let NewArray = [];
  useEffect(() => {
    const infoCollection = (id) => {
      for (var ojectNumbers in list) {
        for (let i = 0; i < list[ojectNumbers].data.length; i++) {
          if (list[ojectNumbers].data[i].id == id) {
            //console.log("loop", list[ojectNumbers]);
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

  //console.log("ARRAY BARU=>", NewArray);

  //console.log("shit", anime);

  const { loading, error, data } = useQuery(GET_DATA_BY_ID, {
    variables: { id: id },
  });

  // sessionStorage.setItem("allEntries", null);

  const addNewCollection = async (data) => {
    let colectionname = prompt("Collection Name");
    let newData = {
      name: colectionname,
      data: [data],
    };
    localStorage.setItem("newCollection", JSON.stringify(newData));

    // Parse any JSON previously stored in listCollection
    var existinglist = JSON.parse(localStorage.getItem("listCollection"));
    if (existinglist == null) existinglist = [];

    let newList = JSON.parse(localStorage.getItem("newCollection"));
    // console.log("GET dari local", JSON.parse(newList));
    localStorage.setItem("newdata", JSON.stringify(newList));
    // Save listCollection back to local storage
    existinglist.push(JSON.parse(localStorage.getItem("newCollection")));
    localStorage.setItem("listCollection", JSON.stringify(existinglist));
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
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
        <div>
          <button onClick={() => addNewCollection(data.Media)}>
            add to the new collection
          </button>
          <button>add to an existing collection</button>
        </div>
      </div>

      <div className="test">
        <div>This anime is already in collection:</div>
        {(anime || []).map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
    </>
  );
};

export default AnimeDetail;
