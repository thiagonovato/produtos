import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import Produtos from './Produtos'
import Sobre from './Sobre'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container'>
              <Link className="navbar-brand" to="/">Gerenciador de Produtos</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/produtos">Produtos</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sobre">Sobre</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route path='/produtos' component={Produtos} />
            <Route exact path='/sobre' component={Sobre} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
