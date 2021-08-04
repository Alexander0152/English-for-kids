import React, { FunctionComponent, useEffect, useRef } from 'react';
import './notAuthorized.css';

export const NotAuthorized: FunctionComponent = () => {
  return <h1 className="error">Error: You are not authorized!</h1>;
};
