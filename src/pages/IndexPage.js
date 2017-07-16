/**
 * 一个页面 === 一种布局
 * 
 * 这个页面里会放置不同的组件
 */

import React from 'react'

import {Navbar, Nav, NavItem} from 'react-bootstrap';

import {Route, NavLink} from 'react-router-dom'

import HomePage from '../components/HomePage'
import LogInOutButton from '../components/LogInOutButton'

import ManagePage from './ManagePage'
import PositionPage from './PositionPage'
import UserAccountPage from './UserAccountPage'



import RouteMap from '../utils/router'

import './IndexPage.css';


class IndexPage extends React.Component {

    constructor(params) {
        super(params)

        this.handleSelect = this.handleSelect.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleSelect(e)
    {
        if(e.key === "login")
            return;
        this.props.history.push(e.path);
    }

    handleLoginClick(e) {
        e.preventDefault();
    }
    render() {
        return (
            <div style={{
                display:"flex",
                flexDirection:"column",
                height: "100%",
                }}>
                <Navbar inverse collapseOnSelect fluid={true} className="react-navbar">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <NavLink to="/">定位鞋</NavLink>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight onSelect={this.handleSelect} >
                            <NavItem eventKey={{key:"position",path: RouteMap.positionPage}} href={RouteMap.positionPage}>
                            定位
                            </NavItem>
                            <NavItem eventKey={{key:"device", path:RouteMap.managePage}} href={RouteMap.managePage}>
                            管理
                            </NavItem>
                            <NavItem onClick={this.handleLoginClick} eventKey={{key:"login", path: RouteMap.userAccountLogin}} href={RouteMap.userAccountLogin}>
                            {/*登录组件*/}
                            <LogInOutButton/>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div style={{
                    flex: "1",
                }}>
                    <Route path={RouteMap.homePage} component={HomePage}/>
                    <Route path={RouteMap.managePage} component={ManagePage}/>
                    <Route path={RouteMap.positionPage} component={PositionPage}/>
                    <Route path={RouteMap.userAccountPage} component={UserAccountPage}/>
                </div>

            </div>
        );
    }
}

export default IndexPage;