import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackBarContext } from '../todosContext/SnackBarContext';
import { useContext } from 'react';

export default function SnackBar({ open, message }) {



    return (
        <div>
            {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
            <Snackbar open={open} autoHideDuration={6000} >
                <Alert

                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}