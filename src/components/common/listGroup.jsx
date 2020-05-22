import React from "react";

const ListGroup = ({
  currentGenre,
  onGenreChange,
  genres,
  textProperty = "name",
  valueProperty = "_id",
}) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[valueProperty]}
          className={`list-group-item ${
            currentGenre === genre[textProperty] && "active"
          }`}
          onClick={() => onGenreChange(genre[textProperty])}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
