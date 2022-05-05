import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_ALL_DATA } from "../utils/graphql/query";
import { ConvertString20 } from "../utils/helper/ConvertString";

const ListAnime = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div>
        <div className="list-anime">
          {(data.Page.media || []).map((item) => (
            //grid
            <div key={item.id} className="card-anime">
              <Link to={`/detail/` + item.id}>
                {/* <a href={`/detail/` + item.id}> */}
                <img src={item.coverImage.large} alt={item.title.english}></img>
                <div className="text-card">
                  <div>
                    <p className="item-name">
                      {ConvertString20(item.title.romaji)}
                    </p>
                  </div>
                </div>
                {/* </a> */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListAnime;
