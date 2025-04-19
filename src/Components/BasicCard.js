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
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useContext, useState, useEffect } from 'react';
import { TodoContext, InputsContext } from '../todosContext/TodoContext';
// Components
import Todo from './Todo';
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
export default function BasicCard() {

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
                date: new Date().toLocaleDateString(),
                isCompleted: false,
            }

            const updatedTodos = [...todos, newTask]
            setTodos(updatedTodos)
            setinputTitle('')

            localStorage.setItem('Tasks', JSON.stringify(updatedTodos))
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
    const FinshedTasks = todos.filter((task) => { return task.isCompleted; })
    const UnfinishedTasks = todos.filter((task) => { return !task.isCompleted; })
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
        return <Todo key={SingleTask.id} todo={SingleTask}  ></Todo>
    })
    useEffect(() => {
        const TodosLocalStorage = JSON.parse(localStorage.getItem('Tasks') || '[]')
        setTodos(TodosLocalStorage)
    }, [])
    return (
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
    );
}