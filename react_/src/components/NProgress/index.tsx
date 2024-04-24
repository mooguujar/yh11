import { useEffect } from 'react';
import 'nprogress/nprogress.css';
import nprogress from 'nprogress';
nprogress.configure( {
  showSpinner: false
} );
const NProgress = () => {
  useEffect( () => {
    nprogress.start();

    return () => {
      nprogress.done();
    };
  }, [] );

  return ( <i /> );
};

export default NProgress;
