import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./App.css";

function App() {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchCArds() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (response.status >= 200 && response.status < 300) {
        setCardsData(response.data);
        console.log("Cards data fetched successfully:", response.data);
      }
    } catch (error) {
      console.error("Error fetching cards data:", error);
    }
  }
  const deleteCard = (id) => {
    setCardsData(cardsData.filter((card) => card.id !== id));
  };
  useEffect(() => {
    fetchCArds();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  const totalePages = cardsData.length / 6;
  const pages = Array.from({ length: Math.ceil(totalePages) }, (_, i) => i + 1);
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
