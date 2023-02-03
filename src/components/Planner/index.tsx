import React, { useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import moment from 'moment'
import Calendar from 'react-calendar';
import Day from '../Day'

import 'react-calendar/dist/Calendar.css';
import './../calendar.css';

import { VIEW_DATE } from '../../constants';

function Planner() {
  const {
    state: { bills, billDates, selectedDate },
    dispatch,
  } = useGlobalContext()

  return (
    <div className="App">
      <header className="App-header">
      <Day currentDay={selectedDate} bills={bills}></Day>
      </header>
              <main className="Sample__container__content">
                <Calendar onChange={ (value : Date) => {
                  dispatch({
                    type: 'setDate',
                    payload: value
                  })
                }} showWeekNumbers value={selectedDate} 
                tileClassName={({ date }) => {
                  if(billDates.has(moment(date).format(VIEW_DATE))){
                   return  'highlight'
                  } return ''
                }}
                />
              </main>
    </div>
  );
}

export default Planner;
