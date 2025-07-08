import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
const Card = ({ cardData, deleteCard }) => {
  const date = new Date();
  // console.log(date);
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based in JavaScript
  let year = date.getFullYear();

  const title = cardData.title.slice(0, 100);
  const str = cardData.body.slice(0, 100);
  return (
    <div className="card">
      <div
        className="d-flex justify-content-end m-2 text-danger fs-3 cursor-pointer align-items-center"
        onClick={() => deleteCard(cardData.id)}
      >
        <IoClose />
      </div>

      <h6>{title}...</h6>
      <p>{str}...</p>
      <span className="opacity-25">{date.toUTCString()}</span>
      {/* <img src="#" alt="This is for sample" /> */}
    </div>
  );
};
export default Card;
