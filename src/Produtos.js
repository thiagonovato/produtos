import React, { Component } from 'react'
import {
    Route,
    Link
} from 'react-router-dom'
import axios from 'axios'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'

class Produtos extends Component {
    constructor(props) {
        super(props)

        this.renderCategoria = this.renderCategoria.bind(this)
        this.handleNewCategoria = this.handleNewCategoria.bind(this)
        this.loadCategorias = this.loadCategorias.bind(this)

        this.state = {
            categorias: []
        }
    }

    loadCategorias() {
        axios
            .get('http://localhost:3001/categorias')
            .then(res => {
                this.setState({
                    categorias: res.data
                })
            })
    }

    componentDidMount() {
        this.loadCategorias()
    }

    removeCategoria(categoria) {
        axios
            .delete('http://localhost:3001/categorias/' + categoria.id)
            .then(res => {
                this.loadCategorias()
            })
    }

    renderCategoria(cat) {
        return (
            <li key={cat.id}>
                <button onClick={() => this.removeCategoria(cat)} className='btn btn-sm'>X</button>
                <Link to={`/produtos/categoria/${cat.id}`}> {cat.categoria}</Link >
            </li>
        )
    }

    handleNewCategoria(key) {
        if (key.keyCode === 13) {
            axios
                .post('http://localhost:3001/categorias', {
                    categoria: this.refs.categoria.value
                })
                .then(res => {
                    this.refs.categoria.value = ''
                    this.loadCategorias()
                })
        }
    }

    render() {
        const { match } = this.props
        const { categorias } = this.state
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul>
                        {categorias.map(this.renderCategoria)}
                    </ul>
                    <input
                        onKeyUp={this.handleNewCategoria}
                        type='text'
                        className="form-control"
                        ref='categoria'
                        placeholder='Nova categoria'
                    />
                </div>
                <div className='col-md-10'>
                    <h3>Produtos</h3>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url + '/categoria/:catId'} component={Categoria} />
                </div>
            </div>
        )
    }
}

export default Produtos