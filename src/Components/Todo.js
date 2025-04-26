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

// Snack Bar //
import { useToast } from '../todosContext/SnackBarContext'


// Dialog//
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert';
// Dialog//



export default function Todo({ todo, HandelDeleteFunction, handeleDeleteFunction }) {

    // Snack Bar //

    const { ShowHideSnack } = useToast()

    // === Snack Bar === //

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
        localStorage.setItem('Tasks', JSON.stringify(Updated))

        if (todo.isCompleted === true) {
            ShowHideSnack('Task finished successfully.')

        } else {
            ShowHideSnack('Task not finished successfully.')

        }
    }

    let handelDelete = () => {
        HandelDeleteFunction(todo)
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
        handeleDeleteFunction(todo)
    }

    /* === Handles Click === */
    /* Delete Modal State*/

    const [open, setOpen] = useState(false);

    /* === Delete Modal State === */
    /* Edit Modal State*/
    const [openEdit, setOpenEdit] = useState(false);
    /* === Edit Modal State === */
    return (
        <>


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