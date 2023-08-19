import React,{useState,useEffect} from 'react'
import  './stylesheets/Home.css'

export default function Home() {
  const [Task, setTask] = useState([]);
  const[Temp,setTemp]=useState('');
  const [CompT,setCompT]=useState([]);
  const HandleSubmit = (e) => {
    e.preventDefault();
    setTask([...Task,Temp]);
    console.log(Task);
    setTemp('');

  }
  useEffect(() => {
    const data = localStorage.getItem('task');
    const compdata=localStorage.getItem('completed');
    try{
    if (data) {
      console.log(data);
      setTask(JSON.parse(data));
    }
    if(compdata){
      setCompT(JSON.parse(compdata));
    }
  }
  catch(err){
    console.log(err);
  }
  }, []);
  const HandleComplete=(task)=>{
    setCompT([...CompT,task]);
    setTask((prevTask)=>prevTask.filter((item)=>item!==task));
    
  }
  const HandleDelete=(task)=>{
    setCompT(CompT.filter((item)=>item!==task));


  }
  useEffect(()=>{
    localStorage.setItem('task',JSON.stringify(Task));

  },[Task])
  useEffect(()=>{
    localStorage.setItem('completed',JSON.stringify(CompT))
  },[CompT])
  

  return (
    <div>
      <div className="container">
    <h1>To-Do App</h1>
    <div className="input-container">
      <form onSubmit={HandleSubmit}>
      <input type="text" id="taskInput" placeholder="Add your task here..." required value={Temp} onChange={(e)=>{
        setTemp(e.target.value);
      }}/>
      <button id="addTaskBtn" type='Submit'>Add Task</button>
      </form>
    </div>
    <h2>Tasks</h2>
    <hr/>
    <ul id="taskList">
     { Task.map((item,index)=>{ return(
        <li key={index}>{item}  <button onClick={()=>HandleComplete(item)}>Completed</button></li>)
      })
    }
      
    </ul>
    <h2>Completed</h2>
    <hr/>
    <ul id="completedList">
    { CompT.map((item,index)=>{ return(
        <li key={index}>{item}  <button onClick={()=>HandleDelete(item)}>Delete</button></li>)
      })
    }
    </ul>

  </div>

      
      








    </div>
  )
}
