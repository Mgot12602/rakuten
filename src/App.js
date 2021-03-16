import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import "./App.css"

export default class App extends Component {
    render() {
        return (
            <div>
             {/* We have two pages in our website so we create the routes for each */}
                <Switch>
                    {/* Homepage */}
                    <Route exact path="/" component={Home} />
                    {/* We will use the id of our path with the movie name to make the api call*/}
                    <Route exact path="/:id" component={Details} />
                </Switch>
                
            </div>
        )
    }
}
