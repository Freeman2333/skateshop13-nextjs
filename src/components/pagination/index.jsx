"use client";
import { useState } from "react";
import { Pagination as MUIPagination } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { createQueryString } from "@/utils";
import { paginationStyle } from "./styles";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [page, setPage] = useState(searchParams?.get("page") ?? "1");

  return (
    <MUIPagination
      count={count}
      variant="outlined"
      shape="rounded"
      page={+page}
      onChange={(_, page) => {
        setPage(page);
        router.push(`${pathname}?${createQueryString(searchParams, { page })}`);
      }}
      sx={paginationStyle}
    />
  );
};

export default Pagination;
