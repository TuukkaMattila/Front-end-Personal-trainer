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
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then((response) => response.json())
        .then((data) => setTrainings(data))
        .catch((err) => console.error(err));
    }

    const columns = [
        
        { headerName: 'Date', field: 'date', cellRenderer: (data) => { return moment(data.value).format("MM.DD.YYYY HH:mm")}, sortable: true, filter: true },
        { headerName: 'Duration', field: 'duration', sortable: true, filter: true },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        { headerName: 'Customer', field: 'customer.firstname', sortable: true, filter: true },
        { headerName: '', field: 'customer.lastname', sortable: true, filter: true },
        
        
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