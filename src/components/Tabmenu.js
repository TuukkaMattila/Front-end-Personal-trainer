import React, { useState } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Customers from './Customers';
import Trainings from './Trainings';
import Calendar from './Calendar';

function Tabmenu(){

    const[value, setValue] = useState('Customers');
    const handleChange = (event, value) => {
        setValue(value);
    };


    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                <Tab value="Customers" label="Customers" />
                <Tab value="Trainings" label="Trainings" />
                <Tab value="Calendar" label="Calendar" />
                </Tabs>
            </AppBar>
            {value === "Customers" && (
                <div>
                    <Customers />
                </div>
            )}
            {value === "Trainings" && (
                <div>
                    <Trainings />
                </div>
            )}

            {value === "Calendar" && (
                <div>
                    <Calendar />
                </div>
            )}
           

                
        </div>
    );
}

export default Tabmenu;