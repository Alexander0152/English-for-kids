import React, { FunctionComponent } from 'react';
import './finishModal.css';

type FinishModalProps = {
  numberOfMistakes: number;
};

export const FinishModal: FunctionComponent<FinishModalProps> = ({ numberOfMistakes }) => {
  return (
    <div className="modal-finish">
      <div className="modal-finish-content">
        <p>{numberOfMistakes} mistake(s)</p>
        <div className={`${numberOfMistakes === 0 ? 'success' : 'failure'}`}></div>
      </div>
    </div>
  );
};
