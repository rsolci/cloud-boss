import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';
import { Home, Kafka } from 'components/pages';
import { PageContainer, Sidebar, Header } from 'components/layout';
import { LinkButton } from 'components/buttons';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Sidebar>
          <LinkButton to="kafka">kafka</LinkButton>
        </Sidebar>
        <PageContainer>
          <Switch>
            <Route path="/kafka">
              <Kafka/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </PageContainer>
      </Router>
    </div>
  );
}

export default App;
