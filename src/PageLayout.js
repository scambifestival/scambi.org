import { Outlet } from "react-router-dom";
import Navbar from "./global/Navbar";

export const PageLayout = () => {
    return (
      <>
        <Navbar/>
        <Outlet/>
        {/*<Footer/>*/}
      </>  
    );
};