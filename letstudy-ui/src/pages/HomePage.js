import { useEffect, useState } from 'react'

const HomePage = () => {

    /**
     * Define state variables and their set functions
     */
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState("")
    const [hour, setHour] = useState(1)
    const [selectedTask, setSelectedTask] = useState(null)


    // useEffect() // TODO add this feature later

    const CancelTask = () => {
        // reset variables to default states
        setTitle("")
        setContent("")
        setHour(1)
        setSelectedTask(null)
    }

    const handleTaskClick = (task) => {
        setSelectedTask(task)
        setTitle(task.title)
        setContent(task.content)
        setHour(task.hour)
    }

    const addTask = async (event) => {
        event.prevenDefault()

        const newTask = {
            id: tasks.length + 1,
            title: title,
            content: content,
            hour: hour
        }

        setTasks([newTask, ...tasks])
        CancelTask()
    }

    const updateTask = async (event) => {
        event.prevenDefault()

        if (!selectedTask) {
            return
        }

        const newTask = {
            id: selectedTask.id,
            title: title,
            content: content,
            hour: hour
        }

        const newTaskList = tasks.map((task) => {
            task.id === selectedTask.id ? newTask : task
        })

        setTasks(newTaskList)
        CancelTask()
        setSelectedTask(null)
    }

    const deleteTask = (event, taskId) => {
        event.stopPropagation()

        const newTaskList = tasks.filter((task) => task.id !== taskId)

        setTasks(newTaskList)
    }

    return (
        <div className='app-container'>
            <form className='note-form' onSubmit={(event) => { selectedTask ? updateTask(event) : addTask(event) }}>



            </form>
        </div>
    )

}
