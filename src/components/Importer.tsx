import moment from 'moment';
import Papa from 'papaparse';
import React from 'react'
import { BillRow } from '../BillRow';
import { INTERNAL_DATE, VIEW_DATE } from '../constants';
import { useGlobalContext } from '../context/globalContext';

const Importer = () => {

  const {
    dispatch
  } = useGlobalContext()

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
          const billDates = fullYearBills.map(value  => {
            return value?.when? moment(value?.when).format(VIEW_DATE) : ''
          }).filter(v => v!!)

          dispatch({
            type: 'updateBills',
            payload: {
              source: csvResults,
              bills: fullYearBills,
              billDates: new Set(billDates)
            }
          })
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


return (
    <input
      type="file"
      accept=".csv,.xlsx,.xls"
      onChange={fileUploaded}
    />
  )
}

export default Importer