import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./App.css";
import { useCardContext } from "./context/CardContext";

function App() {
  const {
    cardsData,
    setCardsData,
    loading,
    setLoading,
    deleteCard,
    totalPages,
    pages,
  } = useCardContext();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const currentCardsData = cardsData.slice(currentPage - 1, currentPage + 5);

  return (
    <>
      <div className="container">
        {loading && (
          <div className="text-center">
            <h6>Loading...</h6>
          </div>
        )}
      </div>
      {!loading && (
        <>
          <div className="row m-3 gap-3 justify-content-center">
            {currentCardsData.map((card) => (
              <div className="col-md-3" key={card.id}>
                <Card key={card.id} cardData={card} deleteCard={deleteCard} />
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-secondary m-2 rounded-5 border"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>
            {pages.map((card, i) => (
              <button
                key={i}
                className={`btn btn-outline-secondary m-2 rounded-5 ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {card}
              </button>
            ))}
            <button
              className="btn btn-outline-secondary m-2 rounded-5"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pages.length}
            >
              {">>"}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
