import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {

  const { t, i18n } = useTranslation();

  return (
    <div className='container' dir={i18n.dir()}>
      <div className='mt-5 p-5 bg-light'>
        <h1 className='display-4'>{t('Home.welcome')}</h1>
        <p className='lead'>
          {t('Home.thisIs')}
        </p>
        <hr className='my-4' />
        <p>{t('Home.clickThe')}</p>
        <Link className='btn btn-primary btn-lg' to='/login'>{t('Login.login')}</Link>
      </div>
    </div>
  );
};

export default Home;