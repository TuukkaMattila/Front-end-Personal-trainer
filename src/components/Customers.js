import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { Button, Snackbar } from '@material-ui/core';
import NewTraining from './NewTraining';


function Customers(){
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('');
    const gridRef = useRef();
        

    useEffect(() => {
        getCustomers();
    }, [])



    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then((response) => response.json())
        .then((data) => setCustomers(data.content))
        .catch((err) => console.error(err));
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure you want to delete this customer?'))
        fetch(link[0].href, {
            method: 'DELETE',
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
        .then(_ => setMsg('Customer was deleted'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type' : 'application/json' },
            body: JSON.stringify(newCustomer)

        })
            .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
            .catch(err => console.error(err))
    }

    const newTraining = (newTraining) => {
        console.log(newTraining)
        
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {'Content-type' : 'application/json' },
            body: JSON.stringify(newTraining)
            
        })
            .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
            .catch(err => console.error(err))
    }

    const editCustomer = (link, customer) => {
        fetch(link[0].href, {
            method: 'PUT',
            headers: {'Content-type' : 'application/json' },
            body: JSON.stringify(customer)
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
        .then(_ => setMsg('Customer has been edited'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }

    

    const closeSnackbar = () => {
        setOpen(false);
    }

    const columns = [
        { headerName: 'Firstname', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Lastname', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },

        {
            headerName: '',
            field: 'links',
            width: 90,
            cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} params={params} />

        },


        {
            headerName: '',
            field: 'links',
            width: 90,
            cellRendererFramework: params =>
            <Button color="secondary" size="small" onClick={() => deleteCustomer(params.value)}>
                Delete
            </Button>
        },

        {
            headerName: '',
            field: 'links',
            width: 90,
            cellRendererFramework: params =>
            <NewTraining newTraining={newTraining} params={params.value} />
        }
        
    ]

    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
        <div className="ag-theme-material" style={{height: '700px', width: '90%', margin: 'auto'}}>
            <AgGridReact
            ref={gridRef}
            suppressCellSelection={true}
            columnDefs={columns}
            rowData={customers}
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
            </div>

    );

}

export default Customers;