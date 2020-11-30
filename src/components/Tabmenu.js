import React, { useState } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Customers from './Customers';
import Trainings from './Trainings';

function Tabmenu(){

    const[value, setValue] = useState('Home');
    const handleChange = (event, value) => {
        setValue(value);
    };


    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                <Tab value="Customers" label="Customers" />
                <Tab value="Trainings" label="Trainings" />
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
            {value === "Home" && (
                <div>
                    <h2>Welcome to Personal trainer!</h2>
                </div>
            )}

                
        </div>
    );
}

export default Tabmenu;