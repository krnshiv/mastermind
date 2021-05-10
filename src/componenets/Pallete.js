import React from "react";

export const Pallete = ({
    list,
    selectedColor,
    setSelectedColor
}) => {
  const allColors = list.map((color) => {
    const active = color === selectedColor ? "active" : "";
    return (
      <div
        className={"color-holder " + color + " " + active}
        key={color}
        onClick={() => {
            setSelectedColor(color);
        }}
      ></div>
    );
  });

  return <div className="colors">{allColors}</div>;
};
