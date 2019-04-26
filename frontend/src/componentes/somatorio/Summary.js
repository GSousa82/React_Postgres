import React from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import { Widget02 } from '../../containers';

export default ({ comp, vend }) => (
    <Row>
        <Col xs="12" sm="4" lg="4">
            <Widget02 header={`R$ ${comp}`} mainText="Total Ações - Compra" icon="fa fa-laptop" color="green" />
        </Col>
        <Col xs="12" sm="4" lg="4">
            <Widget02 header={`R$ ${vend}`} mainText="Total Ações - Venda" icon="fa fa-laptop" color="red" />
        </Col>
        <Col xs="12" sm="4" lg="4">
            <Widget02 header={`R$ ${comp - vend}`} mainText="Valor Consolidado" icon="fa fa-laptop" color="blue" />
        </Col>
    </Row>
)