import React, {useState, useEffect} from 'react';
import S from './App.styled';
import {
    BrowserRouter as Router
} from "react-router-dom";
import { Layout } from 'antd';

import 'antd/dist/antd.css';
import Header from './components/Header/Header';
import AppRoutes from './components/Common/AppRoutes';

import AuthApi from './components/Common/AuthApi';
import UsersApi from './services/api/users';
import Loader from './components/Common/UI-Components/Loader/Loader';
const { Content } = Layout;


const App = () => {
 const [auth, setAuth] = useState(false);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
     const readSession = async () => {
       setLoading(true)
       const res = await UsersApi.hasLogin();
       if (res.auth) {
           setAuth(true);
       }
       setLoading(false)
     };
     readSession();
 }, []);

  return (
      <Layout>
          <S.GlobalStyle />
          {loading ? <Loader/> : (
              <AuthApi.Provider value={{ auth, setAuth }}>
                  <Router>
                      <Header />
                      <Content>
                          <AppRoutes/>
                      </Content>
                  </Router>
              </AuthApi.Provider>
          )}
      </Layout>
  )
}

export default App;
