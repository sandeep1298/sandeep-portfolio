import React from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";



const arrowStyle3 = {
  background: "#f8a981",
  border: "none",
  borderRadius: "50%",
  color: "white",
  fontSize: "20px",
  margin: "12px",
};

const arrowStyle4 = {
  background: "#f8a981",
  border: "none",
  borderRadius: "50%",
  color: "white",
  fontSize: "20px",
  margin: "12px",
};

export const CustomRightCarousel = ({ onClick }) => (
    <button className="arrow left " onClick={onClick} style={arrowStyle3}>
      <div className="text-center  flex flex-wrap justify-center">
      <RiArrowLeftSLine className="arrow_left" />
      </div>
    </button>
  );

export const CustomLeftCarousel = ({ onClick }) => (
  <button className="arrow right" onClick={onClick} style={arrowStyle4}>
     <div className="text-center  flex flex-wrap justify-center">
    <RiArrowRightSLine className="arrow_left"/>
    </div>
  </button>
);
