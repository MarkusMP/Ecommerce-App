import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header, Signup, Login } from './components'
import { ContextProvider } from './Contexts/Context'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import './App.css';


function App() {
  return (
    <ContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Shop} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </Router>
    </ContextProvider>
  );
}

export default App;
