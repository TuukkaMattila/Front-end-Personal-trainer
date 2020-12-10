import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import { Button, Snackbar } from '@material-ui/core';

function Trainings(){
    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = useState('');
    const gridRef = useRef();
    const [open, setOpen] = React.useState(false);
    

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then((response) => response.json())
        .then((data) => setTrainings(data))
        .catch((err) => console.error(err));
    }

    

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure you want to delete this workout?'))
        console.log(id)
        
        fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {
            method: 'DELETE',
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}))
        .then(_ => setMsg('Workout was deleted'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    const columns = [
        
        { headerName: 'Date', field: 'date', cellRenderer: (data) => { return moment(data.value).format("MM.DD.YYYY HH:mm")}, sortable: true, filter: true },
        { headerName: 'Duration', field: 'duration', sortable: true, filter: true },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        { headerName: 'Customer', field: 'customer.firstname', sortable: true, filter: true },
        { headerName: '', field: 'customer.lastname', sortable: true, filter: true },
        
        {
            headerName: '',
            field: 'id',
            width: 90,
            cellRendererFramework: params =>
            
            <Button color="secondary" size="small" onClick={() => deleteTraining(params.value)}>
                Delete
            </Button>
        },
    ]

    return (

        <div className="ag-theme-material" style={{height: '700px', width: '70%', margin: 'auto'}}>
            <AgGridReact
            
            ref={gridRef}
            suppressCellSelection={true}
            columnDefs={columns}
            rowData={trainings}
            pagination="true"
            paginationPageSize="10"
            onGridReady={ params => {
                gridRef.current = params.api
                }}
            >
            </AgGridReact>
           
            <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={closeSnackbar}
            message={msg}
            />
 
            </div>

    );

}

export default Trainings;