import React from 'react'

import { BillRow } from './BillRow';

export type UpcomingBillsProps = {
    nextBills: BillRow[]
}

const UpcomingBills = (props: UpcomingBillsProps) => {
    return (
        <>
            <p>autopay in the next month</p>
        {props.nextBills.map((bill, index) => {
            return (
                <p key={'bill'+index}>{bill?.amount} in your {bill?.source} account </p>
            )
        })}
        </>
    )
}

export default UpcomingBills