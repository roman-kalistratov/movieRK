import React, { useState, useEffect } from "react";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useTheme } from "@mui/material";

const ScrollToTop = () => {
     const theme = useTheme();
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setIsShow(true);
            } else {
                setIsShow(false);
            }
        });
    }, []);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    return (
        <>
            {isShow && (
                <ArrowCircleUpIcon
                    sx={{
                        display:{xs:"none", md:"fixed"},
                        position: "fixed",
                        bottom: "1rem",
                        right: "2rem",
                        zIndex: "2",
                        cursor:"pointer",
                        color:`${theme.palette.primary.main}`
                    }}
                    fontSize="large"
                    className="scroll-up"
                    onClick={scrollTop}
                />
            )}
        </>
    )
}

export default ScrollToTop