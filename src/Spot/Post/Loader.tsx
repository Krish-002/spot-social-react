import React, { useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface LoaderProps {
  show: boolean;
  children: ReactNode;
}

const Loader: React.FC<LoaderProps> = (props) => {
  const [node] = useState(document.createElement('div'));
  const loader = document.querySelector('#loader') as HTMLDivElement;  // Assure TypeScript of the element type

  useEffect(() => {
    if (loader) {
      loader.appendChild(node).classList.add('message');
    }
  }, [loader, node]);

  useEffect(() => {
    if (loader) {
      if (props.show) {
        loader.classList.remove('hide');
        document.body.classList.add('loader-open');
      } else {
        loader.classList.add('hide');
        document.body.classList.remove('loader-open');
      }
    }
  }, [loader, props.show]);

  return ReactDOM.createPortal(props.children, node);
};

export default Loader;
