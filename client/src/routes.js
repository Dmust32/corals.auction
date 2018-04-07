import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Auctions from './components/Auctions'

export default (
    <Switch>
        <Route component = { Home } exact path = '/'/>
        <Route component = {Dashboard} exact path = '/MyDash'/>
        <Route component = {Auctions} exact path = '/Auctions'/>
    </Switch>
)