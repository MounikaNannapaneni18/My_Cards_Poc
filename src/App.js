import React, {useState} from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Cards from './components/Cards'
import AddDeleteButtons from './components/AddDeleteButtons';
import CardNavigation from './components/CardNavigation';
import './App.css';

const App = () =>  {
  const [cards, setCards] = useState([
    { id: 1, heading: "Add heading 1", subHeading: "Add Sub heading", content: "this is your content 1" },
    { id: 2, heading: "Add heading 2", subHeading: "Add Sub heading", content: "this is your content 2" },
    { id: 3, heading: "Add heading 3", subHeading: "Add Sub heading", content: "this is your content 3" },
  ]); 
  const [activeCard, setActiveCard] = useState(2);
  const cardsPerPage = 3;

  const handleCreateCard = () => {
    const newCard = {
      id: cards.length + 1,
      heading: "Add heading " + (cards.length + 1),
      subHeading: "Add Sub heading " + (cards.length + 1),
      para: "this is your content" + + (cards.length + 1),
    };
    setCards([...cards, newCard]);
    handleCardChange(1)
  };

  const handleDeleteCard = () => {
    const filteredCards = cards.filter((card) => card.id !== activeCard);
    setCards(filteredCards);

    if(filteredCards.length > 0) {
      handleCardChange(-1)
    } else {
      setActiveCard(null)
    }
  };

  const handleCardChange = (step) => {
    const activeCardIndex = cards.findIndex((card) => card.id === activeCard);
    if (activeCardIndex !== -1) {
      const nextCardIndex = activeCardIndex + step;
      if (nextCardIndex >= 0 && nextCardIndex < cards.length) {
        setActiveCard(cards[nextCardIndex].id);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    const firstCardIndex = (pageNumber - 1) * cardsPerPage;
    if (firstCardIndex < cards.length) {
      setActiveCard(cards[firstCardIndex].id);
    }
  };

  return (
    <div className="App">
      <AddDeleteButtons
        handleCreateCard={handleCreateCard}
        handleDeleteCard={handleDeleteCard}
      />
      <div className='cardContainer'>
        <button className="arrow-left" onClick={() => handleCardChange(-1)}>
          <ArrowBackIosIcon />
        </button>
        {cards?.map((card) => (
          <Cards
            key={card.id}
            card={card}
            isActive={card.id === activeCard}
          />
        ))}
        <button onClick={() => handleCardChange(1)}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      <div className='paginationContainer'>
        <CardNavigation
          cardsPerPage={cardsPerPage}
          count={cards.length}
          activeCard={activeCard}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
