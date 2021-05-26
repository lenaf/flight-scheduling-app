import React from 'react';
import './App.css';
import { Layout, Spin } from 'antd';
import Scheduler from './components/Scheduler';
import TopNav from './components/TopNav';
import { useFetchAircrafts, useFetchFlights } from './hooks';



const App: React.FC = () => {
  const { aircrafts, loading: aircraftsLoading } = useFetchAircrafts();
  const { flights, loading: flightsLoading } = useFetchFlights();
  const moreAircrafts = ['1', '2', '3', '4', '5'].map(i => ({ ...aircrafts[0], id: i, }))


  return (<div className="App">
    <TopNav />
    <Layout.Content className='h-screen p-8'>{aircraftsLoading || flightsLoading ? <Spin /> :
      <Scheduler
        flights={flights.sort((a, b) => a.departuretime - b.departuretime)}
        aircrafts={moreAircrafts}
      />}
    </Layout.Content>
  </div >)
}


export default App;