import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function AddCustomer(props){

    const [customer, setCustomer] = useState({firstname:'', lastname:'', streetaddress:'', postcode:'', city:'', email:'', phone:''})
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };

    const handleSave = () => {
        props.addCustomer(customer);
        handleClose();
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }
    
    return(
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New customer</DialogTitle>
      <DialogContent>
      <TextField
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            label="firstname"
            fullWidth
          />

<TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            label="lastname"
            fullWidth
          />

<TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            label="streetaddress"
            fullWidth
          />

<TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            label="postcode"
            fullWidth
          />

<TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={inputChanged}
            label="city"
            fullWidth
          />

<TextField
            margin="dense"
            name="email"
            value={customer.email}
            onChange={inputChanged}
            label="email"
            fullWidth
          />

<TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            label="phone"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>

      </Dialog>
        </div>
    );
}

export default AddCustomer;