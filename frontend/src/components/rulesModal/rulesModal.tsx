import React, { FunctionComponent } from 'react';
import './rulesModal.css';

export const RulesModal: FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal_body_about">
            <h1 className="mb-20">About game</h1>
            <h3 className="mb-20 about_game_text">
              There are <span className="blue_text">two</span> mods{' '}
              <span className="blue_text">(train/game)</span>. In{' '}
              <span className="blue_text">train</span> mode you can click on the card, see it's
              translation and listen it's pronunciation. In <span className="blue_text">game</span>{' '}
              mode there are no text hints and you should choose correct card after it's name was
              sounded. Also you can login as <span className="blue_text">admin</span> threw the menu
              panel and <span className="blue_text">update, create, delete</span> categories and
              words from database.
            </h3>
            <button className="modal_finish_btn close_about_btn" onClick={() => setIsOpen(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};
