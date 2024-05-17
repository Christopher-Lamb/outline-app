const fs = require("fs");
const path = require("path");

// create json file
// delete json file
// update json file
// get json file

const rowItem = (id, childId, content) => ({
  id: id,
  disabled: false,
  content: content ? content : "",
  rowIds: "",
  rowIds: childId ? [childId] : [],
});

const bluePrint = (name) => ({
  main: rowItem("main", "row-1", name),
  "row-1": rowItem("row-1"),
});

function formatString(str) {
  return str
    .trim() // Remove leading and trailing spaces
    .toLowerCase() // Convert all characters to lowercase
    .replace(/\s+/g, "-"); // Replace all spaces with '-'
}
const transformArray = (array) =>
  array.map(
    (file) => file.replace(".json", "") // Remove the .json extension
  );

const checkFileInDir = (filename) => {
  const directoryPath = path.join(__dirname, "..", "./json");
  let isInDir = null;

  try {
    const files = fs.readdirSync(directoryPath);
    if (files.includes(filename + ".json")) {
      isInDir = true;
    } else {
      isInDir = false;
    }
  } catch (err) {
    console.log(err);
  }
  return isInDir;
};

const createJSONFile = (name, override, jsonString) => {
  const filePath = path.join(__dirname, "..", `./json/${name}.json`);

  const isInDir = checkFileInDir(name);

  if (isInDir && !override) {
    // Return Do you want to do this action to user
    return false;
  } else {
    fs.writeFile(filePath, jsonString, (err) => {
      if (err) {
        // console.log("Error writing file", err);
      } else {
        // console.log("Successfully wrote file ");
      }
    });
    return true;
  }
};

const deleteJSONFile = async (name) => {
  const filePath = path.join(__dirname, "..", `./json/${name}.json`);

  try {
    const isInDir = await checkFileInDir(name);
    if (isInDir) {
      fs.unlinkSync(filePath);
      return { message: `File ${name}.json successfully deleted`, deleted: true };
    } else return { message: `${name}.json does not exist`, deleted: false };
    // console.log("File successfully deleted");
  } catch (err) {
    console.error("Error deleting the file:", err);
    return { message: err, deleted: false };
  }
};

const getJSONFile = async (name) => {
  const filePath = path.join(__dirname, "..", `./json/${name}.json`);
  try {
    const isInDir = await checkFileInDir(name);
    if (isInDir) {
      const data = fs.readFileSync(filePath, "utf-8");
      return { message: `File ${name}.json successfully got`, data: data };
    } else return { message: `${name}.json does not exist` };
    // console.log("File successfully deleted");
  } catch (err) {
    console.error("Error deleting the file:", err);
    return { message: err, data: "Error" };
  }
};

module.exports = {
  createFile: async (req, res) => {
    const { name, override = false } = req.body;
    //File will try to create  if it already exists it will return the post back to the user so that they can decide on the override
    // If the user decides to write over the existing file.json then this function will do just that
    // Create a two step process /warning for the user
    try {
      const formattedName = formatString(name);
      const jsonString = JSON.stringify(bluePrint(formattedName), null, 2);
      const actionCompleted = await createJSONFile(formattedName, override, jsonString);
      if (actionCompleted) {
        res.json({ message: `File ${formattedName}.json successfully created.`, completed: true });
      } else {
        res.json({ message: `File ${formattedName}.json already exists`, completed: false });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  updateFile: async (req, res) => {
    const { name, data } = req.body;

    try {
      const formattedName = formatString(name);
      await createJSONFile(formattedName, true, data);
      res.json({ message: `File ${formattedName}.json successfully updated`, completed: true });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  deleteFile: async (req, res) => {
    const { name } = req.query;
    try {
      const formattedName = formatString(name);
      const { deleted, message } = await deleteJSONFile(formattedName);
      res.json({ message: message, completed: deleted });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  getFile: async (req, res) => {
    const { name } = req.query;
    try {
      const formattedName = formatString(name);
      const { message, data } = await getJSONFile(formattedName);
      res.json({ message: message, data: data });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  getFileList: async (req, res) => {
    const directoryPath = path.join(__dirname, "..", "./json");
    try {
      const files = await fs.readdirSync(directoryPath);
      const transformedArray = await transformArray(files);
      res.json(transformedArray);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};
