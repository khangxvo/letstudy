import React, { useEffect, useState } from 'react'
import '../styles/HomePage.css'

interface Task {
    id: number; // TODO Change this to hextring later
    title: string;
    content: string;
    hour: number
}

const HomePage = () => {

    // Define state variables and their set functions
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: "test note 1",
            content: "bla bla note1",
            hour: 1
        },
        // Additional Note objects with id, title, and content properties
        {
            id: 2,
            title: "test note 2 ",
            content: "bla bla note2",
            hour: 1
        },
        {
            id: 3,
            title: "test note 3",
            content: "bla bla note3",
            hour: 1
        }
    ])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [hour, setHour] = useState<number | 0>(0)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    // useEffect(() => {}) //TODO: update this to get task from the backend

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task)
        setTitle(task.title)
        setContent(task.content)
        setHour(task.hour)
    }

    const handleCancel = () => {
        setSelectedTask(null)
        setTitle("")
        setContent("")
        setHour(1)
    }

    const handleAddTask = async (event: React.FormEvent) => {
        event.preventDefault()

        //TODO add function to add task to the endpoint

        const newTask: Task = { //Todo remove this later
            id: tasks.length + 1,
            title: title,
            content: content,
            hour: hour
        }

        setTasks([newTask, ...tasks])
        handleCancel()
    }

    const handleUpdateTask = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!selectedTask) {
            return
        }

        //todo add task PUT endpoint and a function here to update task on the server

        const updatedTask: Task = {
            id: selectedTask.id,
            title: title,
            content: content,
            hour: hour,
        }

        const updatedTaskList = tasks.map((task) =>
            task.id === selectedTask.id
                ? updatedTask
                : task
        )

        setTasks(updatedTaskList)
        handleCancel()
    }

    const deleteTask = async (event: React.MouseEvent, taskId: number) => {
        event.stopPropagation()

        const updatedTaskList = tasks.filter((task) => task.id !== taskId)

        setTasks(updatedTaskList)
    }

    return (
        <div className='app-container'>
            <form className='task-form'
                onSubmit={(event) => { selectedTask ? handleUpdateTask(event) : handleAddTask(event) }}>

                <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder='Title'
                    required
                />

                <textarea
                    placeholder='Content'
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                ></textarea>

                <input
                    type="number"
                    onChange={(event) => setHour(Number(event.target.value))}
                    placeholder='hour'
                    required
                />

                {
                    selectedTask ? (
                        <div className='edit-buttons'>
                            <button type='submit'>Save</button>
                            <button onClick={handleCancel}>Cancel</button>

                        </div>
                    ) : (
                        <button type='submit'>Add Task</button>
                    )
                }
            </form>

            <div className='tasks-grid'>
                {tasks.map((task) => (
                    <div className='task-item' onClick={() => handleTaskClick(task)}>
                        <div className='task-header'>
                            <button onClick={(event) => deleteTask(event, task.id)}>x</button>

                        </div>
                        <h2>{task.title}</h2>
                        <p>{task.content}</p>
                        <p>{task.hour}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage