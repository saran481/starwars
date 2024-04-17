import React, { useEffect, useState } from "react";
import { detailsInterFace, flimsInterface } from "./interfaces";

const Details: React.FC<{ details: detailsInterFace }> = (props) => {
  const [filmsList, setList] = useState<flimsInterface[]>([]);

  const { details } = props;


  useEffect(() => {
    if (props.details) {
      let urlsList = props.details?.films?.map((filmURL) =>
        fetch(filmURL).then((res) => res.json())
      );
      Promise.all(urlsList).then((res) => setList(res));
    }
  }, [props.details]);

  const getfilms = () => {
    let list: string[] = [];
    filmsList?.map((item:flimsInterface) => {
      list.push(item.title);
    });
    return list.toString();
  };

  return (
    <div className="character-detailsViews">
      <h1>{details?.name} Details</h1>
      <div>
        <b>Eye color : </b>
        {details?.eye_color}
      </div>
      <div>
        <b>Gender : </b>
        {details?.gender}
      </div>
      <div>
        <b>Hair color : </b>
        {details?.hair_color}
      </div>
      <div>
        <b>Home planet : </b>
        {details?.homePlanet}
      </div>
      <div>
        <b>Film List: </b>
        {getfilms() || '...Loading'}
      </div>
    </div>
  );
};

export default Details;
