import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import List from './components/List';
import './App.css';
import Category from './components/Category';
import configureStore from './store/store';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={List} />
        <Route exact path="/addcategory" component={Category} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
