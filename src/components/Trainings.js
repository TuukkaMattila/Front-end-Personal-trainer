import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';

function Trainings(){
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then((response) => response.json())
        .then((data) => setTrainings(data.content))
        .catch((err) => console.error(err));
    }

    const columns = [

        { headerName: moment('Date').format('L') , field: 'date', sortable: true, filter: true },
        { headerName: 'Duration', field: 'duration', sortable: true, filter: true },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        
        
    ]

    return (

        <div className="ag-theme-material" style={{height: '700px', width: '70%', margin: 'auto'}}>
            <AgGridReact
            
            suppressCellSelection={true}
            columnDefs={columns}
            rowData={trainings}
            pagination="true"
            paginationPageSize="10"
            >
            </AgGridReact>
           
 
            </div>

    );

}

export default Trainings;