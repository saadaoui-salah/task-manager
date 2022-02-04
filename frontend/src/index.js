import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AllEngagements from './Pages/AllEngagements/AllEngagements';
import BuiltInEvidence from './Pages/BuiltInEvidence/BuiltInEvidence';
import CreateEngagements from './Pages/CreateEngagements/CreateEngagements';
import Evidence from './Pages/Evidence/Evidence';
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
          <Route path="/task-list" element={<TaskList />} /> {/* done */}
          <Route path="/all-engagements" element={<AllEngagements />} /> {/* done */}
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/create-engagements" element={<CreateEngagements />} />
          <Route path="/built-in-evidence" element={<BuiltInEvidence />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();