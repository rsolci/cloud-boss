import React from 'react';

import { Router } from "@reach/router";

import { Home, Kafka, KafkaTopic, KafkaConnect } from 'components/pages';
import { PageContainer, Sidebar, Header } from 'components/layout';
import { MenuBar } from 'components/menubar'

const RoutedApp = ({children}) => {
  return (
    <div className="flex flex-grow overflow-hidden">
        <Sidebar>
          <MenuBar/>
        </Sidebar>
        <PageContainer>
          {children}
        </PageContainer>
      </div>
  )
}

function App() {
  return (
    <div className="mx-0 flex flex-col bg-gray-100 min-h-screen w-full h-screen">
      <Header/>
      <Router className="flex flex-col flex-grow overflow-hidden">
        <RoutedApp path='/'>
          <Home path='/' />
          <Kafka path='kafka'>
            <KafkaConnect path='/' />
            <KafkaTopic path=':clientId/topics/:topic' />
          </Kafka>
        </RoutedApp>
      </Router>
    </div>
  );
}

export default App;
