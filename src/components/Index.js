import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Index(){

    const [links, setLinks] = useState([]);

    useEffect(() => {
        getLinks();
    }, [])

    const getLinks = () => {
        fetch('https://customerrest.herokuapp.com/api')
        .then((Response) => Response.json())
        .then((data) => setLinks(data.links))
        .catch((err) => console.error(err));
    }

    const columns = [
        { headerName: 'Trainings', field: 'trainings', sortable: true, filter: true },
        { headerName: 'Customers', field: 'customers', sortable: true, filter: true },
        { headerName: 'Profile', field: 'profile', sortable: true, filter: true },
    

    ]



    return (
        <div className="ag-theme-material" style={{height: '700px', width: '70%', margin: 'auto'}}>
            <AgGridReact
            suppressCellSelection={true}
            columnDefs={columns}
            rowData={links}
            pagination="true"
            paginationPageSize="10"
            >
            </AgGridReact>
           
        </div>
    );



}
export default Index;