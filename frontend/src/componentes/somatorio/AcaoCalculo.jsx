import React, { Component } from 'react';
import Main from '../template/Main';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Summary from './Summary';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from 'reactstrap';

const headerProps = {
    icon: 'fa fa-plus-square',
    title: 'Relatório',
    subtitle: 'Resultado Financeiro'
}

export default class AcaoCalculo extends Component {
    state = {
        nome: '',
        valor: '',
        listaVenda: [],
        listaCompra: []
    }

    componentWillMount() {
        this.listaCompra();
        this.listaVenda();
    }

    
    listaCompra = () => {
        api.get('/acoes/compra')
            .then(res => {
                console.log(res)
                
                this.setState({ listaCompra: res.data.result })})
            .catch(error => toast.error('Erro ao lista de ações compradas!', { position: 'top-center', className: 'danger' }))
    }

    listaVenda = () => {
        api.get('/acoes/venda')
            .then(res => this.setState({ listaVenda: res.data.result }))
            .catch(error => toast.error('Erro ao lista ações vendidas!', { position: 'top-center', className: 'danger' }))

    }

    calculateSummary = () => {
        const sum = (t, v) => t + v;
        return {
            somaCompra: this.state.listaCompra.map(c => + c.valor || 0).reduce(sum, 0),
            somaVenda: this.state.listaVenda.map(d => + d.valor || 0).reduce(sum, 0)
        };
    }
 

    renderForm = () => {
        const { somaCompra, somaVenda } = this.calculateSummary();
        return (
            <div className="animated fadeIn">
             <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>Resumo</strong>
                            </CardHeader>
                            <CardBody>
                                <Summary comp={somaCompra} vend={somaVenda} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
            
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {/* {this.renderTable()} */}
            </Main>
        )
    }
}

