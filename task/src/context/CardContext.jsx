import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  use,
} from "react";
import axios from "axios";
const CardContext = createContext();
export const useCardContext = () => useContext(CardContext);
export const CardProvider = ({ children }) => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCArds = async () => {
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
  };
  const deleteCard = (id) => {
    setCardsData(cardsData.filter((card) => card.id !== id));
  };
  useEffect(() => {
    fetchCArds();
  }, []);
  const totalPages = Math.ceil(cardsData.length / 6);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <CardContext.Provider
      value={{
        cardsData,
        setCardsData,
        loading,
        setLoading,
        deleteCard,
        totalPages,
        pages,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
