import React, { useEffect, useState } from 'react'

interface Task {
    id: number; // TODO Change this to hextring later
    title: string;
    content: string;
    hour: number
}

const HomePage = () => {

    // Define state variables and their set functions
    const [tasks, setTasks] = useState<Task[]>([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [hour, setHour] = useState(1)
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

    const handleAddTask = async (event: React.FocusEvent) => {
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

    const handleUpdateTask = async (event: React.FocusEvent) => {
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
    }
}