import { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import api from './api';

export const login = (res) => {
  cookie.set('token', res.data.token, { expires: 1 });
  Router.push('/dashboard');
};

export const auth = ctx => {
  const { token } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end()
    } else {
      Router.push('/login')
    }
  }

  return token
};

export const getUser = async (ctx) => {
  const user = await api.get('me');
  return user;
};

export const logout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  Router.push('/login')
};

export const WithAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/login')
      }
    };

    useEffect(() => {

      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout')
      }
    }, []);

    return <WrappedComponent {...props} />
  };

  Wrapper.getInitialProps = async ctx => {
    const token = await auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token};
  };

  return Wrapper
};