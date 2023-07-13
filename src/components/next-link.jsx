import React from "react";
import Link from "next/link";

const NextLink = ({ children, href, ...rest }) => {
  return (
    <Link
      href={href}
      {...rest}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {children}
    </Link>
  );
};

export default NextLink;
