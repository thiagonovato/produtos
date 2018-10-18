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
  constructor(props) {
    super(props)
    this.state = {
      categorias: []
    }
    this.loadCategorias = this.loadCategorias.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
  }

  loadCategorias() {
    this.props.api.loadCategorias()
      .then(res => {
        this.setState({
          categorias: res.data
        })
      })
  }

  removeCategoria(categoria) {
    this.props.api.deleteCategorias(categoria.id)
      .then(res => {
        this.loadCategorias()
      })
  }

  createCategoria(categoria) {
    this.props.api.createCategoria(categoria)
      .then(res => {
        this.loadCategorias()
      })
  }

  editCategoria(categoria) {
    this.props.api.editCategoria(categoria)
      .then(res => {
        this.loadCategorias()
      })
  }

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
            <Route path='/produtos' render={(props) => {
              return (<Produtos {...props}
                loadCategorias={this.loadCategorias}
                removeCategoria={this.removeCategoria}
                createCategoria={this.createCategoria}
                editCategoria={this.editCategoria}
                categorias={this.state.categorias}
              />)
            }
            } />
            <Route exact path='/sobre' component={Sobre} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
