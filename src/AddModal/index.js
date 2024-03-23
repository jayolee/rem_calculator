import {useContext, useState} from "react" 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import { valueContext } from "../ValueContext";

export default function AddModal({isOpen, handleClose}) {
    const [error, setError] = useState(undefined)
    const {values, addValue,  addedValues} = useContext(valueContext)

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const newSize = Number(formJson.newSize)

            if(values?.includes(newSize)){
                setError("Value already exist")
                return
            }
            addValue(newSize)
            addedValues.current = [...addedValues.current, newSize]
            handleClose();
          },
        }}
      >
        <DialogTitle>Add New</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            error={!!error}
            helperText={error}
            name="newSize"
            label="New Size (px)"
            type="number"
            variant="outlined"
            InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>
              }}
            style={{margin: "1rem 0"}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}