import { useEffect } from 'react';
import { useOutlet } from 'react-router-dom';

const RouterRoot = () => {
  const outlet = useOutlet();

  useEffect( () => {
  }, [] );

  return outlet;
};

export default RouterRoot;
