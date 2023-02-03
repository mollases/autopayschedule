import React, {Component} from 'react'
import moment from 'moment'

import { BillRow } from './../BillRow';
import TodaysBills from './TodaysBills';
import UpcomingBills from './UpcomingBills';

export type DayProps = {
    currentDay: Date;
    bills: BillRow[]
};

export type DayState = {
    todaysBills: BillRow[]
    nextBills: BillRow[]
};

const MONEY_REGEX = /^\$?[\d,]+(\.\d*)?$/

class Day extends Component<DayProps,DayState> {
    constructor(props: DayProps){
        super(props)
        this.state = {
            todaysBills: [],
            nextBills:[]
        }
    }

    convertToNumber(dollar: string) {
         const isValid = MONEY_REGEX.test(dollar)
         if(isValid){
            return Number(dollar.replace(/[$,]/g, ''));
         }
    }

    static groupByAccount(listOfBills: BillRow[]){
        const groupedByAccount = []
        for(let i = 0; i < listOfBills.length; i++){
            let bill = {...listOfBills[i]}
            let index = groupedByAccount.findIndex(value => bill.source === value.source)
            if(index !== -1) {
                let num = Number(bill.amount.replace(/[$,]/g, ''));
                let origin = Number(groupedByAccount[index].amount.replace(/[$,]/g, ''));
                groupedByAccount[index].amount = '$' +Intl.NumberFormat().format(num + origin)
            } else {
                groupedByAccount.push(bill)
            }
        }
        return groupedByAccount
    }

    static getDerivedStateFromProps(props: DayProps) {
        console.log('derived state')
        const bills = props.bills
        const day = props.currentDay
        const todaysBills = bills.filter(value => {
            const when = moment(value.when)
            return when.isSame(day)
        })
       
        
        const thisMonth = bills.filter(value => {
            const when = moment(value.when)
            return when.isBetween(day, moment(day).add(1,'month'))
        })
        const todaysGrouped = Day.groupByAccount(todaysBills)
        
        thisMonth.sort((a,b) => {
            const aa = a.source
            const bb = b.source
            if (aa < bb) {
                return -1;
            } else if ( aa > bb){
                return 1;
            } else {
                return 0;
            }
        })
        const nextBillsGrouped = Day.groupByAccount(thisMonth)

        return {
            nextBills: nextBillsGrouped,
            todaysBills: todaysGrouped
        }
    }

    render(){
        let billsToShow
        if(this.state.todaysBills === undefined){

        } else if(this.state.todaysBills.length){
            billsToShow = <TodaysBills todaysBills={this.state.todaysBills}/>
        } else {
            billsToShow = <UpcomingBills nextBills={this.state.nextBills}/>
        }
        return (
            <div>
                <h1>{moment(this.props.currentDay).format('MMMM Do YYYY')}</h1>
                {billsToShow}
             </div>
        )
    }
}


export default Day