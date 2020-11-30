import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customers(){
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then((response) => response.json())
        .then((data) => setCustomers(data.content))
        .catch((err) => console.error(err));
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

    );

}

export default Customers;