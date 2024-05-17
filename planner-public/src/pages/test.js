import React from "react";

// Tweak it in such a way that you are adding to the base color
const colors = [0];
// const colors = [
//   [255, 0, 0],
//   [255, 127, 0],
//   [255, 255, 0],
//   [127, 255, 0],
//   [0, 255, 0],
//   [0, 255, 127],
//   [0, 255, 255],
//   [0, 127, 255],
//   [0, 0, 255],
//   [127, 0, 255],
//   [255, 0, 255],
//   [255, 0, 127],
//   [255, 0, 0],
//   [255, 127, 0],
//   [255, 255, 0],
//   [127, 255, 0],
//   [0, 255, 0],
//   [0, 255, 127],
//   [0, 255, 255],
//   [0, 127, 255],
//   [0, 0, 255],
//   [127, 0, 255],
//   [255, 0, 255],
//   [255, 0, 127],
// ];

//reciev parent color and take the deviation if that color number based on the depth

//Takes a number and adds subtracts 10 from it
const getCircularNumbers = (number, factor) => {
  //To get child colors
  let addNum = number + factor;
  let subNum = number - factor;
  if (addNum > 360) {
    addNum = addNum - 360;
  }
  if (subNum < 0) {
    subNum = 360 + subNum;
  }
  return { addNum, subNum };
};

const TestPage = () => {
  return (
    <div className="">
      {[0, 120, 240].map((num) => {
        const { addNum, subNum } = getCircularNumbers(num, 30);
        let children = [addNum, subNum];
        console.log(children);
        return (
          <div className="flex flex-col max-w-3xl mt-3">
            <Block color={num} />
            <div className="flex w-full flex-wrap gaps-4">
              {children.map((box, i) => {
                return <Block color={box} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Block = ({ color }) => {
  return (
    <div style={{ background: `hsl( ${color}, 100%, 50%)` }} className="w-full h-4 flex items-center text-[#000] justify-center">
      <h1>{color}</h1>
    </div>
  );
};

export default TestPage;

export const Head = () => <title>Test Page</title>;
