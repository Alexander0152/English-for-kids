import React, { FunctionComponent, useEffect } from 'react';
import './adminCategoryField.css';
import EntityCard from '../../businessLayer/entityCard';
import { adminCategoryMods, gameMods, serverPath } from '../../businessLayer/gameConfig';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import { changeAdminCategory } from '../../businessLayer/actions/changeAdminCategoryAction';
import { RootReducerState } from '../../businessLayer/reducers/rootReducer';
import { NotAuthorized } from '../notAuthorized/notAuthorized';

type AdminCategoryFieldProps = {
  category: string;
};

const editableValues: { id: number; newName: string; newImage: FormData; newImagePath: string }[] =
  [];
const newCategoryInfo = {} as { name: string; newImagePath: string; newImage: FormData };

export const AdminCategoryField: FunctionComponent<AdminCategoryFieldProps> = ({ category }) => {
  const isAuthorized = useSelector<RootReducerState, RootReducerState['authorize']['isAuthorized']>(
    (state) => state.authorize.isAuthorized,
  );
  // const gameMode = useSelector<GameModeState, GameModeState['mode']>((state) => state.mode);
  const dispatch = useDispatch();

  const [displayCards, setCards] = React.useState<EntityCard[]>([]);
  const [editableCards, setEditableCards] = React.useState<number[]>([]);

  const [mode, setMode] = React.useState<string>(adminCategoryMods.VIEW);
  const [newImage, setNewImage] = React.useState<File | null>(null);

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

  const updateCategory = (cardId: number) => {
    const newEditCards = [...editableCards];
    newEditCards.push(cardId);

    const newValue = {} as {
      id: number;
      newName: string;
      newImage: FormData;
      newImagePath: string;
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
      newImage: FormData;
      newImagePath: string;
    } = editableValues[editIndex];

    const displayIndex: number = displayCards.findIndex((obj) => obj.id === cardId);
    const oldCategoryName: string = displayCards[displayIndex].name;

    if (editableValue.newImage) {
      fetch(`${serverPath}/cards/updateimage`, {
        method: 'POST',
        body: editableValue.newImage,
      });
    }

    fetch(`${serverPath}/cards`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryName: oldCategoryName,
        newCategoryInfo: editableValue,
      }),
    });

    const newEditCards = [...editableCards];
    const index = newEditCards.indexOf(cardId);

    if (index > -1) {
      newEditCards.splice(index, 1);
    }
    const newDisplayCards = [...displayCards];
    newDisplayCards[displayIndex].name = editableValue.newName;

    setEditableCards(newEditCards);
    setTimeout(() => setCards(newDisplayCards), 1000);
  };

  const saveNewCategory = () => {
    if (!newCategoryInfo.newImage) {
      alert('Please, set image!');
      return;
    }

    fetch(`${serverPath}/cards/updateimage`, {
      method: 'POST',
      body: newCategoryInfo.newImage,
    });

    fetch(`${serverPath}/cards/createnewcategory`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryName: newCategoryInfo.name,
        categoryImagePath: newCategoryInfo.newImagePath,
      }),
    });
    const newDisplayCards = [...displayCards];
    const newDisplayCard: EntityCard = new EntityCard('category');
    newDisplayCard.name = newCategoryInfo.name;

    newDisplayCards.push(newDisplayCard);
    setTimeout(() => setCards(newDisplayCards), 1000);
    switchMode();
  };

  const switchMode = () => {
    let newMode: string;
    mode === adminCategoryMods.VIEW
      ? (newMode = adminCategoryMods.CREATE_CATEGORY)
      : (newMode = adminCategoryMods.VIEW);

    setMode(newMode);
  };

  const canselCategoryUpdate = (cardId: number) => {
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

  const onNameChange = (cardId: number, newValue: string) => {
    const editIndex = editableValues.findIndex((obj) => obj.id == cardId);
    editableValues[editIndex].newName = newValue;
  };

  const uploadImage = (cardId: number, file: File) => {
    const editIndex = editableValues.findIndex((obj) => obj.id == cardId);

    editableValues[editIndex].newImage = new FormData();
    editableValues[editIndex].newImage.append('file', file, file.name);
    editableValues[editIndex].newImagePath = `${serverPath}/images/${file.name}`;
    setNewImage(file);
  };

  const getNewCategoryImage = (file: File) => {
    newCategoryInfo.newImage = new FormData();
    newCategoryInfo.newImage.append('file', file, file.name);
    newCategoryInfo.newImagePath = `${serverPath}/images/${file.name}`;
    setNewImage(file);
  };

  const deleteCategory = (categoryName: string) => {
    console.log(categoryName);
    fetch(`${serverPath}/cards/deletecategory`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryName: categoryName,
      }),
    });
    const newDisplayCards = [...displayCards];
    const deleteIndex = displayCards.findIndex(
      (obj) => obj.name.toLowerCase() == categoryName.toLowerCase(),
    );

    if (deleteIndex > -1) {
      newDisplayCards.splice(deleteIndex, 1);
    }
    setCards(newDisplayCards);
  };

  getCards();

  if (!isAuthorized) {
    return <NotAuthorized />;
  } else {
    return (
      <Router>
        <div>
          <div className="cards-field">
            {displayCards.map((card) => {
              return (
                <div key={card.imagePath} className="card-container">
                  <div className="card admin_category_card">
                    <h3
                      className={`${
                        editableCards.includes(card.id) ? 'hide' : ''
                      } admin_card_title`}
                    >
                      {card.name}
                    </h3>
                    <input
                      className={`${
                        editableCards.includes(card.id) ? 'edit' : 'hide'
                      } admin_card_title`}
                      type="text"
                      maxLength={13}
                      onChange={(event: InputEvent) => onNameChange(card.id, event.target.value)}
                    />
                    <p className="admin_card_title">WORDS: 8</p>
                    <div className={`${editableCards.includes(card.id) ? '' : 'hide'} mb_20`}>
                      <label htmlFor={card.imagePath} className="file-upload">
                        <i className="fa fa-cloud-upload"></i>{' '}
                        {newImage !== null ? '_______✔_______' : '_______img_______'}
                      </label>
                      <input
                        className="file-upload"
                        type="file"
                        id={card.imagePath}
                        onChange={(event: HTMLInputElement & EventTarget) =>
                          uploadImage(card.id, (event.target as HTMLInputElement).files[0])
                        }
                      />
                    </div>
                    <button
                      className={`${editableCards.includes(card.id) ? 'hide' : ''} admin_card_btn`}
                      onClick={() => updateCategory(card.id)}
                    >
                      Update
                    </button>
                    <Link
                      onClick={() => dispatch(changeAdminCategory(card.name.toLowerCase()))}
                      to="/AdminPageCategories/AdminPageWords"
                    >
                      <button
                        className={`${
                          editableCards.includes(card.id) ? 'hide' : ''
                        } admin_card_btn`}
                      >
                        Add word
                      </button>
                    </Link>
                    <button
                      className={`${
                        editableCards.includes(card.id) ? 'hide' : ''
                      } admin_card_btn admin_card_btn_delete`}
                      onClick={() => deleteCategory(card.name)}
                    >
                      Delete category
                    </button>
                    <button
                      className={`${
                        editableCards.includes(card.id) ? '' : 'hide'
                      } admin_card_btn_save_changes`}
                      onClick={() => saveChangies(card.id)}
                    >
                      Save changes
                    </button>
                    <button
                      className={`${editableCards.includes(card.id) ? '' : 'hide'} admin_card_btn`}
                      onClick={() => {
                        canselCategoryUpdate(card.id);
                      }}
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
                <p className="admin_card_title">Create new category</p>
                <img className="add_image-container" src={`${serverPath}/icons/add.png`} />
              </div>
            </div>
            <div
              className={`${
                mode === adminCategoryMods.CREATE_CATEGORY ? '' : 'hide'
              } card-container`}
            >
              <div className="card admin_category_card">
                <input
                  className="edit admin_card_title"
                  type="text"
                  maxLength={13}
                  placeholder="New category name"
                  onChange={(event: InputEvent) => (newCategoryInfo.name = event.target.value)}
                />
                <p className="admin_card_title">WORDS: 0</p>
                <label htmlFor="create_category" className="file-upload">
                  <i className="fa fa-cloud-upload"></i>{' '}
                  {newImage !== null ? '_______✔_______' : '______________'}
                </label>
                <input
                  id="create_category"
                  type="file"
                  onChange={(event: HTMLInputElement & EventTarget) =>
                    getNewCategoryImage((event.target as HTMLInputElement).files[0])
                  }
                />
                <button
                  className={`${
                    mode === adminCategoryMods.CREATE_CATEGORY ? '' : 'hide'
                  } admin_card_btn_save_cat`}
                  onClick={() => saveNewCategory()}
                >
                  Save new category
                </button>
                <button
                  className={`${
                    mode === adminCategoryMods.CREATE_CATEGORY ? '' : 'hide'
                  } admin_card_btn mt-10 back_btn`}
                  onClick={() => {
                    switchMode();
                    setNewImage(null);
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
};
