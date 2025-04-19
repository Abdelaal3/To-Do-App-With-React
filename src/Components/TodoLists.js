import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BasicCard from './BasicCard';
import { TodoContext, InputsContext } from '../todosContext/TodoContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
let tasks = [
    {
        id: uuidv4(),
        heading: 'First Task',
        body: 'I need to Finished the First Task',
        isCompleted: false,
    },
    {
        id: uuidv4(),
        heading: 'Second Task',
        body: 'This is Second Task',
        isCompleted: false,
        date: new Date().toLocaleDateString(),
    },
    {
        id: uuidv4(),
        heading: 'Third Task',
        body: 'This is Third Task',
        isCompleted: false,
    },
]
export default function TodoLists() {
    const [inputTitle, setinputTitle] = useState('')
    const [todos, setTodos] = useState([])
    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed maxWidth="sm" style={{ color: 'red' }} >
                <TodoContext.Provider value={{ todos, setTodos }}>
                    <InputsContext.Provider value={{ inputTitle, setinputTitle }}>
                        <BasicCard />
                    </InputsContext.Provider>
                </TodoContext.Provider>
            </Container>
        </React.Fragment>
    );
}