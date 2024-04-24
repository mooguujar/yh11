
import { Suspense, lazy } from 'react';
import { type RouteObject, type LoaderFunctionArgs, json, redirect, createBrowserRouter } from 'react-router-dom';
import store from '@/store';
import { AUTH } from '@/store/sliceName';
import { type RouteMeta } from './custom';
import NProgress from '@/components/NProgress';
import { routes } from './routers';
import RouterRoot from './RouterRoot';
const NotFoundLazy = lazy( async () => await import( '@/pages/NotFound' ) );

const beforeRouter = ( _loder: LoaderFunctionArgs, meta?: RouteMeta ) => {
  if ( meta?.isAuth ) {
    const token = store.getState()[AUTH].token;

    if ( !token ) return redirect( '/auth/login' );
  }
  if ( meta?.title ) document.title = meta.title;
  if ( meta?.redirect ) return redirect( `${meta.redirect}` );
  if ( typeof meta?.require === 'function' ) return meta.require();
  if ( typeof meta?.require === 'string' ) return fetch( meta?.require );

  return json( meta ?? {} );
};
const createRouteObjectList = ( routes: RouteObject[] ): RouteObject[] => {
  const newRoutes = routes.map( item => {
    const meta = item.meta;

    const loader = async ( args: LoaderFunctionArgs ) => beforeRouter( args, meta );
    const errorElement = <NotFoundLazy />;
    const path = item.path;

    if ( !item.children ) {
      let element;

      if ( !meta?.notSProgress ) {
        element = <Suspense fallback={<NProgress />} >{item.element}</Suspense>;
      }

      return {
        ...item,
        path,
        loader,
        errorElement,
        element
      };
    } else {
      return {
        ...item,
        path,
        loader,
        errorElement,
        children: item.children && createRouteObjectList( item.children )
      };
    }
  } );

  return newRoutes;
};

export default () => {
  const children = createRouteObjectList(
    routes
  );

  return createBrowserRouter(
    [
      {
        path: '/',
        element: <RouterRoot />,
        loader: ( args ) => beforeRouter( args ),
        children
      },
      {
        path: '*',
        index: true,
        element: ( <Suspense fallback={<NProgress />}>
          <NotFoundLazy />
        </Suspense> )
      }
    ],
    {
      basename: '/h5'
    }
  );
};
