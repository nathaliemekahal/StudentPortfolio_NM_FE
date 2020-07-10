import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import List from './components/List'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Details from './components/Details';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={List}/>
        <Route path="/details/:id" exact component={Details}/>
      </Router>
    
    </div>
  );
}

export default App;
