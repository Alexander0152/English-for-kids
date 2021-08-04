import React, { FunctionComponent, useEffect } from 'react';
import './adminWordsField.css';
import EntityCard from '../../businessLayer/entityCard';
import { adminCategoryMods, serverPath } from '../../businessLayer/gameConfig';
import { useSelector } from 'react-redux';
import { RootReducerState } from '../../businessLayer/reducers/rootReducer';
import { NotAuthorized } from '../notAuthorized/notAuthorized';

const editableValues: {
  id: number;
  newName: string;
  newTranslate: string;
  newImage: FormData;
  newImagePath: string;
  newAudio: FormData;
  newAudioPath: string;
}[] = [];

const newWordInfo = {} as {
  name: string;
  translate: string;
  newImagePath: string;
  newImage: FormData;
  newAudio: FormData;
  newAudioPath: string;
};

export const AdminWordsField: FunctionComponent = () => {
  const isAuthorized = useSelector<RootReducerState, RootReducerState['authorize']['isAuthorized']>(
    (state) => state.authorize.isAuthorized,
  );

  const category = useSelector<RootReducerState, RootReducerState['adminCategory']['category']>(
    (state) => state.adminCategory.category,
  );

  const [displayCards, setCards] = React.useState<EntityCard[]>([]);
  const [editableCards, setEditableCards] = React.useState<number[]>([]);
  const [mode, setMode] = React.useState<string>(adminCategoryMods.VIEW);
  const [newImage, setNewImage] = React.useState<File | null>(null);
  const [newSound, setNewSound] = React.useState<File | null>(null);

  const getCards = (): void => {
    const cards: EntityCard[] = [];

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
            value.cards[i].id = i;
            cards.push(value.cards[i]);
          }
          setCards(cards);
        }),
      );
    }, []);
  };

  const updateWord = (cardId: number) => {
    const newEditCards = [...editableCards];
    newEditCards.push(cardId);

    const newValue = {} as {
      id: number;
      newName: string;
      newTranslate: string;
      newImage: FormData;
      newImagePath: string;
      newAudio: FormData;
      newAudioPath: string;
    };
    newValue.id = cardId;
    editableValues.push(newValue);

    setEditableCards(newEditCards);
  };

  const saveChangies = (cardId: number) => {
    const editIndex = editableValues.findIndex((obj) => obj.id == cardId);
    const editableValue: {
      id: number;
      newName: string;
      newTranslate: string;
      newImage: FormData;
      newImagePath: string;
      newAudio: FormData;
      newAudioPath: string;
    } = editableValues[editIndex];

    const displayIndex: number = displayCards.findIndex((obj) => obj.id === cardId);
    const oldWordName: string = displayCards[displayIndex].name;

    if (editableValue.newImage) {
      fetch(`${serverPath}/cards/updateimage`, {
        method: 'POST',
        body: editableValue.newImage,
      });
    }
    if (editableValue.newAudio) {
      fetch(`${serverPath}/cards/updateaudio`, {
        method: 'POST',
        body: editableValue.newAudio,
      });
    }

    fetch(`${serverPath}/cards/word`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: category,
        wordName: oldWordName,
        newWordInfo: editableValue,
      }),
    });

    const newEditCards = [...editableCards];
    const index = newEditCards.indexOf(cardId);

    if (index > -1) {
      newEditCards.splice(index, 1);
    }
    const newDisplayCards = [...displayCards];
    newDisplayCards[displayIndex].name = editableValue.newName;
    newDisplayCards[displayIndex].translate = editableValue.newTranslate;
    if (editableValue.newImage) {
      newDisplayCards[displayIndex].imagePath = editableValue.newImagePath;
    }
    if (editableValue.newAudio) {
      newDisplayCards[displayIndex].audioPath = editableValue.newAudioPath;
    }

    setTimeout(() => setCards(newDisplayCards), 1000);
    setEditableCards(newEditCards);
  };

  const switchMode = () => {
    let newMode: string;
    mode === adminCategoryMods.VIEW
      ? (newMode = adminCategoryMods.CREATE_WORD)
      : (newMode = adminCategoryMods.VIEW);

    setMode(newMode);
  };

  const canselWordUpdate = (cardId: number) => {
    const newEditCards = [...editableCards];
    const index = newEditCards.indexOf(cardId);

    if (index > -1) {
      newEditCards.splice(index, 1);
    }

    const editIndex = editableValues.findIndex((obj) => obj.id === cardId);

    if (editIndex > -1) {
      editableValues.splice(index, 1);
    }

    const newDisplayCards = [...displayCards];

    setCards(newDisplayCards);
    setEditableCards(newEditCards);
  };

  const uploadImage = (cardId: number, file: File) => {
    const editIndex = editableValues.findIndex((obj) => obj.id == cardId);

    editableValues[editIndex].newImage = new FormData();
    editableValues[editIndex].newImage.append('file', file, file.name);
    editableValues[editIndex].newImagePath = `${serverPath}/images/${file.name}`;
    setNewImage(file);
  };

  const uploadAudio = (cardId: number, file: File) => {
    const editIndex = editableValues.findIndex((obj) => obj.id == cardId);

    editableValues[editIndex].newAudio = new FormData();
    editableValues[editIndex].newAudio.append('file', file, file.name);
    editableValues[editIndex].newAudioPath = `${serverPath}/audio/${file.name}`;
    setNewSound(file);
  };

  const getAudioName = (audioPath: string): string => {
    const parts = audioPath.split('/');
    const name = parts[parts.length - 1];

    return name;
  };

  const playSound = (audioPath: string): void => {
    const audio = new Audio(audioPath);
    audio.play();
  };

  const onNameChange = (cardId: number, newValue: string) => {
    const editIndex = editableValues.findIndex((obj) => obj.id == cardId);
    editableValues[editIndex].newName = newValue;
  };

  const onTranslateChange = (cardId: number, newValue: string) => {
    const editIndex = editableValues.findIndex((obj) => obj.id == cardId);
    editableValues[editIndex].newTranslate = newValue;
  };

  const deleteWord = (wordName: string) => {
    fetch(`${serverPath}/cards/deleteword`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: category,
        wordName: wordName,
      }),
    });
    const newDisplayCards = [...displayCards];
    const deleteIndex = displayCards.findIndex(
      (obj) => obj.name.toLowerCase() == wordName.toLowerCase(),
    );

    if (deleteIndex > -1) {
      newDisplayCards.splice(deleteIndex, 1);
    }
    setCards(newDisplayCards);
  };

  const getWordImage = (file: File) => {
    newWordInfo.newImage = new FormData();
    newWordInfo.newImage.append('file', file, file.name);
    newWordInfo.newImagePath = `${serverPath}/images/${file.name}`;
    setNewImage(file);
  };

  const getWordAudio = (file: File) => {
    newWordInfo.newAudio = new FormData();
    newWordInfo.newAudio.append('file', file, file.name);
    newWordInfo.newAudioPath = `${serverPath}/audio/${file.name}`;
    setNewSound(file);
  };

  const saveNewWord = () => {
    console.log(newWordInfo);
    if (!newWordInfo.newImage || !newWordInfo.newAudio) {
      alert('Please, set image and audio!');
      return;
    }

    fetch(`${serverPath}/cards/updateimage`, {
      method: 'POST',
      body: newWordInfo.newImage,
    });

    fetch(`${serverPath}/cards/updateaudio`, {
      method: 'POST',
      body: newWordInfo.newAudio,
    });

    fetch(`${serverPath}/cards/createnewword`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: category,
        wordName: newWordInfo.name,
        wordTranslate: newWordInfo.translate,
        wordImagePath: newWordInfo.newImagePath,
        wordAudioPath: newWordInfo.newAudioPath,
      }),
    });
    const newDisplayCards = [...displayCards];
    const newDisplayCard: EntityCard = new EntityCard('category');
    newDisplayCard.name = newWordInfo.name;
    newDisplayCard.translate = newWordInfo.translate;
    newDisplayCard.imagePath = newWordInfo.newImagePath;
    newDisplayCard.audioPath = newWordInfo.newAudioPath;

    newDisplayCards.push(newDisplayCard);
    setTimeout(() => setCards(newDisplayCards), 1000);
    switchMode();
  };

  getCards();

  if (!isAuthorized) {
    return <NotAuthorized />;
  } else {
    return (
      <>
        <h2 className="admin_words_main_tite">Category: {category}</h2>
        <div className="cards-field">
          {displayCards.map((card) => {
            const audioName = getAudioName(card.audioPath);
            return (
              <div key="" className="card-container">
                <div className="card admin_category_card">
                  <h2
                    className={`${
                      editableCards.includes(card.id) ? 'hide' : ''
                    } admin_card_title mt-5`}
                  >
                    {card.name}
                  </h2>
                  <input
                    className={`${
                      editableCards.includes(card.id) ? 'edit' : 'hide'
                    } admin_card_title mt-5`}
                    type="text"
                    maxLength={13}
                    onChange={(event: InputEvent) => onNameChange(card.id, event.target.value)}
                  />
                  <h2
                    className={`${
                      editableCards.includes(card.id) ? 'hide' : ''
                    } admin_card_title mt-5`}
                  >
                    {card.translate}
                  </h2>
                  <input
                    className={`${
                      editableCards.includes(card.id) ? 'edit' : 'hide'
                    } admin_card_title mt-5`}
                    type="text"
                    maxLength={13}
                    onChange={(event: InputEvent) => onTranslateChange(card.id, event.target.value)}
                  />
                  <div
                    className={`${editableCards.includes(card.id) ? 'hide' : ''} card_sound_play`}
                  >
                    <p className="admin_card_title_word">Sound: {audioName}</p>
                    <button
                      className="admin_card_btn_word mt-10 back_btn"
                      onClick={() => playSound(card.audioPath)}
                    >
                      Play
                    </button>
                  </div>
                  <div className={`${editableCards.includes(card.id) ? '' : 'hide'}`}>
                    <label htmlFor={card.imagePath} className="file-upload_word">
                      <i className="fa fa-cloud-upload"></i>{' '}
                      {newImage !== null ? '_______✔_______' : '______img________'}
                    </label>
                    <input
                      id={card.imagePath}
                      type="file"
                      onChange={(event: HTMLInputElement & EventTarget) =>
                        uploadImage(card.id, (event.target as HTMLInputElement).files[0])
                      }
                    />
                    <label htmlFor={card.audioPath} className="file-upload_word">
                      <i className="fa fa-cloud-upload"></i>{' '}
                      {newSound !== null ? '_______✔_______' : '_______sound_______'}
                    </label>
                    <input
                      id={card.audioPath}
                      type="file"
                      onChange={(event: HTMLInputElement & EventTarget) =>
                        uploadAudio(card.id, (event.target as HTMLInputElement).files[0])
                      }
                    />
                  </div>
                  <div
                    className={`${
                      editableCards.includes(card.id) ? 'hide' : ''
                    } admin_word_img_container`}
                  >
                    <img className="admin_category_card_img" src={card.imagePath} />
                  </div>
                  <button
                    className={`${
                      editableCards.includes(card.id) ? 'hide' : ''
                    } admin_card_btn_word`}
                    onClick={() => updateWord(card.id)}
                  >
                    Update
                  </button>
                  <button
                    className={`${
                      editableCards.includes(card.id) ? 'hide' : ''
                    } admin_card_btn_word admin_card_btn_delete`}
                    onClick={() => deleteWord(card.name)}
                  >
                    Delete word
                  </button>
                  <button
                    className={`${
                      editableCards.includes(card.id) ? '' : 'hide'
                    } admin_card_btn_save_changes_word`}
                    onClick={() => saveChangies(card.id)}
                  >
                    Save
                  </button>
                  <button
                    className={`${
                      editableCards.includes(card.id) ? '' : 'hide'
                    } admin_card_btn_word`}
                    onClick={() => canselWordUpdate(card.id)}
                  >
                    Back
                  </button>
                </div>
              </div>
            );
          })}
          <div
            className={`${mode === adminCategoryMods.VIEW ? '' : 'hide'} card-container`}
            onClick={() => switchMode()}
          >
            <div className="card admin_category_card">
              <p className="admin_card_title">Create new word</p>
              <img className="add_image-container" src={`${serverPath}/icons/add.png`} />
            </div>
          </div>
          <div className={`${mode === adminCategoryMods.CREATE_WORD ? '' : 'hide'} card-container`}>
            <div className="card admin_category_card">
              <input
                className="edit admin_card_title_word"
                type="text"
                maxLength={13}
                placeholder="New word name"
                onChange={(event: InputEvent) => (newWordInfo.name = event.target.value)}
              />
              <input
                className="edit admin_card_title_word"
                type="text"
                maxLength={13}
                placeholder="New word translate"
                onChange={(event: InputEvent) => (newWordInfo.translate = event.target.value)}
              />
              <label htmlFor="image-upload" className="file-upload_word">
                <i className="fa fa-cloud-upload"></i>{' '}
                {newImage !== null ? '_______✔_______' : '______img________'}
              </label>
              <input
                id="image-upload"
                type="file"
                onChange={(event: HTMLInputElement & EventTarget) =>
                  getWordImage((event.target as HTMLInputElement).files[0])
                }
              />
              <label htmlFor="sound-upload" className="file-upload_word">
                <i className="fa fa-cloud-upload"></i>{' '}
                {newSound !== null ? '_______✔_______' : '______sound________'}
              </label>
              <input
                id="sound-upload"
                type="file"
                onChange={(event: HTMLInputElement & EventTarget) =>
                  getWordAudio((event.target as HTMLInputElement).files[0])
                }
              />
              <button
                className={`${
                  mode === adminCategoryMods.CREATE_WORD ? '' : 'hide'
                } admin_card_btn_save_cat`}
                onClick={() => saveNewWord()}
              >
                Save new word
              </button>
              <button
                className={`${
                  mode === adminCategoryMods.CREATE_WORD ? '' : 'hide'
                } admin_card_btn_word mt-10 back_btn`}
                onClick={() => {
                  switchMode();
                  setNewImage(null);
                  setNewSound(null);
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};
