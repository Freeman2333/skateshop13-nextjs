export const cardStyle = {
  position: "relative",
  "&:hover .MuiCardMedia-root": {
    transform: "scale(1.05)",
  },
};

export const cardMediaStyle = {
  overflow: "hidden",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.15)",
  },
  height: 200,
  "@media (min-width:600px)": {
    height: 300,
  },
  "@media (min-width:960px)": {
    height: 400,
  },
  "&:after": {
    content: '" "',
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

export const cardContentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  padding: "16px",
};

export const linkStyles = {
  textDecoration: "none",
};
