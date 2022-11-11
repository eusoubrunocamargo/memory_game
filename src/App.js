import React from 'react';
import './App.css';
import { useState, useRef } from 'react';

function App() {

  const cards = [
    {
      id: 1,
      color: 'red',
      state: false
    },
    {
      id: 2,
      color: 'red',
      state: false
    },
    {
      id: 3,
      color: 'blue',
      state: false
    },
    {
      id: 4,
      color: 'yellow',
      state: false
    },
    {
      id: 5,
      color: 'blue',
      state: false
    },
    {
      id: 6,
      color: 'purple',
      state: false
    }
  ];

  const [cardState, setCardState] = useState([...cards]);
  const [matchArray, setMatchArray] = useState([]);

  const initialCards = useRef([...cards]);

  const resetGame = () => {
    const zero = initialCards.current.map(item => {
      return {
        id: item.id,
        color: item.color,
        state: false
      }
    });
    return setCardState(zero);
  }

  const revealCard = (card) => {

    //criando referências locais
    const localCards = [...cardState];
    let localMatchArray = [...matchArray];

    //selecionando a carta
    const firstCard = localCards.find(item => item.id === card.id);

    //alternando o state - true ou false
    firstCard.state = !firstCard.state;

    //colocando as cartas selecionadas no array local da partida
    localMatchArray.push(firstCard);

    //o array da partida só comporta duas cartas, bloqueando o restante
    if (localMatchArray.length > 2) {
      return;
    }

    //executa ao virar a segunda carta
    if (localMatchArray.length === 2) {

      const cardOne = localMatchArray[0];
      const cardTwo = localMatchArray[1];

      //evitando selecionar a mesma carta consecutivamente
      if (cardOne.id === cardTwo.id) {
        return;
      }

      if (localMatchArray[0].color === localMatchArray[1].color) {
        //console.log('Match!');
        //console.log(cardOne, cardTwo);
        //em caso de match, remover as duas cartas do localcards
        const cardOneIndex = localCards.findIndex(item => item.id === cardOne.id);
        localCards.splice(cardOneIndex, 1);
        const cardTwoIndex = localCards.findIndex(item => item.id === cardTwo.id);
        localCards.splice(cardTwoIndex, 1);
      } else {
        setTimeout(() => {
          cardOne.state = false;
          cardTwo.state = false;
        }, 500);
      }

      //limpando o array da partida
      localMatchArray = [];
    }

    //atualizando os estados do matchArray e da carta
    setMatchArray(localMatchArray);
    setTimeout(() => {
      setCardState(localCards);
    }, 1000);

    // console.log(localMatchArray);
    // console.log(localCards);
  }

  return (
    <div className="container">

      <div className='left_side'>
        <h1>LOGO</h1>
        <div className='btn-reset'>
          <button onClick={() => resetGame()}>Reset</button>
        </div>
      </div>

      <div className='right_side'>

        {cardState.map((card) =>

          <div
            key={card.id}
            className={`card_style ${card.state ? card.color : ""}`}
            onClick={() => revealCard(card)}
          ></div>

        )}

      </div>

    </div >
  );
}

export default App;
