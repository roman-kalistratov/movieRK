import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";
import { setQuery } from "../../redux/features/searchQuerySlice";

const PageWrapper = ({ state, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(state));

    state !== "search" && dispatch(setQuery(""));
  }, [state, dispatch]);

  return (
    children
  );
};

export default PageWrapper;