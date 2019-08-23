import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth().get('http://localhost:5000/api/colors')
      .then(res => {
        setColorList(res.data);
      })
      .catch(console.log);
  }, []);

  const updateColorList = color => {
    const newList = colorList.map(old => {
      if (color.id === old.id) {
        return color;
      }
      return old;
    });
    setColorList(newList);
  };

  const delColor = id => {
    const tryit = [...colorList];
    const newList = tryit.filter(old => old.id !== id);
    setColorList(newList);
  };

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={updateColorList}
        delColor={delColor}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
