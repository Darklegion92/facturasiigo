import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Default extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title
                                    text-uppercase pt-5">
                        <h1 className="display-3">
                            404 
                        </h1>
                        <h1>
                            error
                        </h1>
                        <h2>
                            pagina no encontrada
                        </h2>
                        <h3>
                            la direccion URL  
                            <span className="text-danger mx-1">
                                {this.props.location.pathname}
                            </span>
                                {" "}
                                no fue encontrada o no tiene acceso a este recurso
                         </h3>
                         <h3>
                             <Link to="/">ir al Login</Link> 
                         </h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Default;
