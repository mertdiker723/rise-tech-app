import React, { createContext, useState, useEffect, useContext } from "react";
import { v1 as uuid } from "uuid";

export const JobContext = createContext();


export function useJobStore() {
    return useContext(JobContext);
}

const JobContextProvider = (props) => {
    const initialState = JSON.parse(localStorage.getItem("job")) || [];

    const [jobs, setJobs] = useState(initialState);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        localStorage.setItem('job', JSON.stringify(jobs))
    }, [jobs])

    const addJob = (data) => {
        const { jobName, priority } = data;
        setJobs([...jobs, { jobName, priority, id: uuid() }]);
    }

    const removeJob = id => {
        setJobs(jobs.filter(job => job.id !== id));
    }

    const findItem = (id) => {
        const item = jobs.find(job => job.id === id);
        setEditItem(item);
    }
    const editJob = ({ jobName, priority, id }) => {
        const newJobs = jobs.map(job => job.id === id ? { jobName, priority, id } : job);

        setJobs(newJobs);
        setEditItem(null);
    }
    return (
        <JobContext.Provider value={{ jobs, addJob, removeJob, findItem, editJob, editItem, setEditItem }}>
            {props.children}
        </JobContext.Provider>
    )
}

export default JobContextProvider;