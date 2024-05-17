import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Navbar from "../components/Navbar";
// import { useTheme } from "../context/ThemeContext";
import { Link } from "gatsby";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import PortalOverlay from "../components/PortalOverlay";
import { setupDatabaseAndGetKeys, addOutlineToStore, deleteDataFromStore } from "../utils/indexedDB";

//Will get the projects from files later

const IndexPage = () => {
  const [outlinesJSON, setOutlinesJSON] = useState([]);
  const [outlinesDB, setOutlinesDB] = useState([]);
  const [addWindow, setAddWindow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [serverError, setServerError] = useState(false);

  // Get all the JSON files / file names
  useEffect(() => {
    const initFunc = async () => {
      try {
        const { data } = await axios.get("http://localhost:3240/api/outline-list");

        await setOutlinesJSON(data);
      } catch (err) {
        await setupDatabaseAndGetKeys()
          .then((storeNames) => {
            setOutlinesDB(storeNames);
          })
          .catch((error) => console.error("Error setting up the database:", error));
      }
    };
    initFunc();

    // setServerError(true);
    // IF this error throws we are firing from IndexedDB

    // console.error("Error:", error);
  }, []);

  const handleAddOutline = async (e) => {
    setInputValue("");
    setAddWindow(false);
    try {
      const response = await axios.post("http://localhost:3240/api/outline", { name: inputValue });
      const { completed, message } = response.data;
      // // console.log(message, completed);
      if (!completed) {
        const bool = confirm(`${inputValue} already exists would you like to write over this file?`);
        if (bool) {
          await axios.post("http://localhost:3240/api/outline", { name: inputValue, override: true });
        }
      }
      const { data } = await axios.get("http://localhost:3240/api/outline-list");
      setOutlinesJSON(data);
    } catch (err) {
      //If our backend isnt set up we are storing to indexedDB
      addOutlineToStore(inputValue)
        .then((uid) => {
          // // console.log("Store added successfully");
          setOutlinesDB((prev) => [...prev, { title: inputValue, _id: uid }]);
        })
        .catch((error) => {
          console.error("Error adding store:", error);
        });
    }
  };

  const handleDelete = async (delId) => {
    const res = confirm("Are you sure you want to delete?");
    if (!res) return;
    try {
      await axios.delete("http://localhost:3240/api/outline", { params: { delId } });
      await setOutlinesJSON((prevOutlines) => prevOutlines.filter((item) => item._id !== delId));
    } catch (err) {
      deleteDataFromStore(delId)
        .then(() => {
          // console.log("Key deleted successfully");
          setOutlinesDB((prevOutlines) => prevOutlines.filter((item) => item._id !== delId));
        })
        .catch((error) => console.error("Error deleting key:", error));
      // console.log("Error", err);
    }
  };

  return (
    <main>
      <Navbar />
      <button onClick={() => setAddWindow((aw) => !aw)} className=" bg-[var(--secondary-color)] ml-10 mt-4 border border-[2px] border-[var(--secondary-text)] rounded-xl">
        <IoIosAdd className="fill-[var(--secondary-text)]" size={"3rem"} />
      </button>
      <PortalOverlay isRendering={addWindow}>
        <div className="rounded border border-2 border-[var(--primary-text)]  primary container md:max-w-2xl mx-auto mt-32">
          <div className="relative cursor-pointer" onClick={() => setAddWindow(false)}>
            <IoIosAdd className="fill-[var(--accent-text)] rotate-45 absolute right-0 top-0 fill-[var(--secondary-text)]" size={"3rem"} />
          </div>
          <div className="flex justify-center items-center min-h-[15rem]">
            <div className="flex flex-col">
              <label className="text-3xl mb-3 font-semibold text-white" htmlFor="outline-name">
                Create Outline
              </label>
              <div className="flex">
                <input
                  name="outline-name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="text-xl h-10 text-black min-w-[20rem] rounded px-2"
                  placeholder="Outline Name"
                ></input>
                <button className="accent rounded h-10 w-10 flex justify-center items-center" onClick={handleAddOutline}>
                  <IoIosAdd className="fill-[var(--accent-text)] " size={"2rem"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </PortalOverlay>
      <div className="gap-4 grid px-8 pt-4 container xl:max-w-7xl mx-auto">
        {outlinesJSON.length > 0
          ? outlinesJSON.map((name, i) => {
              return (
                <div key={i} className="relative outline-cont hover:scale-[1.05] duration-100 ease-linear">
                  <button className="absolute top-2 right-3 z-[1] hover:outline hover:outline-2 rounded" onClick={() => handleDelete(name)}>
                    <MdDeleteOutline size={"2rem"} />
                  </button>
                  <Link to={"/outline/" + name} key={name}>
                    <div className="bg-[var(--third-color)] border border-[var(--third-text)] text-[var(--third-text)] p-8 flex items-center rounded-lg ">
                      <h1 className="text-4xl">{name}</h1>
                    </div>
                  </Link>
                </div>
              );
            })
          : outlinesDB.map(({ title, _id }, i) => {
              return (
                <div key={i} className="relative outline-cont hover:scale-[1.05] duration-100 ease-linear">
                  <button className="absolute top-2 right-3 z-[1] hover:outline hover:outline-2 rounded" onClick={() => handleDelete(_id)}>
                    <MdDeleteOutline size={"2rem"} />
                  </button>
                  <Link to={"/outline/" + _id} key={title}>
                    <div className="bg-[var(--third-color)] border border-[var(--third-text)] text-[var(--third-text)] p-8 flex items-center rounded-lg ">
                      <h1 className="text-4xl">{title}</h1>
                    </div>
                  </Link>
                </div>
              );
            })}
      </div>
      {serverError && <h1 className="background text-4xl w-full text-center">Ruh Roh Server took a dump...</h1>}
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Outline App</title>;
