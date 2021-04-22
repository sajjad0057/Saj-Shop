import React from 'react'
import { Container } from 'react-bootstrap'
import './index.css'
import './App.css'
import './bootstrap.min.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <div>
      <Header/>

      <main className="py-3">
        <Container>
        <h1>My app Here -- Wellcome</h1>
        <HomeScreen/>
        </Container>
      
      </main>

      <Footer/>
  
    </div>
  );
}

export default App;
