/**
 * 一个页面 === 一种布局
 * 
 * 这个页面里会放置不同的组件
 */

import React from 'react'

import {Navbar, Nav, NavItem} from 'react-bootstrap';

import {Route, NavLink} from 'react-router-dom'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setManageCurrentIndex} from '../redux/actions/ui'


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
        else if(e.key === "manage" || e.key === "position")
            {
                //判断是否登录
                if(this.props.token != null)
                {
                    if(e.key === "position")
                        this.props.history.push(e.path)
                    if(e.key === "manage")
                    {
                        this.props.history.push(RouteMap.deviceList);
                        this.props.setManageCurrentIndex("1")
                    }   
                }
                
                else
                    this.props.history.push(RouteMap.userAccountLogin);
            }
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
                            <NavItem eventKey={{key:"manage", path:RouteMap.managePage}} href={RouteMap.managePage}>
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
                    height: "10%"
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

function mapStateToProps(state) {
  return {
    token: state.userReducer.token,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setManageCurrentIndex: bindActionCreators(setManageCurrentIndex, dispatch)
  }
}

const ConnectedIndexPage = connect(mapStateToProps, mapDispatchToProps)(IndexPage);
export default ConnectedIndexPage;

