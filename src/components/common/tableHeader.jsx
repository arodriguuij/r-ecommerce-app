import React from "react";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    const updatedSortColumn = { ...sortColumn };
    if (updatedSortColumn.path === path) {
      updatedSortColumn.order =
        updatedSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      updatedSortColumn.path = path;
      updatedSortColumn.order = "asc";
    }
    onSort(updatedSortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th
            className="clickable"
            key={index.toString()}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
