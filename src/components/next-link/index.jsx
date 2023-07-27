import React from "react";
import Link from "next/link";

import { linkStyles } from "./styles";

const NextLink = ({ children, href, ...rest }) => {
  return (
    <Link href={href} style={linkStyles} {...rest}>
      {children}
    </Link>
  );
};

export default NextLink;
