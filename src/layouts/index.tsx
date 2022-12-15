import { Box } from "@mui/system";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const MainLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const handleCollapse = (value: boolean) => {
    setCollapse(value);
  };
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: `${collapse ? "60px" : "210px"} 1fr`,
        gridTemplateAreas: `"sidebar main" "sidebar main"`,
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "transparent",
      }}
    >
      <Box sx={{ gridArea: "sidebar" }}>
        <Sidebar onCollapse={handleCollapse} />
      </Box>
      <Box
        sx={{
          gridArea: "main",
          padding: 0,
          margin: 0,
          backgroundColor: "#F9F8FD",
          width: `calc(100vw - ${collapse ? "60px" : "210px"})`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
