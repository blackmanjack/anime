import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../component/button";
import Card from "../component/card";
import Loading from "../component/loading";
import { GET_ALL_DATA } from "../utils/graphql/query";
import { ConvertString20 } from "../utils/helper/ConvertString";

const ListAnime = () => {
  const [page, SetPage] = useState(1);
  const { loading, error, data } = useQuery(GET_ALL_DATA, {
    variables: { page: page },
  });

  const NextPage = () => {
    SetPage(page + 1);
  };

  const PreviousPage = () => {
    if (page !== 1) {
      SetPage(page - 1);
    }
  };

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className="Layout">
        <div className="list-anime">
          {(data.Page.media || []).map((item) => (
            //grid
            <Card key={item.id} className="card-anime">
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
            </Card>
          ))}
        </div>
        <div className="list-btn">
          <Button onClick={() => PreviousPage()}>{`< Previous`}</Button>
          <Button onClick={() => NextPage()}>{`Next >`}</Button>
        </div>
      </div>
    </>
  );
};

export default ListAnime;
