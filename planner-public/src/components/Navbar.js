import React from "react";
import { Link } from "gatsby";
import { useTheme } from "../context/ThemeContext";
import { useRowData } from "../context/RowDataContext";

// const links = [
//   { name: "Projects", path: "/projects" },
// ];

const Navbar = ({ pageName }) => {
  const { toggleTheme } = useTheme();

  return (
    <div className="relative h-16 w-full bg-[var(--primary-color)] flex items-center justify-center">
      <Link to="/" className="relatives">
        <span className="h-auto top-[16px] left-0 text-2xl font-semibold text-[var(--primary-text)] px-16">Outlines</span>
      </Link>
      {/* <div className="w-full bg-white h-full flex items-center">
      </div> */}
      <h1 className="text-4xl text-white bg-transparent w-full">{pageName}</h1>
      {/* <button className="px-4 py-2 rounded bg-[var(--accent-color)] text-[var(--accent-text)]" onClick={toggleTheme}>
        Toggle Theme
      </button> */}
    </div>
  );
};

const DynamicNavbar = ({ pageName }) => {
  const { toggleTheme } = useTheme();
  const { setTitle, title } = useRowData();

  return (
    <div className="relative h-16 w-full bg-[var(--primary-color)] flex items-center justify-center">
      <Link to="/" className="relatives">
        <span className="h-auto top-[16px] left-0 text-2xl font-semibold text-[var(--primary-text)] px-16">Outlines</span>
      </Link>
      <input onChange={(e) => setTitle(e.target.value)} className="text-4xl text-white bg-transparent w-full mr-16" value={title || ""}></input>
    </div>
  );
};

export default Navbar;
export { DynamicNavbar };
