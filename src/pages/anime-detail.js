import { useQuery } from "@apollo/client";
import { GET_DATA_BY_ID } from "../utils/graphql/query";
import { ConvertString20 } from "../utils/helper/ConvertString";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AnimeContext } from "./ContextAnime";
import Button from "../component/button";
import IncludeCollection from "../component/collection";
import Loading from "../component/loading";

const AnimeDetail = () => {
  let { id } = useParams();

  const [anime, setAnime] = useContext(AnimeContext);
  const [isShow, setIsShow] = useState(true);
  const [notInclude, SetNotInclude] = useState([]);

  const handleClick = () => {
    setIsShow(!isShow);
  };

  let list = JSON.parse(localStorage.getItem("listCollection"));
  let NewArray = [];
  let NotInclude = [];

  useEffect(() => {
    const infoCollection = (id) => {
      for (var ojectNumbers in list) {
        if (list[ojectNumbers].data.length !== 0) {
          for (let i = 0; i < list[ojectNumbers].data.length; i++) {
            if (list[ojectNumbers].data[i].id == id) {
              if (NewArray.includes(list[ojectNumbers]) == false) {
                NewArray.push(list[ojectNumbers]);
                // console.log("LIST NEEW =>", NewArray);
              }
            }
            //if (list[ojectNumbers].data[i].id == !id) {
            if (NotInclude.includes(list[ojectNumbers]) == false) {
              NotInclude.push(list[ojectNumbers]);
              // console.log("NOt Include=>", NotInclude);
            }
            //}
          }
        } else {
          if (NotInclude.includes(list[ojectNumbers]) == false) {
            NotInclude.push(list[ojectNumbers]);
            // console.log("NOt Include=>", NotInclude);
          }
        }
      }
    };
    infoCollection(id);

    //console.log("INclude", NewArray);
    // console.log("tidak ada di collection:=>", NotInclude);
    SetNotInclude(NotInclude);
    setAnime(NewArray);
  }, [id]);

  //console.log("LIST COLLECTION=>", NotInclude);

  const { loading, error, data } = useQuery(GET_DATA_BY_ID, {
    variables: { id: id },
  });

  localStorage.setItem("newCollection", JSON.stringify(null));

  // useEffect(() => {
  //   JSON.parse(localStorage.getItem("listCollection"));
  // }, [isShow]);

  const addNewCollection = async (data) => {
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

  const addData = (getData, newdata) => {
    //console.log("GET DATA=>", getData);
    //console.log("NEW DATA=>", newdata);
    var existinglist = JSON.parse(localStorage.getItem("listCollection"));
    //console.log("existinglist=>", existinglist);
    //find index
    let objIndex = existinglist.findIndex((obj) => obj.name == getData.name);
    //console.log("findINdex", objIndex);
    console.log("check", existinglist[objIndex].data.includes(newdata));
    if (existinglist[objIndex].data.includes(newdata) == false) {
      existinglist[objIndex].data.push(newdata);
    }
    console.log("Update=>", existinglist);
    localStorage.setItem("listCollection", JSON.stringify(existinglist));
    alert(
      `${newdata.title.romaji} has been added to ${getData.name}'s collection`
    );
    setIsShow(!isShow);
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
          <div className="btn-group">
            <Button onClick={() => addNewCollection(data.Media)}>
              add to the new collection
            </Button>
            {isShow ? (
              <Button onClick={() => handleClick()}>
                add to an existing collection
              </Button>
            ) : (
              <div>
                {notInclude.map((item, index) => (
                  <>
                    <div key={index} onClick={() => addData(item, data.Media)}>
                      {item.name}
                    </div>
                  </>
                ))}
                <Button onClick={() => handleClick()}>cancel</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeDetail;
