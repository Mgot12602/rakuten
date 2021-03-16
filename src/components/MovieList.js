
import React, { Component, createRef } from 'react'
import "./MovieList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// In this case I used a font awsesome react module for the icons
// and just imported the ones needed.
import { faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons'



export default class MovieList extends Component {

    // To make images horizontaly scrollable I didn't want to use any 3rd party react module
    // or jquery which is not recommended so I found out how to implement it with css and 
    // dom manipulation and I adapted the DOM manipulation (querySelector) to react with the
    // onclick functions.
    // To make i scrollable we need to get the reference of the container where we have all the
    // images horizontaly using createRef().
    ref = createRef();

    // from that we can change our position with the class scrollLeft as many pixels we want
    // in this case I used the whole width of the visible movies, so in each click
    // all movies shown are different but we could use a fraction
    // or any calculation to scroll one movie in each click or half of screeen, etc.
    handleArrowLeft = () =>{ 
       
        if (this.ref.current!==null) { 
            this.ref.current.scrollLeft -= this.ref.current.offsetWidth;
      }      
    }

    handleArrowRight = () =>{ 
 
        if (this.ref.current!==null) {
             this.ref.current.scrollLeft += this.ref.current.offsetWidth;
        }      
    }
 
    render() {

        return (

           <div className="peliculas-recomendadas contenedor">
                <div className="contenedor-titulo">
                    {/* the list category is printed here */}
                    <h3>{this.props.categoryName}</h3>
                </div>
          
                <div className="contenedor-principal" >
                    {/* Arrows are styled as absolute position  
                    while the movies are in relative position so the arrow can overlap inside the movies images*/}
                        <button role="button" id="flecha-izquierda"className="flecha-izquierda" onClick={this.handleArrowLeft}>
                            <FontAwesomeIcon icon={faAngleLeft}/>
                        </button> 
                            <div className="contenedor-carousel">
                                <div className="carousel" ref={this.ref}>
                            {/* we map over all movies inside the props received and assign each route
                                and artwork*/}
                                    {this.props.categoryList.map((el) => (
                                     <div className="pelicula" key={el.id}>
                                        <a href={`/${el.id}`} onClick={this.handleclick}>
                                             <img src={el.images.artwork}  ></img>
                                        </a>
                                     </div>
                                    ))}
                                </div>
                             </div>
                        <button  id="flecha-derecha" className="flecha-derecha" onClick={this.handleArrowRight}>
                            <FontAwesomeIcon icon={faAngleRight}/>
                         </button>
                    </div>
           </div>
            
        )
    }
}
