import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import List from './components/List';
import './App.css';
import Category from './components/Category';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={List} />
        <Route exact path="/addcategory" component={Category} />
      </BrowserRouter>
    </div>
  );
}

export default App;
