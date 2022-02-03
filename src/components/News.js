import React, { useEffect, useState } from "react";
import Header from "./Common/Header";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const News = ({ toggleNews }) => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments");
    const news = await response.json();

    setTableData(news.slice(0, 50));
    setFilteredData(news.slice(0, 50));
  };

  const handleChangeSearch = ({ target: { value } }) => setSearchValue(value);

  const handleSearch = () =>
    setFilteredData(
      searchValue
        ? filteredData.filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
        : tableData
    );

  return (
    <section className="news window">
      <Header
        title="News"
        search={
          <div className="search">
            <input
              className="p-2"
              type="text"
              placeholder="Search by title"
              name="searchValue"
              value={searchValue}
              onChange={handleChangeSearch}
              onKeyDown={({ key }) => (key === "Enter" ? handleSearch() : null)}
            />
            <FontAwesomeIcon
              className="pointer"
              size="lg"
              icon={faSearch}
              color="#d98324"
              onClick={handleSearch}
            />
          </div>
        }
        onClose={toggleNews}
      />
      <div className="news-body">
        {filteredData.map((news) => (
          <div className="p-4 m-4">
            <span className="title">{news.name}</span>
            <p className="content">{news.body}</p>
            <p className="email">{news.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
