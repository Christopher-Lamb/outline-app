import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Drop from "../../components/Drop";
import RowItem from "../../components/RowItem";
import { DynamicNavbar } from "../../components/Navbar";
import { RowDataProvider, useRowData } from "../../context/RowDataContext";
import { getDataFromStore } from "../../utils/indexedDB";
import { reorderItemsInDifferentLists, reorderItemsInSameList } from "../../utils/orderingFunctions";
// import JSON from "./inital-state";
import axios from "axios";
// import { useParams } from "gatsby";
//Items will be structured in rows
// Each row will be draggable and droppable
// Row will take a row id and render items with their ids as children this will happen recursively

//Get the Provider in there. I want this to happen specifically around each individual page
// Probably could wrap the entire app in it though not sure which is better but this makes the most sense from a though perspective
const PageWrapper = () => {
  return (
    <>
      <RowDataProvider>
        <OutlinePage />
      </RowDataProvider>
    </>
  );
};

const OutlinePage = () => {
  const { setObj, setIsDragging, rowData, setId, setTitle } = useRowData();
  const [state, setState] = useState({ title: "", _id: "" });

  let pathNames = window.location.pathname.split("/").filter((item) => item !== "");
  const pageName = pathNames.length > 0 ? pathNames[pathNames.length - 1] : undefined; // or some default value

  useEffect(() => {
    //This will be a fetch to the server at some point right now everythin is stored in the front end and possibly local storage

    // const id = getRow("main");
    axios
      .get("http://localhost:3240/api/outline", { params: { name: pageName } })
      .then(({ data }) => {
        setObj(JSON.parse(data.data));
        setTitle(JSON.parse(data.data).main.content);
        setState({ title: pageName.replaceAll("-", " "), _id: "" });
      })
      .catch((error) => {
        getDataFromStore(pageName)
          .then((data) => {
            console.log("Retrieved data:", data);
            setObj(data.data);
            setState({ title: data.title, _id: data._id });
            setId(data._id);
            setTitle(data.title);
          })
          .catch((error) => console.error("Error retrieving data:", error));
        console.error("Error:", error);
      });
  }, []);

  const onDragEnd = (result) => {
    setIsDragging(false);
    const { destination, source, draggableId } = result;

    if (!destination) {
      // If there's no destination (dragged outside of any droppable)
      // you might want to handle this case.
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      // If the item is dropped in the same place it was dragged from
      return;
    }
    if (destination.droppableId === draggableId) return;
    if (destination.droppableId === source.droppableId) {
      let obj = reorderItemsInSameList(rowData, source, destination);
      setObj(obj);
    }
    if (destination.droppableId !== source.droppableId) {
      let obj = reorderItemsInDifferentLists(rowData, source, destination, draggableId);
      setObj(obj);
    }
  };

  const onDragStart = () => {
    setIsDragging(true);
  };
  return (
    <main className="pb-[400px]">
      <DynamicNavbar pageName={state.title} />
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className="container mx-auto xl:max-w-7xl">
          <Drop droppableId={"main"} className="flex flex-col gap-5">
            {rowData["main"] &&
              rowData["main"].rowIds.map((rowId, i) => {
                return (
                  <RowItem rowId={rowId} index={i} key={rowId}>
                    <div className="text-2xl bg-blue-500 h-[6rem] w-full p-4 text-gray-200 font-semibold">{rowId}</div>
                  </RowItem>
                );
              })}
          </Drop>
        </div>
      </DragDropContext>
    </main>
  );
};

export default PageWrapper;
export const Head = () => {
  return (
    <>
      <title>Outline App</title>
    </>
  );
};
