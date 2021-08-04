import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import './card.css';
import EntityCard from '../../businessLayer/entityCard';
import { cardsTypes, gameMods } from '../../businessLayer/gameConfig';
import { useSelector } from 'react-redux';
import { RootReducerState } from '../../businessLayer/reducers/rootReducer';

type CardProps = {
  card: EntityCard;
  onClick(name: string): void;
  isActive: boolean;
};

export const Card: FunctionComponent<CardProps> = ({ card, onClick, isActive }) => {
  const [isFlipped, setIsFlipped] = React.useState({ isFlipped: false });
  const gameMode = useSelector<RootReducerState, RootReducerState['gameMode']['mode']>(
    (state) => state.gameMode.mode,
  );

  const flipCard = (): void => {
    setIsFlipped({ isFlipped: true });
  };

  const flipBack = (): void => {
    if (isFlipped.isFlipped) {
      setIsFlipped({ isFlipped: false });
    }
  };

  const playAudio = (): void => {
    if (gameMode !== gameMods.TRAIN) {
      return;
    }
    const audio = new Audio(card.audioPath);
    audio.play();
  };

  const countStatisticTrain = (name: string): void => {
    if (gameMode !== gameMods.TRAIN) {
      return;
    }
    const retrievedCards = localStorage.getItem('cards');
    if (retrievedCards !== null) {
      const statisticCards = JSON.parse(retrievedCards);
      statisticCards.forEach((el: EntityCard) => {
        if (el.name === name) {
          el.trainCount === undefined ? (el.trainCount = 1) : el.trainCount++;
          localStorage.setItem('cards', JSON.stringify(statisticCards));
          return;
        }
      });
    }
  };

  if (card.type === cardsTypes.CATEGORY) {
    return (
      <div className="card-container">
        <div className="card">
          <div className="card__front">
            <img src={card.imagePath} alt="" />
            <p className="card_title">{card.name}</p>
          </div>
          <div className="card__back"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`card-container ${isFlipped.isFlipped ? 'flipped' : ''} ${
          isActive === false && gameMode === gameMods.GAME ? 'guessed_card' : ''
        }`}
        onMouseLeave={() => flipBack()}
      >
        <div
          className="card"
          onClick={() => {
            onClick(card.name);
            playAudio();
            countStatisticTrain(card.name);
          }}
        >
          <div className="card__front">
            <img src={card.imagePath} alt="card image" />
            <div className={`${gameMode === gameMods.TRAIN ? '' : 'hidden'}`}>
              <div className="turn_card_icon" onClick={() => flipCard()}></div>
              <p className="card_title">{card.name}</p>
            </div>
          </div>
          <div className="card__back">
            <img src={card.imagePath} alt="card image" />
            <p className="card_title">{card.translate}</p>
          </div>
        </div>
      </div>
    );
  }
};
