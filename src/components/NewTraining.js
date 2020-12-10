import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function NewTraining(props){

    const [training, setTraining] = useState({date: '', duration: '', activity: ''})
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log(props)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleSave = () => {
        console.log(props)
          const newTraining = {
            ...training, date: new Date(training.date),
            customer: props.params[1].href,
          };
          props.newTraining(newTraining);
          handleClose();
      }

      const inputChanged = (event) => {
          setTraining({...training, [event.target.name]: event.target.value});
      }

    return(
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add training
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>

        <DialogContent>

        <TextField
            margin="dense"
            name="date"
            value={training.date}
            onChange={inputChanged}
            label="date"
            fullWidth
          />

<TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="duration"
            fullWidth
          />

<TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="activity"
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

export default NewTraining;