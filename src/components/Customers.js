import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';

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

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type' : 'application/json' },
            body: JSON.stringify(newCustomer)
        })
            .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
            .catch(err => console.error(err))
    }

    const columns = [
        { headerName: 'Firstname', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Lastname', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        
        
    ]

    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
        <div className="ag-theme-material" style={{height: '700px', width: '80%', margin: 'auto'}}>
            <AgGridReact
            
            suppressCellSelection={true}
            columnDefs={columns}
            rowData={customers}
            pagination="true"
            paginationPageSize="10"
            >
            </AgGridReact>
           
 
            </div>
            </div>

    );

}

export default Customers;