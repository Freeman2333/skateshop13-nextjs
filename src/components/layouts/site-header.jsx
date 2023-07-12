import React from "react";

import { siteConfig } from "@/config/site";
import MainNav from "./main-nav";

const SiteHeader = () => {
  return (
    <>
      <MainNav items={siteConfig.mainNav} />
    </>
  );
};

export default SiteHeader;
