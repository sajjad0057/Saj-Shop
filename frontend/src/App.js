import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router,Route } from 'react-router-dom'
import './index.css'
import './App.css'
import './bootstrap.min.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreens from './screens/CartScreens'

function App() {
  return (
    
    <Router>
      
      <Header/>

      <main className="py-3">
        <Container>
        <Route path='/' exact component={HomeScreen}/>
        <Route path='/product/:id/:name' exact component={ProductScreen}/>
        <Route path='/cart/:id?' component={CartScreens}/>
        </Container>
      
      </main>

      <Footer/>
  
    </Router>
  );
}

export default App;
