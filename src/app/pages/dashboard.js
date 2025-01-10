"use client"

import {useState} from 'react';
import Calendar from '../components/calendar';
import CalendarNavigator from '../components/calendarNavigator';


const Dashboard = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    
    const nextMonthEvent = () => {
        if(currentMonth === 11) {
            setCurrentYear(year => year + 1);
            setCurrentMonth(0);
        } else {
            setCurrentMonth(month => month + 1);
        }
    }

    const prevMonthEvent = () => {
        if(currentMonth === 0) {
            setCurrentYear(year => year - 1);
            setCurrentMonth(11);
        } else {
            setCurrentMonth(month => month - 1)
        }
    }

    return(
        <div>
            <CalendarNavigator next={nextMonthEvent} prev={prevMonthEvent} />
            <Calendar year={currentYear} month={currentMonth}/>
        </div>
    )
}

export default Dashboard;