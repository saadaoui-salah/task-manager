import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AllEngagements from './Pages/AllEngagements/AllEngagements';
import BuiltInEvidence from './Pages/BuiltInEvidence/BuiltInEvidence';
import CreateEngagements from './Pages/CreateEngagements/CreateEngagements';
import Evidence from './Pages/Evidence/Evidence';
import CreateTaskGroupForm from './Pages/TaskList/Forms/CreateTaskGroup'
import CreateTaskForm from './Pages/TaskList/Forms/CreateTask'
import LogIn from './Pages/LogIn/LogIn';
import TaskList from './Pages/TaskList/TaskList';
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route exact path="/login" element={<LogIn />} /> {/* done */}
          <Route path="/engagement/:id/task-list" element={<TaskList />} /> {/* done */}
          <Route path="engagement/:id/evidence" element={<Evidence />} />
          <Route path="/all-engagements" element={<AllEngagements />} /> {/* done */}
          <Route path="/create-engagements" element={<CreateEngagements />} /> {/* done */}
          <Route path="/engagement/:id/built-in-evidence" element={<BuiltInEvidence />} />
          <Route path="/engagement/:id/create-task-group" element={<CreateTaskGroupForm />} />
          <Route path="/engagement/:id/create-task" element={<CreateTaskForm />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();

/* 
task-managment-project.herokuapp.com/engagement/120/task-list
task-managment-project.herokuapp.comengagement/120/evidence
task-managment-project.herokuapp.com/all-engagements
task-managment-project.herokuapp.com/create-engagements
task-managment-project.herokuapp.com/task/120/built-in-evidence
task-managment-project.herokuapp.com/engagement/120/create-task-group
task-managment-project.herokuapp.com/engagement/120/create-task */