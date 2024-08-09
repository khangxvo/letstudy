import React, { useEffect, useState } from 'react'

interface Task {
    id: number; // TODO Change this to hextring later
    title: string;
    content: string;
    hour: number
}

const HomePage = () => {
    const [tasks, setTasks] = useState<Task[]>([])

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

}