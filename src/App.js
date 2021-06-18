import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminDashboard from './widgets/adminDashboardWidget/adminDashboard';
import NotFound from './components/UX-NotFound/NotFound';
import './assets/CSS/UXCoreCSS.css';
import './App.css';

function App() {
  return (
    <div className="dashboardWrapper">
      <Switch>
        <Route exact path='/' component={props => <AdminDashboard {...props} />} />
        <Route exact={true} path='*' component={() => <NotFound />} />
      </Switch>
    </div>
  );
}

export default App;
