import React from 'react';

import { Router } from "@reach/router";

import './App.css';
import { Home, Kafka, KafkaTopic } from 'components/pages';
import { PageContainer, Sidebar, Header } from 'components/layout';
import { LinkButton } from 'components/buttons';

function App() {
  return (
    <div className="App">
      <Header/>
        <Sidebar>
          <LinkButton to="kafka">kafka</LinkButton>
        </Sidebar>
        <PageContainer>
          <Router>
            <Home path='/' />
            <Kafka path='/kafka' />
            <KafkaTopic path='/kafka/:clientId/topics/:topic' />
          </Router>
        </PageContainer>
    </div>
  );
}

export default App;
