import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, Fragment } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '@/app/store';
import NProgress from 'nprogress';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import 'react-quill/dist/quill.snow.css'

let persistor = persistStore(store);

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // console.log(window.location.protocol+ "://" + window.location.host)
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </Fragment>
  );
}
