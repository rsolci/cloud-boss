import React from 'react';

import { Router } from "@reach/router";

import { Home, Kafka, KafkaTopic } from 'components/pages';
import { PageContainer, Sidebar, Header } from 'components/layout';
import { MenuBar } from 'components/menubar'

function App() {
  return (
    <div className="mx-0 flex flex-col bg-gray-100 min-h-screen w-full">
      <Header/>
      <div className="flex bg-gray-200">
        <Sidebar>
          <MenuBar/>
        </Sidebar>
        <PageContainer>
          <Router>
            <Home path='/' />
            <Kafka path='/kafka' />
            <KafkaTopic path='/kafka/:clientId/topics/:topic' />
          </Router>
        </PageContainer>
      </div>
    </div>
  );
}

export default App;
