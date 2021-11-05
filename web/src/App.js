import React, {useState} from 'react';
import moment from 'moment';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import DatePickerPage from './pages/DatePickerPage/DatePickerPage';
import MainPage from './pages/MainPage/MainPage';

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [groups, setGroups] = useState(initialGroups);
  const [items, setItems] = useState(initialItems);

  return (
      <Layout>
           {selectedDate ? (
               <MainPage
                   selectedDate={selectedDate}
                   setSelectedDate={setSelectedDate}
                   groups={groups}
                   setGroups={setGroups}
                   items={items}
                   setItems={setItems}
               />
           ) : (
               <DatePickerPage
                   selectedDate={selectedDate}
                   setSelectedDate={setSelectedDate}
                   items={items}
               />
           )}
      </Layout>
  )
}

export default App;
