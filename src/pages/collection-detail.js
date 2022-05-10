import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimeContext } from "./ContextAnime";

const CollectionDetail = () => {
  let { id } = useParams();
  const [formCollection, setFormCollection] = useContext(AnimeContext);

  let list = JSON.parse(localStorage.getItem("listCollection"));

  let NewArray = [];
  useEffect(() => {
    const detailCollection = (id) => {
      for (var ojectNumbers in list) {
        if (list[ojectNumbers].name == id) {
          if (NewArray.includes(list[ojectNumbers]) == false) {
            NewArray.push(list[ojectNumbers]);
          }
        }
      }
    };
    detailCollection(id);
    setFormCollection(NewArray);
  }, [id]);

  return (
    <>
      <div className="Layout">
        {(formCollection || []).map((item, index) => (
          <div key={index}>
            <div>Collection Name : {item.name}</div>
            <div>
              {(item.data || []).map((item, index) => (
                <Link to={`/detail/` + item.id}>
                  <div key={item.id} className="card-anime">
                    <div>{index + 1}</div>
                    <div>{item.title.romaji}</div>
                    <div>
                      <img src={item.coverImage.medium} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CollectionDetail;
