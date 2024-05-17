function getTextHeight(font, fontSize, text, maxWidth, verticalPadding, lineHeightFactor = 1.5) {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set the font and font size
  context.font = `${fontSize}px ${font}`;

  // Function to split text into lines considering maxWidth
  const getLines = (ctx, text, maxWidth) => {
    // Splitting the text by spaces to handle word wrapping
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      // Check if the current line plus the new word exceeds maxWidth
      const width = ctx.measureText(currentLine + " " + word).width;

      if (width < maxWidth) {
        // If it doesn't exceed, add the word to the current line
        currentLine += " " + word;
      } else {
        // If it exceeds, push the current line to lines array and start a new line
        lines.push(currentLine);
        currentLine = word;
      }
    }
    //
    // Push the last line
    lines.push(currentLine);

    return lines;
  };

  // Function to handle newline characters and split accordingly
  const splitByNewLine = (text) => {
    const lines = [];
    const paragraphs = text.split("\n");

    for (const paragraph of paragraphs) {
      lines.push(...getLines(context, paragraph, maxWidth));
    }

    return lines;
  };

  // Split the text into lines considering newlines and maxWidth
  const lines = splitByNewLine(text);

  // Calculate the total height
  const lineHeight = parseInt(fontSize, 10) * lineHeightFactor; // Line height roughly equal to font size
  const totalHeight = lineHeight * lines.length + verticalPadding * 2; // Include vertical padding in total height
  return totalHeight;
}
// // Usage example
// const font = "Arial";
// const fontSize = 16; // pixels
// const text = "Your long text here...";
// const maxWidth = 300; // pixels

// const height = getTextHeight(font, fontSize, text, maxWidth);

export default getTextHeight;
