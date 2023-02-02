import React, { useState } from 'react';
import Papa from 'papaparse'
import moment from 'moment'
import Calendar from 'react-calendar';
import Day from './Day'

import './App.css';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

import { BillRow } from './BillRow';
const INTERNAL_DATE = 'MM-DD-YYYY'
const VIEW_DATE = 'DD-MM-YYYY'

function App() {
  const [selectedDate, onChange] = useState(new Date());
  const [bills, updateBills] = useState<BillRow[]>([]);
  const [billPayDates, datesChange] = useState(new Set());

  const fileUploaded = function (e: { target: { files: any; }; }) {
      const files = e.target.files;
      if (files) {
        Papa.parse<BillRow>(files[0], {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: function(results) {
            const csvResults = results.data

            const fullYearBills = flushOutYear(csvResults)
            updateBills(fullYearBills)

            const billDates = fullYearBills.map(value  => {
              console.log(value)
              return value?.when? moment(value?.when).format(VIEW_DATE) : undefined
            }).filter(v => v!!)

            datesChange(new Set(billDates))
          }}
        )
      }
  }

  const addOnFrequency = (bill: BillRow, frequency: number) => {
    const frequencyArray: BillRow[] = [bill]
    if(frequency === 12) {
      for(let i = 1; i < 12; i ++){
        let newBill = {
          ...bill,
          when: moment(bill.when).add(i,'month').format(INTERNAL_DATE)
        }
        if(newBill.when === 'Invalid date') {
          console.log( 'invalid' , i, newBill, bill.when, moment(bill.when).format(INTERNAL_DATE))
        } else {
          console.log( 'valid' , newBill)
        }
        frequencyArray.push(newBill)
      }
    }
    if(frequency === 3) {
      for(let i = 1; i < 3; i ++){
        frequencyArray.push({
          ...bill,
          when: moment(bill.when).add(i,'month').format(INTERNAL_DATE)
        })
      }
    }
    if(frequency === 2) {
      for(let i = 1; i < 2; i ++){
        frequencyArray.push({
          ...bill,
          when: moment(bill.when).add(i,'month').format(INTERNAL_DATE)
        })
      }
    }
    return frequencyArray
  }

  const flushOutYear = (bills: BillRow[]) => {
    const fullYearBills = []
    for(let i = 0; i < bills.length; i++){
      const currentBill = bills[i]
      if(currentBill.when){
        currentBill.when = moment(currentBill.when).format(INTERNAL_DATE)
        fullYearBills.push(...addOnFrequency(currentBill,currentBill.frequency))
      }
    }
    return fullYearBills
  }

  let fileUploader
  if(bills.length === 0) {
    fileUploader = (
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={fileUploaded}
      />
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        {fileUploader}
      <Day currentDay={selectedDate} bills={bills}></Day>
      </header>
              <main className="Sample__container__content">
                <Calendar onChange={onChange} showWeekNumbers value={selectedDate} 
                tileClassName={({ date }) => {
                  if(billPayDates.has(moment(date).format(VIEW_DATE))){
                   return  'highlight'
                  } return ''
                }}
                />
              </main>
    </div>
  );
}

export default App;
