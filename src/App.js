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
      categorias: [],
      categoria: null,
      produtos: []
    }

    this.loadCategorias = this.loadCategorias.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)

    this.createProduto = this.createProduto.bind(this)
    this.loadProdutos = this.loadProdutos.bind(this)
    this.loadCategoria = this.loadCategoria.bind(this)

    this.removeProduto = this.removeProduto.bind(this)
    this.readProduto = this.readProduto.bind(this)
    this.editProduto = this.editProduto.bind(this)
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

  createProduto(produto) {
    return this.props.api.createProduto(produto)
  }

  loadProdutos(categoria) {
    this.props.api.loadProdutos(categoria)
      .then((res) => {
        this.setState({
          produtos: res.data
        })
      })
  }

  loadCategoria(categoria) {
    this.props.api.readCategoria(categoria)
      .then((res) => {
        this.setState({
          categoria: res.data
        })
      })
  }

  removeProduto(produto) {
    return this.props.api.deleteProduto(produto.id)
  }

  readProduto(id) {
    return this.props.api.readProduto(id)
  }

  editProduto(produto) {
    return this.props.api.editProduto(produto)
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

                createProduto={this.createProduto}
                loadProdutos={this.loadProdutos}
                produtos={this.state.produtos}

                loadCategoria={this.loadCategoria}
                categoria={this.state.categoria}

                removeProduto={this.removeProduto}
                readProduto={this.readProduto}

                editProduto={this.editProduto}
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
