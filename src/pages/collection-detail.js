import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimeContext } from "./ContextAnime";

const CollectionDetail = () => {
  let { id } = useParams();
  const [formCollection, setFormCollection] = useContext(AnimeContext);

  //console.log("idParams", id);
  let list = JSON.parse(localStorage.getItem("listCollection"));

  //list = list.filter((x) => x.name == item.id);

  let NewArray = [];
  useEffect(() => {
    const detailCollection = (id) => {
      for (var ojectNumbers in list) {
        if (list[ojectNumbers].name == id) {
          console.log("CARI=>", list[ojectNumbers]);
          if (NewArray.includes(list[ojectNumbers]) == false) {
            NewArray.push(list[ojectNumbers]);
          }
        }
      }
    };
    detailCollection(id);
    setFormCollection(NewArray);
  }, [id]);

  console.log("CollectID=>", formCollection);

  return (
    <>
      <div>
        {(formCollection || []).map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            <div>
              {(item.data || []).map((item) => (
                <div key={item.id} className="card-anime">
                  <div>{item.title.romaji}</div>
                  <div>
                    <img src={item.coverImage.medium} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CollectionDetail;
