import React from "react";
import ReactDOM from "react-dom";

const PortalOverlay = ({ children, isRendering }) => {
  // Use a ref to ensure the same div is used for the portal container
  const elRef = typeof document !== "undefined" ? React.useRef(document.createElement("div")) : null;

  React.useEffect(() => {
    const portalRoot = document.getElementById("portal-root");
    if (!portalRoot) return;
    portalRoot.appendChild(elRef.current);

    // Cleanup function to remove the appended child
    return () => {
      portalRoot.removeChild(elRef.current);
    };
  }, []);

  return (
    isRendering &&
    ReactDOM.createPortal(
      <div className="overlay top-0 relative z-[9999] bg-[rgba(247,247,247,0.3)]" style={{ position: "fixed", width: "100vw", height: "100vh" }}>
        {children}
      </div>,
      elRef.current
    )
  );
};

export default PortalOverlay;
