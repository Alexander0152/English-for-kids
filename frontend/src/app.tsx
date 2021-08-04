import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import './styles.css';
import { CardsField } from './components/cardsField/cardsField';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Provider } from 'react-redux';
import { store } from './businessLayer/store';
import EntityCard from './businessLayer/entityCard';
import { HashRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import { AdminCategoryField } from './components/adminCategoryField/adminCategoryField';
import { AdminWordsField } from './components/adminWordsField/adminWordsField';
import { serverPath } from './businessLayer/gameConfig';
import { RulesModal } from './components/rulesModal/rulesModal';

const App = () => {
  const getAllCards = () => {
    const cards: EntityCard[] = [];
    useEffect(() => {
      fetch(`${serverPath}/cards?category=all`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res: Response) =>
        res.json().then((value: { cards: { cards: EntityCard[] }[] }) => {
          for (let i = 1; i < value.cards.length; i++) {
            const categoryCards: EntityCard[] = value.cards[i].cards;

            for (let j = 0; j < categoryCards.length; j++) {
              cards.push(categoryCards[j]);
            }
          }
          saveCardsToLocalStorage(cards);
          return value;
        }),
      );
    }, []);
  };

  const saveCardsToLocalStorage = (cards: EntityCard[]): void => {
    const retrievedCards = localStorage.getItem('cards');

    if (retrievedCards !== null) {
      return;
    }
    localStorage.setItem('cards', JSON.stringify(cards));
  };

  getAllCards();

  return (
    <Router>
      <div>
        <Provider store={store}>
          <RulesModal />
          <Header />
          <CardsField category={'category'} />
          <Footer />
          <Route
            exact
            path="/AdminPageCategories"
            render={() => <AdminCategoryField category={'category'} />}
          />
          <Route
            exact
            path="/AdminPageCategories/AdminPageWords"
            render={() => <AdminWordsField />}
          />
        </Provider>
      </div>
    </Router>
  );
};

ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
