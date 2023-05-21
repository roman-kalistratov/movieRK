const uiConfigs = {
  style: {
    gradientBgImage: {
      dark: {
        backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
      },
      light: {
        backgroundImage: "linear-gradient(to top, rgba(245,245,245,1), rgba(0,0,0,0))"
      }
    },
    horizontalGradientBgImage: {
      dark: {
        backgroundImage: "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))"
      },
      light: {
        backgroundImage: "linear-gradient(to right, rgba(245,245,245,1), rgba(0,0,0,0))"
      }
    },
    mainContent: {     
      margin: "auto",
      padding: 2
    },
    typoLines: (lines, textAlign) => ({
      textAlign: textAlign || "justify",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: lines,
    }),    
    backgroundImage: (imgPath) => ({
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "darkgrey",
      backgroundImage: `url("${imgPath}")`
    })
  },
  size: {
    sidebarWith: "200px",
  }
};

export default uiConfigs;