import React from "react";
import Link from "next/link";
import { PER_PAGE } from "@config/index";

const Pagination = ({ pageCount, totalPage }) => {
  const lastPage = Math.ceil(totalPage / PER_PAGE);

  return (
    <>
      {/* previous page */}
      {pageCount > 1 && (
        <Link href={`/events?page=${pageCount - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {/* next page */}
      {pageCount < lastPage && (
        <Link href={`/events?page=${pageCount + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}






    </>
  );
};

export default Pagination;
