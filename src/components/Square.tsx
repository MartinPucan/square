import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import {Rectangle} from "./Rectangle";

const convertNumbersToArray = (numbers: string): number[] => numbers.split(',').map(Number);

export const Square = () => {
  const [searchParams, setSearchParams] = useSearchParams([]);
  const [convertedNumbers, setConvertedNumbers] = useState<number[] | []>([]);

  const { search } = useLocation();

  console.log(search, searchParams);

  const getNumbersFromUrl = (numbers: string | null): number[]  => {

    if (!numbers) {
      return [];
    }

    return convertNumbersToArray(numbers);
  }

  useEffect(() => {
    const test = getNumbersFromUrl(searchParams.get('numbers'));

    setConvertedNumbers(test);
  }, [search]);

  const squareArea = convertedNumbers.reduce((a, b) => a + b);
  const side = Math.sqrt(squareArea);

  const getUsedSide = (arr: number[], maxNum: number): number => {
    const maxIndex = arr.indexOf(maxNum);

    if (maxIndex === -1) {
      return arr.reduce((acc, cur) => acc + cur, 0);
    }

    const x = arr.length - maxIndex - 1;

    if (x <= 0) {
      return 0;
    }

    return x === 1
      ? arr[arr.length - 1]
      : arr.slice(maxIndex + 1).reduce((acc, cur) => acc + cur, 0);
  };

  const renderFilledSquareWithRectangles = (): JSX.Element[] => {
    const usedWidth: number[] = [];
    const usedHeight: number[] = [];

    let remainingWidth: number;
    let remainingHeight: number;

    let positionX = 0;
    let positionY = 0;

    return convertedNumbers.  map((size, index) => {
      let width = remainingWidth ?? side;
      let height = remainingHeight ?? side;

      if (index % 2 === 0) {
        width = size / index === 0 ? side: Number(side - remainingWidth);
        usedWidth.push(width);
        usedHeight.push(height);
      } else {
        height = size / Number(index === 0 ? side: remainingHeight);
        usedWidth.push(width);
        usedHeight.push(height);
      }

      if (index !== 0) {
        positionX = usedWidth.pop() === side ? 0 : remainingWidth;
      } else if (index > 1) {
        positionY = usedHeight.pop() === side ? 0 : remainingHeight;
      }

      remainingWidth = getUsedSide(usedWidth, side);
      remainingHeight = getUsedSide(usedHeight, side);

      return (
        <Rectangle width={width} height={height} positionX={Number(positionX)} positionY={positionY} />
      );
    });
  };

  return (
    <div
      className="container"
      style={{ width: `${side}rem`, height: `${side}rem`, position: 'relative' }}
    >
      {renderFilledSquareWithRectangles()}
    </div>
  );
};
