import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react/cjs/react.development";
import Header from "./Common/Header";

const Browser = ({ toggleBrowser }) => {
  const [search, setSearch] = useState("");
  const [website, setWebsite] = useState("");

  const handleChangeSearch = ({ target: { value } }) => setSearch(value);

  const handleSearch = () => setWebsite(search.includes("https://") ? search : `https://${search}`);

  return (
    <section className="browser window">
      <Header
        title="Web Browser"
        onClose={toggleBrowser}
        search={
          <div className="search">
            <input
              className="p-2"
              type="text"
              placeholder="Search website"
              name="search"
              value={search}
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
      />
      <iframe src={website}></iframe>
    </section>
  );
};

export default Browser;
