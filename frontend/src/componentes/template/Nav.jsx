import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/acoes">
                <i className="fa fa-object-group"></i> Ação
            </Link>
            <Link to="/somatorio">
                <i className="fa fa-plus-square"></i> Relatório
            </Link>
        </nav>
    </aside>