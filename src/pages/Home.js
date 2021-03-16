import MovieList from "../components/MovieList";
import React, { Component } from 'react'
import { getList } from "../services/rakutenapi"


export default class Home extends Component {
    //  I had to use _isMounted flag in order to solve the following warning:  
    //Warning: Can't perform a React state update on an unmounted component. 
    //This is a no - op, but it indicates a memory leak in your application.
    //To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    _isMounted = false;


    // All movie data of each list will be loaded in a state.
    state = {
        isLoading: true,
        popularesTaquilla: [],
        estrenosFamilia: [],
        imprescindibleTaquilla: [],
        estrenosEspanoles: [],
        siTePerdiste:[],
        specialXMen: [],
        nuestrasPreferidas:[]
    }

    componentDidMount = () => {
        this._isMounted = true;

        // We make the requests to our api all in one Promise all as
        //it is a group of asynchronous functions and we can't render the
        //website until we get all the responses back.
        Promise.all([getList("populares-en-taquilla"), getList("estrenos-para-toda-la-familia"),
            getList("estrenos-imprescindibles-en-taquilla"), getList("estrenos-espanoles"),
            getList("si-te-perdiste"), getList("especial-x-men"),
            getList("nuestras-preferidas-de-la-semana")]).then((returnedLists) => {
        //    We recieve all responses inside an array where each response follows
        //    the order as requested
            if (this._isMounted) {
                this.setState({
                
                    isLoading: false,
                    popularesTaquilla: returnedLists[0],
                    estrenosFamilia: returnedLists[1],
                    imprescindibleTaquilla: returnedLists[2],
                    estrenosEspanoles: returnedLists[3],
                    siTePerdiste:returnedLists[4],
                    specialXMen: returnedLists[5],
                    nuestrasPreferidas: returnedLists[6]
                })
            } 
        })
      
    }
        
    componentWillUnmount() {
    this._isMounted = false;
    }

    render() {
        // We use is loading flag to make sure that we have all 
        // the information before rendering the website
        if (this.state.isLoading) {
                return <div>Loading...</div>
            }

        return (
            <div>
                {/* We send to each coponent it's category movie list and each category name as a props
                so we can reuse the same component in each row */}
                <MovieList key={this.state.popularesTaquilla.id} categoryList={this.state.popularesTaquilla} categoryName={"Populares en taquilla"} />
                <MovieList key={this.state.estrenosFamilia.id} categoryList={this.state.estrenosFamilia} categoryName={"Estrenos para toda la familia"} />
                <MovieList key={this.state.imprescindibleTaquilla.id} categoryList={this.state.imprescindibleTaquilla} categoryName={"Estrenos imprescindibles en taquilla"} />
                <MovieList key={this.state.estrenosEspanoles.id} categoryList={this.state.estrenosEspanoles} categoryName={"Estrenos españoles"} />
                <MovieList key={this.state.siTePerdiste.id} categoryList={this.state.siTePerdiste} categoryName={"Si te perdiste"} />
                <MovieList key={this.state.specialXMen.id} categoryList={this.state.specialXMen} categoryName={"Especial X-Men"} />
                {/* The last list didn't have information at the momnent of loading so
                next line is commented,( I should do error handling for this cases) */}
                {/* <MovieList key={this.state.nuestrasPreferidas.id} categoryList={this.state.nuestrasPreferidas} categoryName={"Nuestras preferidas de la semana"}/> */}
            </div>
        )
    }
}


