import { useEffect } from 'react';
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setListFavorites, setUser } from "../../redux/features/userSlice";
import { toast } from "react-toastify";

import Sidebar from '../common/Sidebar';
import GlobalLoading from "../common/GlobalLoading";
import ScrollToTop from '../common/ScrollToTop';
import AuthModal from "../common/AuthModal";
import Footer from "../common/Footer";

import uiConfigs from '../../configs/ui.configs';
import userApi from "../../api/modules/user.api";
import favoriteApi from "../../api/modules/favorite.api";

const sidebarWith = uiConfigs.size.sidebarWith;

const MainLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList();

      if (response) dispatch(setListFavorites(response));
      if (err) toast.error(err.message);
    };

    if (user) getFavorites();
    if (!user) dispatch(setListFavorites([]));
  }, [user, dispatch]);


  return (
    <>
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}

      <ScrollToTop/>

      {/* login modal */}
      <AuthModal />
      {/* login modal */}

      <Sidebar />

      <Box
        component="main"       
        sx={{         
          width: "100%",
          paddingLeft: { xs: '0', md: sidebarWith },
          marginLeft: "auto",
        }} >
        <Outlet />

        {/* footer */}
        <Footer />
        {/* footer */}
      </Box>


    </>

  )
}

export default MainLayout