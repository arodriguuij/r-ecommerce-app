import React from "react";
import Like from "./common/like";
import Table from "../components/common/table";

const columns = [
  { path: "title", label: "Title" },
  { path: "genre.name", label: "Genre" },
  { path: "numberInStock", label: "Stock" },
  { path: "dailyRentalRate", label: "Rate" },
  {
    content: (item, onLike) => (
      <Like liked={item.liked} onClick={() => onLike(item)} />
    ),
  },
  {
    content: (item, onDelete) => (
      <button onClick={() => onDelete(item)} className="btn btn-danger btn-sm">
        Delete
      </button>
    ),
  },
];

const MoviesTable = ({
  moviesToShow,
  onLike,
  onDelete,
  onSort,
  sortColumn,
}) => {
  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      onLike={onLike}
      onDelete={onDelete}
      data={moviesToShow}
    />
  );
};

export default MoviesTable;
