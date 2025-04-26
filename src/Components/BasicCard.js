import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { v4 as uuidv4 } from 'uuid';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useContext, useState, useEffect, useMemo } from 'react';
import { TodoContext, InputsContext } from '../todosContext/TodoContext';

// Snack Bar //
import { useToast } from '../todosContext/SnackBarContext'

// Components
import Todo from './Todo';

// Dialog//
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert';
// Dialog//



const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
export default function BasicCard() {


    // Snack Bar //

    const { ShowHideSnack } = useToast()

    useEffect(() => {
        console.log(ShowHideSnack)
    }, [])
    // === Snack Bar === //




    //Dialog State// 


    const [dialogtodo, setDialogtodo] = useState(null)

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    {/* Edit Modal State*/ }
    const [openEdit, setOpenEdit] = useState(false);
    const [text, setText] = useState({ heading: '', body: '', date: '' });

    {/* === Edit Modal State === */ }

    // === Dialog State === // 



    // Handelers//


    // Edit //
    let handelEditOpen = (todo) => {

        setDialogtodo(todo)
        setText({ heading: todo.heading, body: todo.body, date: todo.date });
        setOpenEdit(true)
    }

    let UpdateTask = () => {

        const updatedTodos = todos.map((t) => {
            if (t.id === dialogtodo.id) {
                return { ...t, heading: text.heading, body: text.body, date: text.date };
            }
            return t;
        });
        setTodos(updatedTodos)
        setOpenEdit(false)
        localStorage.setItem('Tasks', JSON.stringify(updatedTodos))


        ShowHideSnack('Task updated successfully.')
    }
    // === Edit  === // 

    // Delete // 
    let handelDelete = (todo) => {
        setDialogtodo(todo)
        handleClickOpen()



    }
    let DeleteTask = () => {

        const DeletTask = todos.filter(task => (task.id != dialogtodo.id))

        setTodos(DeletTask)
        setOpen(false) // ✅ اقفل الـ Dialog
        localStorage.setItem('Tasks', JSON.stringify(DeletTask))

        ShowHideSnack(' Task deleted successfully.')
    }

    const handleClose = () => {
        setOpen(false);
    };

    // === Delete === // 

    // === Handelers === //


    const { inputTitle, setinputTitle } = useContext(InputsContext)
    const { todos, setTodos } = useContext(TodoContext)
    const [error, setError] = useState(false)
    const [alignment, setAlignment] = useState('All');

    // Handel Change For Toggele Button //
    const handleChange = (event) => {
        setAlignment(event.target.value);
    };
    // Handel Change For Toggele Button //
    {/* Functions  For Inputs and tasks */ }
    let handelChangeInput = (e) => {
        setinputTitle(e.target.value)
    }
    //Add New Task//
    let handelClickAdd = () => {

        if (inputTitle != '') {
            const newTask = {
                id: uuidv4(),
                heading: inputTitle,
                body: '',
                date: new Date().toISOString().split("T")[0],
                isCompleted: false,
            }

            const updatedTodos = [...todos, newTask]
            setTodos(updatedTodos)
            setinputTitle('')

            localStorage.setItem('Tasks', JSON.stringify(updatedTodos))
            ShowHideSnack('Task added successfully.')

        } else {
            setError(true)
            window.scrollTo({
                top: 5,
                behavior: 'smooth' // لو عايز الحركة تبقى ناعمة
            });
            setTimeout(() => {
                setError(false)

            }, 4000);
        }


    }
    // === Add New Task === //

    {/* Functions For Inputs and tasks */ }
    //  === Filteration Buttons === //



    const FinshedTasks = useMemo(() => {


        return todos.filter((task) => { return task.isCompleted; })

    }, [todos])

    const UnfinishedTasks = useMemo(() => {
        return todos.filter((task) => { return !task.isCompleted; })
    }, [todos])

    let TodosRendered;

    if (alignment == 'Finished') {

        TodosRendered = FinshedTasks;

    } else if (alignment == 'Unfinishedios') {
        TodosRendered = UnfinishedTasks;

    } else {
        TodosRendered = todos;
    }
    //  === Filteration Buttons === //
    let task = TodosRendered.map((SingleTask) => {
        return <Todo key={SingleTask.id} todo={SingleTask} HandelDeleteFunction={handelDelete} handeleDeleteFunction={handelEditOpen} ></Todo>
    })
    useEffect(() => {
        const TodosLocalStorage = JSON.parse(localStorage.getItem('Tasks') || '[]')
        setTodos(TodosLocalStorage)
    }, [])
    return (

        <>
            {/*  Edit Modal  */}
            <Dialog
                open={openEdit}
                onClose={() => { setOpenEdit(false) }}

            >
                <DialogTitle>Edit the task</DialogTitle>
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
            <Card sx={{ minWidth: 300, paddingTop: 2, paddingBottom: 2, maxHeight: '80vh', overflow: 'auto', }}>
                <CardContent>
                    <Typography variant="h2" style={{ fontWeight: 'bold', textAlign: 'center' }} >
                        My Tasks
                    </Typography>
                    <Divider variant="middle" sx={{ marginBottom: 3 }} />
                    {/* Filter Buttons */}
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="All">All</ToggleButton>
                        <ToggleButton value="Finished">Finshed</ToggleButton>
                        <ToggleButton value="Unfinishedios">Unfinished</ToggleButton>
                    </ToggleButtonGroup>
                    {/* ===Filter Buttons=== */}
                    {/* All Todos */}
                    {task}
                    {/* === All ToDos === */}
                </CardContent>
                {/* Input + Add Button */}
                <Grid container spacing={2}>
                    <Grid size={7}>
                        <TextField
                            id="outlined-multiline-flexible"
                            maxRows={4}
                            sx={{ width: '100%', marginLeft: '20px' }}
                            value={inputTitle}
                            onChange={handelChangeInput}
                            label="Title of task"

                        />
                    </Grid>
                    {/* Actions Buttons */}
                    <Grid size={5} display="flex" justifyContent="space-around" alignItems="center">
                        <Button onClick={handelClickAdd} sx={{ backgroundColor: 'secondary.main', color: 'black', width: '80%', height: '100%' }} size="large" variant="contained">Add Task</Button>
                    </Grid>
                    {error && <Alert style={{ width: '100%' }} severity="error"> Please Enter The Task...  </Alert>}
                </Grid>

            </Card>
        </>

    );
}