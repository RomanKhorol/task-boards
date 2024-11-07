import { Box, Typography } from "@mui/material";
import { FC } from "react";

const Header: FC = () => {
  return (
    <Box sx={{ maxHeight: "100%" }}>
      <header>
        <Typography sx={{ fontSize: "40px" }}>Testing Tasks Board</Typography>{" "}
      </header>
    </Box>
  );
};
export default Header;
