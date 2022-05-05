import { useQuery } from "@apollo/client";
import { GET_ALL_DATA } from "../utils/graphql/query";
import { ConvertString20 } from "../utils/helper/ConvertString";

const ListAnime = () => {
  //   const [listData, setListData] = useState([]);
  const { loading, error, data } = useQuery(GET_ALL_DATA);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  //   console.log("DATA =>", data.Page.media);

  //   setListData(data.Page.media);

  return (
    <>
      <div>
        <div className="list-anime">
          {(data.Page.media || []).map((item) => (
            //grid
            <div key={item.id} className="card-anime">
              <a href={`/detail/` + item.id}>
                <img src={item.coverImage.large} alt={item.title.english}></img>
                <div className="text-card">
                  <div>
                    <p className="item-name">
                      {ConvertString20(item.title.romaji)}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListAnime;