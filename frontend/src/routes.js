import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Write from './pages/Write'

export default Routes => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} isPrivate />
                <Route path="/profile" component={Profile} />
                <Route path="/write" component={Write} />
            </Switch>
        </BrowserRouter>
    )
}