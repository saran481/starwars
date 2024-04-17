import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { detailsInterFace, CallbackType } from "./interfaces";

interface Iprops {
  handleMoreDetails: CallbackType;
}

interface resp {
  results: detailsInterFace[];
}

interface planetObj {
  [k: string]: string;
}

const ListView = (props: Iprops) => {
  const [list, setList] = useState<detailsInterFace[]>([]);
  const [planet, setPlanet] = useState<planetObj>({});


  useEffect(() => {
    fetch("https://swapi.dev/api/people/?page=1")
      .then((res) => res.json())
      .then((res: resp) => {
        let planetList: planetObj = {};
        let urlsList = res.results?.map((filmURL: detailsInterFace) =>
          fetch(filmURL.homeworld).then((res) => res.json())
        );

        Promise.all(urlsList).then((li) => {
          li.map((item) => {
            planetList[item.url] = item.name;
          });
          setPlanet(planetList);
          setList(res.results);
        });
      });
  }, []);

  const showDetails = (name: string) => {
    const tempList = [...list];
    let details: any = tempList?.find(
      (item: detailsInterFace) => item.name === name
    );
    details.homePlanet = planet[details.homeworld];
    props.handleMoreDetails(details);
  };

  const handleGender = (e: React.FormEvent<HTMLSpanElement>,name : string) =>{
    const val = e.currentTarget.innerHTML || '';
    const tempList = [...list];
    tempList.map(item =>{
      if(item.name === name){
        item.gender = val
      }
    })
    setList(tempList)
  }

  return (
    <div>
      <div>
        <h2 className="title">STARWARS</h2>
      </div>
      <div className="character-list">
        {list?.map((item: detailsInterFace) => {
          return (
            <div
              className="character-name"
              onClick={() => showDetails(item.name)}
            >
              <h3> {item.name} </h3>
              <div className="gender"> Gender : <div contentEditable="true" className="gender-val"
               onBlur={(e)=>handleGender(e,item.name)}
               dangerouslySetInnerHTML={{__html: item.gender}}/> </div>
               
              <div>Home Planet: {planet[item.homeworld] || "N/A"}</div>
              <Link
                to={{
                  pathname: "/details",
                }}
              >
                More Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListView;
