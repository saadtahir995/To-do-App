import React, { useState, useEffect } from 'react';
import {MdOutlineDarkMode,MdOutlineLightMode} from 'react-icons/md';
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  isEnabled as isDarkReaderEnabled
} from 'darkreader';
import './stylesheets/Home.css';

export default function Home() {
  const [Task, setTask] = useState([]);
  const [Temp, setTemp] = useState('');
  const [CompT, setCompT] = useState([]);
  const[isDarkMode,setDarkMode]=useState(isDarkReaderEnabled());

  const HandleSubmit = (e) => {
    e.preventDefault();
    setTask([...Task, Temp]);
    setTemp('');
  }

  useEffect(() => {
    const data = localStorage.getItem('task');
    const compdata = localStorage.getItem('completed');
    try {
      if (data) {
        setTask(JSON.parse(data));
      }
      if (compdata) {
        setCompT(JSON.parse(compdata));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const HandleComplete = (task) => {
    setCompT([...CompT, task]);
    setTask((prevTask) => prevTask.filter((item) => item !== task));
  }

  const HandleDelete = (task) => {
    setCompT(CompT.filter((item) => item !== task));
  }

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(Task));
  }, [Task]);

  useEffect(() => {
    localStorage.setItem('completed', JSON.stringify(CompT));
  }, [CompT]);

  return (
    <div className="app-container">
      <div className="container" style={{width:'95%'}}>
      {isDarkMode ? <MdOutlineLightMode size={35} className="dark-mode-icon" onClick={() =>{ disableDarkMode()
      setDarkMode(!isDarkMode)}} /> : <MdOutlineDarkMode size={35} className="dark-mode-icon" onClick={() =>{ enableDarkMode({
    brightness: 100,
    contrast: 90,
    sepia: 10,})
    setDarkMode(!isDarkMode)
    }} />}
        <h1 className="app-title">To-Do App</h1>
        <div className="input-container">
          <form onSubmit={HandleSubmit}>
            <input
              type="text"
              id="taskInput"
              placeholder="Add your task here..."
              required
              value={Temp}
              onChange={(e) => {
                setTemp(e.target.value);
              }}
            />
            <button id="addTaskBtn" type="Submit">Add Task</button>
          </form>
        </div>
        <div className="task-list-container">
          <div className="task-list">
            <h2>Tasks</h2>
            <hr />
            <ul id="taskList">
              {Task.map((item, index) => (
                <li key={index}>
                  {item}
                  <button className="complete-btn" onClick={() => HandleComplete(item)}>Done</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="completed-list">
            <h2>Completed</h2>
            <hr />
            <ul id="completedList">
              {CompT.map((item, index) => (
                <li key={index}>
                  {item}
                  <button className="delete-btn" onClick={() => HandleDelete(item)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
