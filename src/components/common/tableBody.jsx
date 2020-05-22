import React from "react";
import _ from "lodash";

const TableBody = ({ data, onLike, onDelete, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item, onLike, onDelete);
    else return _.get(item, column.path);
  };
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column, index) => (
            <td key={index.toString()}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
