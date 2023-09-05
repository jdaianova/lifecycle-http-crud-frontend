import './App.css';
import Form from './components/Form/Form';
import Cards from './components/Cards/Cards';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';

function App() {

  const [cards, setCards] = useState([]);

  const getAllCards = useEffect(
    () => {
      axios.get('http://localhost:7070/notes')
        .then(responce => {
          setCards(responce.data);
        })
    }
  );

  const handleSubmit = (currentText) => {
    axios.post('http://localhost:7070/notes', {
      "id": 0,
      "content": currentText
    })
      .then(getAllCards)
  };

  const onDeleteCard = (idDeletedCard) => {
    axios.delete('http://localhost:7070/notes/' + idDeletedCard)
      .then(getAllCards)
  }

  return (
    <div className="App">
      <Header updateCards={getAllCards} />
      <Cards cards={cards} onDeleteCard={onDeleteCard} />
      <Form handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
