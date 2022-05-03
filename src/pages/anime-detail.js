import { useQuery } from "@apollo/client";
import { GET_DATA_BY_ID } from "../utils/graphql/query";
import { ConvertString20 } from "../utils/helper/ConvertString";
import { useParams } from "react-router-dom";

const AnimeDetail = () => {
  let { id } = useParams();

  const { loading, error, data } = useQuery(GET_DATA_BY_ID, {
    variables: { id: id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  //   console.log("DATAdetail =>", data);

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
          <button>add to the collection</button>
        </div>
      </div>
    </>
  );
};

export default AnimeDetail;
