import React, { FunctionComponent, useEffect } from 'react';
import './statistic.css';
import EntityCard from '../../businessLayer/entityCard';

export const Statistic: FunctionComponent = () => {
  const [cards, setCards] = React.useState<EntityCard[]>([]);

  const retrieveCardsFromLocalStorage = (): void => {
    useEffect(() => {
      const retrievedCards = localStorage.getItem('cards');
      if (retrievedCards !== null) {
        const statisticCards: EntityCard[] = JSON.parse(retrievedCards);

        statisticCards.map((el) => {
          if (el.trainCount === undefined) {
            el.trainCount = 0;
          }
          if (el.gameCount === undefined) {
            el.gameCount = 0;
          }
          if (el.mistakesCount === undefined) {
            el.mistakesCount = 0;
          }
          if (el.percent === undefined) {
            el.percent = 0;
          }
        });
        setCards(statisticCards);
      }
    }, []);
  };

  const sortByCategory = (): void => {
    const newCards = [...cards];
    newCards.sort((a, b) => a.category.localeCompare(b.category));

    if (newCards[0].category === cards[0].category) {
      newCards.sort((b, a) => a.category.localeCompare(b.category));
      setCards(newCards);
    }
    setCards(newCards);
  };

  const sortByWords = (): void => {
    const newCards = [...cards];
    newCards.sort((a, b) => a.name.localeCompare(b.name));
    setCards(newCards);

    if (newCards[0].name === cards[0].name) {
      newCards.sort((b, a) => a.name.localeCompare(b.name));
      setCards(newCards);
    }
    setCards(newCards);
  };

  const sortByTranslation = (): void => {
    const newCards = [...cards];
    newCards.sort((a, b) => a.translate.localeCompare(b.translate));
    setCards(newCards);

    if (newCards[0].translate === cards[0].translate) {
      newCards.sort((b, a) => a.translate.localeCompare(b.translate));
      setCards(newCards);
    }
    setCards(newCards);
  };

  const sortByTrain = (): void => {
    const newCards = [...cards];
    newCards.sort((a, b) => {
      return a.trainCount - b.trainCount;
    });

    if (newCards[0].trainCount === cards[0].trainCount) {
      newCards.sort((b, a) => {
        return a.trainCount - b.trainCount;
      });
    }
    setCards(newCards);
  };

  const sortByGame = (): void => {
    const newCards = [...cards];
    newCards.sort((a, b) => {
      return a.gameCount - b.gameCount;
    });

    if (newCards[0].gameCount === cards[0].gameCount) {
      newCards.sort((b, a) => {
        return a.gameCount - b.gameCount;
      });
    }
    setCards(newCards);
  };

  const sortByMistakes = (): void => {
    const newCards = [...cards];
    newCards.sort((a, b) => {
      return a.mistakesCount - b.mistakesCount;
    });

    if (newCards[0].mistakesCount === cards[0].mistakesCount) {
      newCards.sort((b, a) => {
        return a.mistakesCount - b.mistakesCount;
      });
    }
    setCards(newCards);
  };

  const sortByPercent = (): void => {
    const newCards = [...cards];
    newCards.sort((a, b) => {
      return a.percent - b.percent;
    });

    if (newCards[0].percent === cards[0].percent) {
      newCards.sort((b, a) => {
        return a.percent - b.percent;
      });
    }
    setCards(newCards);
  };

  const reset = (): void => {
    const newCards = [...cards];

    newCards.map((card) => {
      card.trainCount = 0;
      card.gameCount = 0;
      card.mistakesCount = 0;
      card.percent = 0;
    });
    localStorage.setItem('cards', JSON.stringify(newCards));
    setCards(newCards);
  };

  retrieveCardsFromLocalStorage();

  return (
    <div>
      <button className="btn_reset" onClick={() => reset()}>
        Reset
      </button>
      <table>
        <tbody>
          <tr>
            <th>
              <button className="btn_wins" onClick={() => sortByCategory()}>
                Category
              </button>
            </th>
            <th>
              <button className="btn_wins" onClick={() => sortByWords()}>
                Word
              </button>
            </th>
            <th>
              <button className="btn_wins" onClick={() => sortByTranslation()}>
                Translation
              </button>
            </th>
            <th>
              <button className="btn_wins" onClick={() => sortByTrain()}>
                Train
              </button>
            </th>
            <th>
              <button className="btn_wins" onClick={() => sortByGame()}>
                Game
              </button>
            </th>
            <th>
              <button className="btn_wins" onClick={() => sortByMistakes()}>
                Mistakes
              </button>
            </th>
            <th>
              {' '}
              <button className="btn_wins" onClick={() => sortByPercent()}>
                %
              </button>
            </th>
          </tr>
          {cards.map((card) => {
            return (
              <tr key="">
                <td>{card.category}</td>
                <td>{card.name}</td>
                <td>{card.translate}</td>
                <td>{card.trainCount}</td>
                <td>{card.gameCount}</td>
                <td>{card.mistakesCount}</td>
                <td>{card.percent}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
