import React, {useState} from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import DatePickerPage from './pages/DatePickerPage/DatePickerPage';
import MainPage from './pages/MainPage/MainPage';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
      <Layout>
           {selectedDate ? (
               <MainPage
                   selectedDate={selectedDate}
                   setSelectedDate={setSelectedDate}
               />
           ) : (
               <DatePickerPage
                   selectedDate={selectedDate}
                   setSelectedDate={setSelectedDate}
               />
           )}
      </Layout>
  )
}

export default App;
