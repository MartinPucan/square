import React, {FC, Fragment, useId} from 'react';
import {getRandomColor} from "../utils";

interface IRectangle {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
}

export const Rectangle: FC<IRectangle> = ({ width, height, positionX, positionY}) => {
  const recKey = useId();

  return (
    <Fragment key={recKey}>
      <div
        style={{
          width: `${width}rem`,
          height: `${height}rem`,
          backgroundColor: getRandomColor(),
          position: "absolute",
          top: positionY,
          left: positionX,
        }}
      />
    </Fragment>
  );
};
