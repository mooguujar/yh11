import { RouterProvider } from 'react-router-dom';
import initRouter from './tools';
import { useMemo } from 'react';
import { AliveScope } from 'react-activation';
const Router = () => {
  const router = useMemo( () => initRouter(), [] );

  return (
    <AliveScope>
      <RouterProvider router={router}/>
    </AliveScope>
  );
};

export default Router;
