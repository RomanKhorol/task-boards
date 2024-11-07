import { FC, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
const Layout: FC = () => {
  return (
    <Box>
      <header>
        <Header />
      </header>
      <main>
        <Suspense fallback={<div>Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
export default Layout;
