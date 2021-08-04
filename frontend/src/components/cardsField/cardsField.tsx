import React, { FunctionComponent, useEffect } from 'react';
import './cardsField.css';
import { Card } from '../card/card';
import EntityCard from '../../businessLayer/entityCard';
import { gameMods, serverPath } from '../../businessLayer/gameConfig';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Link, useHistory, useLocation } from 'react-router-dom';
import { changeGameMode } from '../../businessLayer/actions/gameActions';
import { FinishModal } from '../finishModal/finishModal';
import { Statistic } from '../statistic/statistic';
import { RootReducerState } from '../../businessLayer/reducers/rootReducer';

type CardsFieldProps = {
  category: string;
};

let gameSessionCards: EntityCard[] = [];

export const CardsField: FunctionComponent<CardsFieldProps> = ({ category }) => {
  const gameMode = useSelector<RootReducerState, RootReducerState['gameMode']['mode']>(
    (state) => state.gameMode.mode,
  );
  const dispatch = useDispatch();

  const [answers, setAnswers] = React.useState<boolean[]>([]);

  const [displayCards, setCards] = React.useState<EntityCard[]>([]);
  const [isActiveCards, setIsActiveCards] = React.useState<boolean[]>([]);
  const [isShowModal, setIsShowModal] = React.useState<boolean>(false);
  const history = useHistory();
  const loc = useLocation();

  const getCards = (): void => {
    const cards: EntityCard[] = [];
    const activeCards: boolean[] = [];

    useEffect(() => {
      fetch(`${serverPath}/cards?category=${category}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res: Response) =>
        res.json().then((value: { cards: EntityCard[] }) => {
          for (let i = 0; i < value.cards.length; i++) {
            cards.push(value.cards[i]);
            activeCards.push(true);
          }
          setCards(cards);
          setIsActiveCards(activeCards);
        }),
      );
    }, [loc]);
  };

  const checkAnswer = (name: string, index: number): void => {
    if (gameMode !== gameMods.GAME) {
      return;
    }
    const rightAnswer = gameSessionCards[0].name;
    const newAnswers: boolean[] = [...answers];

    let newActive = true;
    name === rightAnswer
      ? (newAnswers.push(true), (newActive = false), countStatisticGame(name))
      : (newAnswers.push(false), countStatisticMistakes(rightAnswer));
    setAnswers(newAnswers);
    countStatisticPercent(name);
    const newIsActiveCards: boolean[] = [...isActiveCards];

    newIsActiveCards[index] = newActive;
    setIsActiveCards(newIsActiveCards);
  };

  const countStatisticGame = (name: string): void => {
    const retrievedCards = localStorage.getItem('cards');
    if (retrievedCards !== null) {
      const statisticCards = JSON.parse(retrievedCards);
      statisticCards.forEach((el: EntityCard) => {
        if (el.name === name) {
          el.gameCount === undefined ? (el.gameCount = 1) : el.gameCount++;
          localStorage.setItem('cards', JSON.stringify(statisticCards));
          return;
        }
      });
    }
  };

  const countStatisticMistakes = (name: string): void => {
    const retrievedCards = localStorage.getItem('cards');
    if (retrievedCards !== null) {
      const statisticCards = JSON.parse(retrievedCards);
      statisticCards.forEach((el: EntityCard) => {
        if (el.name === name) {
          el.mistakesCount === undefined ? (el.mistakesCount = 1) : el.mistakesCount++;
          localStorage.setItem('cards', JSON.stringify(statisticCards));
          return;
        }
      });
    }
  };

  const countStatisticPercent = (name: string): void => {
    const retrievedCards = localStorage.getItem('cards');
    if (retrievedCards !== null) {
      const statisticCards = JSON.parse(retrievedCards);
      statisticCards.forEach((el: EntityCard) => {
        if (el.name === name) {
          let gameCount: number;
          let mistakesCount: number;
          el.gameCount === undefined ? (gameCount = 0) : (gameCount = el.gameCount);
          el.mistakesCount === undefined ? (mistakesCount = 0) : (mistakesCount = el.mistakesCount);

          const percent: number = Math.round((gameCount / (gameCount + mistakesCount)) * 100);
          el.percent = percent;
          localStorage.setItem('cards', JSON.stringify(statisticCards));
          return;
        }
      });
    }
  };
  const changeGameModeToGame = (): void => {
    dispatch(changeGameMode(gameMods.GAME));
  };

  const startGame = (): void => {
    gameSessionCards = displayCards.slice();
    gameSessionCards.sort(() => Math.random() - 0.5);

    setTimeout(() => {
      const audioCard = new Audio(gameSessionCards[0].audioPath);
      audioCard.play();
    }, 300);
  };

  const onAnswersChange = (): void => {
    useEffect(() => {
      if (gameMode !== gameMods.GAME) {
        return;
      }
      if (answers[answers.length - 1] === false) {
        const errorAudio = new Audio(`${serverPath}/audio/error.mp3`);
        errorAudio.play();
        return;
      }

      const correctAudio = new Audio(`${serverPath}/audio/correct.mp3`);
      correctAudio.play();
      gameSessionCards.shift();

      if (isFinish()) {
        onGameFinish();
        return;
      }
      setTimeout(() => {
        const audioCard = new Audio(gameSessionCards[0].audioPath);
        audioCard.play();
      }, 300);
    }, [answers]);
  };

  const onGameFinish = (): void => {
    setIsShowModal(true);
    const mistakes: number = countMistakes();
    setTimeout(() => {
      let finishAudio: HTMLAudioElement;
      mistakes === 0
        ? (finishAudio = new Audio(`${serverPath}/audio/success.mp3`))
        : (finishAudio = new Audio(`${serverPath}/audio/failure.mp3`));

      finishAudio.play();
    }, 300);
    dispatch(changeGameMode(gameMods.READY_TO_START));
    setTimeout(() => {
      history.push('/');
    }, 3000);
  };

  useEffect(() => {
    if (gameMode === gameMods.TRAIN) {
      const newIsActiveCards = isActiveCards;
      for (let i = 0; i < isActiveCards.length; i++) {
        newIsActiveCards[i] = true;
      }
      setIsActiveCards(newIsActiveCards);
      setAnswers([]);
      setIsShowModal(false);
    }
  }, [gameMode]);

  const isFinish = (): boolean => {
    if (gameSessionCards.length !== 0) {
      return false;
    }
    return true;
  };

  const repeateWord = (): void => {
    setTimeout(() => {
      const audioCard = new Audio(gameSessionCards[0].audioPath);
      audioCard.play();
    }, 300);
  };

  const countMistakes = (): number => {
    let count = 0;
    answers.forEach((answer) => {
      if (answer === false) {
        count++;
      }
    });
    return count;
  };

  getCards();
  onAnswersChange();

  if (category === 'category') {
    return (
      <React.Fragment>
        <Router>
          <Route exact path="/">
            <div className="stars-container">
              {answers.map((answer) => {
                return (
                  <div className={`${answer === true ? 'star_right' : 'star_wrong'}`} key=""></div>
                );
              })}
            </div>
            <div className="cards-field">
              {displayCards.map((card) => {
                return (
                  <Link to={card.name.toLowerCase()} key={card.id} className="card-container">
                    <Card
                      key={card.id}
                      card={card}
                      onClick={(name: string) => checkAnswer(name, 1)}
                      isActive={true}
                    />
                  </Link>
                );
              })}
            </div>
          </Route>

          {displayCards.map((card) => {
            const newPath = `/${card.name.toLowerCase()}`;
            return (
              <Route
                key=""
                exact
                path={newPath}
                render={() => <CardsField category={card.name.toLowerCase()} />}
              />
            );
          })}
          <Route exact path="/Statistic" render={() => <Statistic />} />
        </Router>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="stars-container">
          {answers.map((answer) => {
            return (
              <div className={`${answer === true ? 'star_right' : 'star_wrong'}`} key=""></div>
            );
          })}
        </div>
        <div className="cards-field">
          {displayCards.map((card) => {
            const index = displayCards.indexOf(card);
            return (
              <Card
                key={card.id}
                card={card}
                onClick={(name: string) => checkAnswer(name, index)}
                isActive={isActiveCards[index]}
              />
            );
          })}
        </div>
        <button
          className={`start_game_btn ${gameMode === gameMods.READY_TO_START ? 'visible' : ''}`}
          onClick={() => {
            changeGameModeToGame();
            startGame();
          }}
        >
          START GAME
        </button>
        <button
          className={`start_game_btn ${gameMode === gameMods.GAME ? 'visible' : ''}`}
          onClick={() => repeateWord()}
        >
          Repeate
        </button>
        <div className={`${isShowModal === true ? '' : 'modal_hide'}`}>
          <FinishModal numberOfMistakes={countMistakes()} />
        </div>
      </React.Fragment>
    );
  }
};
