import React, { Component } from 'react'
import Main from '../template/Main'
import api from '../../services/api'
import { toast } from 'react-toastify'

const headerProps = {
    icon: 'fa fa-object-group',
    title: 'Ação',
    subtitle: 'Cadastro Ações'
}

const initialState = {
    id: '',
    acao: {id: '' , nome: '', valor: '', tipo: '', dt_acao: '' },
    list: []
}

export default class AcaoCrud extends Component {

    state = { ...initialState }

    componentWillMount(){
      this.listAcoes()
    }

    clear() {
        this.setState({ acao: initialState.acao })
    }

    load(acao) {
        this.setState({ acao })
    }  

    listAcoes = () => {
        api.get('/acoes')
            .then(res => this.setState({list: res.data.result }))
            .catch( error=> toast.error('Erro ao lista das ação!',{ position:'top-center', className:'danger'}))
    }   

    save() {
        const { ...acao } = this.state.acao
        let dados = {}

        if(acao.id !== '' ){
            dados = {
                id: acao.id,
                nome: acao.nome,
                valor: acao.valor,
                tipo: acao.tipo,
                dt_acao: acao.dt_acao
            }

            api.put(`/acoes/${dados.id}`, dados)
            .then(res => {
                //const list = this.getUpdatedList(res.data)
                this.setState({ acao: initialState.acao })
                this.listAcoes()
                toast.success('Dados inseridos com sucesso!',{ position:'top-center', className:'success'})
            }).catch(error => {
                //loadingService.hide();
                toast.error('Dados da ação inválida!', { position: 'top-center', className: 'danger' });                    
            })
        }else{
            dados = {
                nome: this.state.acao.nome,
                valor: this.state.acao.valor,
                tipo: this.state.acao.tipo,
                dt_acao: this.state.acao.dt_acao
            }   

            api.post('/acoes', dados)
                .then(res => { 
                    //const list = this.getUpdatedList(res.data)
                    this.setState({ acao: initialState.acao } )
                    this.listAcoes()
                    toast.success('Dados inseridos com sucesso!',{ position:'top-center', className:'success'})
                }).catch(error => {                    
                    //loadingService.hide();
                    toast.error('Dados da ação inválida!', { position: 'top-center', className: 'danger' });                    
                })                    
        }
    }

    getUpdatedList(acao, add = true) {
         const list = this.state.list.filter(item => item.id !== acao)
         if(add) list.unshift(acao)
         return list
    }

    updateField(e) {
        const dados = { ...this.state.acao }
        const acao = {
            id: dados.id,
            nome: dados.nome,
            valor: dados.valor,
            tipo: dados.tipo,
            dt_acao: dados.dt_acao
         }

         acao[e.target.name] = e.target.value
        this.setState({ acao })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <input type="hidden" name="id" 
                            value={this.state.acao.id} 
                            onChange={e => this.updateField(e)} />
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.acao.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor</label>
                            <input type="text" className="form-control"
                                name="valor"
                                value={this.state.acao.valor}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o valor..." />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Tipo</label>
                            <select name="tipo"
                                value={this.state.acao.tipo}
                                onChange={e => this.updateField(e)} className="form-control"> 
                                <option>Selecione...</option>
                                <option value="Compra">Compra</option>
                                <option value="Venda">Venda</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data</label>
                            <input type="date" className="form-control"
                                name="dt_acao"
                                value={this.state.acao.dt_acao}
                                onChange={e => this.updateField(e)}
                                placeholder="Informe a data..." />
                        </div>
                </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save()}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>

                <div className="espaco"></div>
            </div>
        )
    }
 
    remove(acao) {
        api.delete(`/acoes/` + acao.id)
            .then(res => {
                //const list = this.getUpdatedList(acao, false)
                this.listAcoes()
                toast.success('Dado excluído com sucesso!',{ position:'top-center', className:'success'})
            }).catch(error => {
                toast.error('Erro ao excluir a ação!', { position: 'top-center', className: 'danger' })
            })
    }

    renderTable() {
        return (
            <table className="table mt-6">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Tipo</th>                    
                        <th>Data da Operação</th>                    
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
   
    renderRows() {
        return this.state.list.map(acao => {
            return(
                <tr key={acao.id}>
                    <td md="auto">{acao.nome}</td>
                    <td>{acao.valor}</td>
                    <td>{acao.tipo}</td>
                    <td>{acao.dt_acao}</td>
                    <td>
                        <button className="btn btn-default"
                            onClick={() => this.load(acao)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(acao)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}            
            </Main>
        )
    }
}
