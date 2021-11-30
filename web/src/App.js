import React from 'react';
import S from './App.styled';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import moment from 'moment';
import { Layout } from 'antd';

import 'antd/dist/antd.css';
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header/Header';
import ApplicationsPage from './pages/ApplicationsPage/ApplicationsPage';
import ClientsPage from './pages/ClientsPage/ClientsPage';
import TrailersPage from './pages/TrailersPage/TrailersPage';
import PartsPage from './pages/PartsPage/PartsPage';
import WorksPage from './pages/WorksPage/WorksPage';

const { Content } = Layout;

const initialGroups = [
    { id: 1, title: 'Пост 1' },
    { id: 2, title: 'Пост 2' },
    { id: 3, title: 'Пост 3' },
    { id: 4, title: 'Пост 4' },
];

const initialItems = [
    {
        id: 1,
        group: 1,
        title: 'item 1',
        start: moment(),
        end: moment().add(1, 'hour')
    },
    {
        id: 2,
        group: 2,
        title: 'item 2',
        start: moment().add(-0.5, 'hour'),
        end: moment().add(0.5, 'hour')
    },
    {
        id: 3,
        group: 1,
        title: 'item 3',
        start: moment().add(2, 'hour'),
        end: moment().add(3, 'hour')
    },
    {
        id: 4,
        group: 1,
        title: 'item 4',
        start: moment().subtract(2, 'day'),
        end: moment().subtract(2, 'day').add(3, 'hour'),
    },
];

const App = () => {
  return (
      <Layout>
          <S.GlobalStyle />
          <Router>
            <Header />
            <Content>
                <Routes>
                    <Route
                        path="/"
                        element={<MainPage/>}
                    />
                    <Route
                        path="/applications"
                        element={<ApplicationsPage/>}
                    />
                    <Route
                        path="/clients"
                        element={<ClientsPage/>}
                    />
                    <Route
                        path="/trailers"
                        element={<TrailersPage/>}
                    />
                    <Route
                        path="/parts"
                        element={<PartsPage/>}
                    />
                    <Route
                        path="/works"
                        element={<WorksPage/>}
                    />
                  </Routes>
            </Content>
          </Router>
      </Layout>
  )
}

export default App;
