import React from 'react'

import { Switch, Route } from 'react-router-dom'

import routes from './routes.js'

// import { AppFooter } from './cmps/app-footer.jsx'
import { UserMsg } from './cmps/user-msg.jsx'

export class RootCmp extends React.Component {

    render() {
        return (
            <div className='all-container'>
                <main className='main-container'>
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact={route.exact} component={route.component} path={route.path} />)}
                    </Switch>
                </main>
                <UserMsg />
            </div>
        )
    }
}


