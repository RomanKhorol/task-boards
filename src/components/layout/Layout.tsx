import { FC, Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const Layout: FC = () => {
  return (
    <div>
      <Header />
      <NavLink></NavLink>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};
export default Layout;
