export const layoutContainer = {
  display: "grid",
  height: "100vh",
  gridTemplateColumns: "1fr",
  overflow: "hidden",
  "@media (min-width: 768px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  "@media (min-width: 1280px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
};

export const layoutContainerLeft = {
  position: "relative",
  gridColumn: "1 / 2",
};

export const layoutContainerLeftBg = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: "9",
  background: "white",
  opacity: "0.5",
};

export const siteLogo = {
  position: "absolute",
  top: "1rem",
  left: "1rem",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  zIndex: 99,
  color: "black",
};

export const siteLogoStack = {
  display: "flex",
  flexDirection: "row",
  gap: "9px",
  "& svg": {
    display: "block",
    width: 30,
    height: 30,
  },
};

export const layoutContainerRight = {
  position: "relative",
  zIndex: 1,
  gridColumn: "1 / 2",
  "@media (min-width: 768px)": {
    gridColumn: "2 / 4",
  },
  "@media (min-width: 1280px)": {
    gridColumn: "2 / 3",
  },
  display: "flex",
  padding: "30px",
};
