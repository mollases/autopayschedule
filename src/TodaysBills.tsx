import React from 'react'

import { BillRow } from './BillRow';

export type TodaysBillsProps = {
  todaysBills: BillRow[]
}

const TodaysBills = (props: TodaysBillsProps) => {
  return (
      <>
          <p>todays bills</p>
      {props.todaysBills.map((bill, index) => {
          return (
              <p key={'bill'+index}>you need at least {bill?.amount} in your {bill?.source} account </p>
          )
      })}
      </>
  )
}

export default TodaysBills