import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useContext, useState } from 'react';
import { TodoContext, InputsContext } from '../todosContext/TodoContext';
import TextField from '@mui/material/TextField';
// Dialog//
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert';
// Dialog//
export default function Todo({ todo }) {
    const [showAlert, setShowAlert] = useState(false)
    const { todos, setTodos } = useContext(TodoContext)
    const { inputTitle, setinputTitle } = useContext(InputsContext)
    const [text, setText] = useState({ heading: '', body: '' });
    {/* Handles Click */ }
    let handleCheckClick = () => {
        const Updated = todos.map((t) => {
            if (t.id == todo.id) {
                t.isCompleted = !t.isCompleted
            }
            return t
        })
        setTodos(Updated)
        console.log(todos)
        localStorage.setItem('Tasks', JSON.stringify(Updated))
    }

    let handelDelete = () => {
        handleClickOpen()
    }
    let DeleteTask = () => {
        const DeletTask = todos.filter(task => (task.id != todo.id))

        setTodos(DeletTask)
        setShowAlert(true)
        setOpen(false) // ✅ اقفل الـ Dialog

        localStorage.setItem('Tasks', JSON.stringify(DeletTask))


        setTimeout(() => {
            setShowAlert(false)
        }, 8000)
    }
    let handelEdit = () => {
        setText({ heading: todo.heading, body: todo.body });
        setOpenEdit(true)
        console.log(text.heading);
    }
    let UpdateTask = () => {
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                return { ...t, heading: text.heading, body: text.body, date: text.date };
            }
            return t;
        });
        setTodos(updatedTodos)
        setOpenEdit(false)
        localStorage.setItem('Tasks', JSON.stringify(updatedTodos))
    }
    {/* === Handles Click === */ }
    {/* Delete Modal State*/ }
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    {/* === Delete Modal State === */ }
    {/* Edit Modal State*/ }
    const [openEdit, setOpenEdit] = useState(false);
    {/* === Edit Modal State === */ }
    return (
        <>
            {/* Delete Modal */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do You Want to delete this Task?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action is irreversible.

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={handleClose}>Disagree</Button>
                    <Button variant='contained' color='success' onClick={DeleteTask} autoFocus> Agree</Button>
                </DialogActions>
            </Dialog>
            {/* === Delete Modal === */}
            {/*  Edit Modal  */}
            <Dialog
                open={openEdit}
                onClose={() => { setOpenEdit(false) }}

            >
                <DialogTitle>Edit the task of: " {todo.heading} "</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <TextField
                        style={{ width: '400px' }}
                        value={text.heading}
                        onChange={(e) => {
                            setText({ ...text, heading: e.target.value })
                        }}
                        label="The Title"
                        fullWidth
                        variant="standard"
                        margin="dense"
                        autoFocus
                        type="text"
                    />
                    <TextField
                        style={{ width: '400px' }}
                        value={text.body}
                        onChange={(e) => {
                            setText({ ...text, body: e.target.value })
                        }}
                        label="Description"
                        fullWidth
                        variant="standard"
                        margin="dense"
                        autoFocus
                        type="text"
                    />

                    <TextField
                        style={{ width: '400px' }}
                        value={text.date}
                        onChange={(e) => {
                            setText({ ...text, date: e.target.value })
                        }}
                        label="Date"
                        fullWidth
                        variant="standard"

                        autoFocus
                        type="date"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='success' onClick={UpdateTask} type="submit">Update</Button>
                    <Button variant='contained' color='error' onClick={() => { setOpenEdit(false) }}>Cancel</Button>
                </DialogActions>
            </Dialog>
            {/* === Edit Modal === */}
            < Card className='TodoCard' sx={{ minWidth: 275, backgroundColor: '#b1d895f5', marginTop: 3, marginBottom: 3 }
            }>
                <CardContent>

                    <Grid container spacing={2}>
                        <Grid size={8}  >
                            <Typography variant="h5" sx={{ textAlign: 'left' }} >
                                {todo.heading}
                            </Typography>
                            <p style={{ color: '#525252d9', fontSize: '15px', margin: ' 0px 5px 14px 5px' }}>{todo.date}</p>
                            <Typography variant="body1" sx={{ textAlign: 'left' }} >
                                {todo.body}

                            </Typography>
                        </Grid>
                        {/* Actions Buttons */}
                        <Grid size={4} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center">
                            {/* Check Icon Button */}
                            <IconButton onClick={handleCheckClick} className='iconsButton' aria-label="finish"
                                style={{
                                    background: todo.isCompleted == true ? 'green' : 'white',
                                    color: todo.isCompleted == true ? 'white' : '#2b5f05f5',
                                    border: ' solid rgba(65, 148, 6, 0.96) 3px'
                                }}>
                                <CheckIcon />
                            </IconButton>
                            {/* ==== Check Icon Button === */}
                            {/* Edit Icon Button */}
                            <IconButton onClick={handelEdit} className='iconsButton' aria-label="edit"
                                style={{
                                    background: 'white',
                                    color: 'rgba(4, 37, 129, 0.96)',
                                    border: ' solid rgba(4, 37, 129, 0.96) 3px'
                                }}>
                                <ModeEditIcon />
                            </IconButton>
                            {/* === Edit Icon Button === */}
                            {/* Delete Icon Button */}
                            <IconButton onClick={handelDelete} className='iconsButton' aria-label="delete"
                                style={{
                                    background: 'white', color: 'rgba(197, 4, 36, 0.96) ',
                                    border: ' solid rgba(197, 4, 36, 0.96) 3px'
                                }}>
                                <DeleteIcon />
                            </IconButton>
                            {/* === Delete Icon Button === */}
                        </Grid>
                        {/* === Actions Buttons === */}
                    </Grid>
                </CardContent>
                {/* Alert */}
                {
                    showAlert && (
                        <Alert severity="success" sx={{ marginBottom: 2 }}>
                            Task deleted successfully!
                        </Alert>
                    )
                }

                {/* === Alert === */}
            </Card >
        </>
    )
}