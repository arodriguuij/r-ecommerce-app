import React, { useState, useEffect } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "../components/moviesTable";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const pageSize = 4;

  useEffect(() => {
    setMovies(getMovies());
    setGenres([{ _id: "", name: "All Genres" }, ...getGenres()]);
  }, []);

  const handleDelete = (movie) => {
    const updatedMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(updatedMovies);
  };

  const handleLike = (movie) => {
    const updatedMovies = [...movies];
    const index = updatedMovies.indexOf(movie);
    updatedMovies[index] = { ...updatedMovies[index] };
    updatedMovies[index].liked = !updatedMovies[index].liked;
    setMovies(updatedMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreChange = (genre) => {
    setCurrentGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  if (movies.length === 0) return <p>There are no movies in the database.</p>;

  const getPagedData = () => {
    const filtered = currentGenre
      ? movies.filter(
          (movie) =>
            movie.genre.name === currentGenre || currentGenre === "All Genres"
        )
      : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const moviesToShow = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: moviesToShow };
  };

  const { totalCount, data } = getPagedData();

  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          genres={genres}
          currentGenre={currentGenre}
          onGenreChange={handleGenreChange}
        />
      </div>
      <div className="col">
        <p>Showing {totalCount} movies in the database.</p>
        <MoviesTable
          moviesToShow={data}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Movies;
