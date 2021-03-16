import { getMovie } from "../services/rakutenapi"
import React, { Component } from 'react'
import './Details.css'


export default class Details extends Component {

// We use isLoading flag as we did in Home
    state = {
        isLoading: true,
        movie:[]
    }

    componentDidMount = () => {
        // We make the api call to get the movie using the url /id in the browser with match.params.id
        getMovie(this.props.match.params.id).then((returnedMovie)=> {
            // we store all the movie information in the state movie
            this.setState({
                
                isLoading: false,
                movie: returnedMovie
            })
               
              
        }
        
    )
    
}


    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }

        return (
            <div className="details">
                <h1>{this.state.movie.title}</h1>
                <img src={this.state.movie.images.artwork}></img>
            </div>
        )
    }
}
