import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../componentes/home/Home';
import AcaoCrud from '../componentes/acao/AcaoCrud';
import AcaoCalculo from '../componentes/somatorio/AcaoCalculo';

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/acoes' component={AcaoCrud} />
        <Route path='/somatorio' component={AcaoCalculo} />
        <Redirect from='*' to='/' />
    </Switch>

