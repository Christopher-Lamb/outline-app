import React, { useState, useEffect, useRef } from "react";
import getTextHeight from "../utils/getTextHeight";
import useDebouncedResize from "../hooks/useDebounceResize";

const fontMap = {
  1: { fontSize: 36, lineFactor: 1.1, lineHeight: "40px" },
  2: { fontSize: 30, lineFactor: 1.2, lineHeight: "36px" },
  3: { fontSize: 24, lineFactor: 1.3, lineHeight: "32px" },
  4: { fontSize: 20, lineFactor: 1.4, lineHeight: "28px" },
  5: { fontSize: 16, lineFactor: 1.5, lineHeight: "24px" },
};

const DynamicInput = (props) => {
  const { onChange, style, value, ref, depth = 1, paddingX = 16, lineHeight = 1.5, paddingY = 8, ...other } = props;
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  let dynamicDepth = depth;
  if (dynamicDepth > 5) dynamicDepth = 5;
  const dynamicFontSize = fontMap[dynamicDepth].fontSize;
  const dynamicLineHeight = fontMap[dynamicDepth].lineHeight;
  const dynamicLineFactor = fontMap[dynamicDepth].lineFactor;

  useDebouncedResize(() => {
    if (inputRef.current) {
      const font = "sans-serif";
      const maxWidth = inputRef.current.clientWidth - paddingX * 2; // pixels
      const height = getTextHeight(font, dynamicFontSize, inputRef.current.value, maxWidth, paddingY, dynamicLineFactor);
      inputRef.current.style.height = "auto"; // Reset height
      inputRef.current.style.height = `${height}px`;
    }
  }, 1000);

  useEffect(() => {
    if (inputRef.current) {
      const font = "sans-serif";
      const maxWidth = inputRef.current.clientWidth - paddingX * 2; // pixels
      const height = getTextHeight(font, dynamicFontSize, inputValue, maxWidth, paddingY, dynamicLineFactor);
      inputRef.current.style.height = "auto"; // Reset height
      inputRef.current.style.height = `${height}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    if (value === undefined) {
      setInputValue("");
    } else {
      setInputValue(value);
    }
  }, []);

  const handleChange = (event) => {
    const target = event.target.value;
    setInputValue(target);
    onChange(event);
  };

  return (
    <>
      <textarea
        ref={inputRef}
        onChange={handleChange}
        value={inputValue}
        placeholder="..."
        style={{
          resize: "none",
          fontFamily: "sans-serif",
          padding: `${paddingY}px ${paddingX}px`,
          fontSize: `${dynamicFontSize}px`,
          height: "300px",
          // minHeight: `${paddingY + dynamicFontSize}px`,
          lineHeight: dynamicLineHeight,
          overflow: "hidden",
          minWidth: "100%", // Minimum width
          maxWidth: "100%", // Maximum width

          ...style,
        }}
        {...other}
      />
    </>
  );
};

export default DynamicInput;
