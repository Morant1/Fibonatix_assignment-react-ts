import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { NavBar } from './cmps/NavBar'
import Home from './pages/Home'
import { StudentDetails } from './pages/StudentDetails'


const App: React.FC = () => {
  return (
    <div className="App" style={{
      backgroundImage:
        `url(${require('../src/assets/img/background.jpg').default})`
    }}>
      <Router>
        <NavBar />
        <Switch>
          <Route component={StudentDetails} path='/:_id' />
          <Route component={Home} path='/' />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
