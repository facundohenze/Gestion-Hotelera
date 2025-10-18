import { useState } from "react";
import { Link } from "react-router-dom"
import "../estilos/cardHotel.css";

export const CardHotel = ({ 
    id,
    imagenUrl,
    nombre,
    categoria,
    direccion,
}) => {

    return (
        <div className="card-hotel">
            {imagenUrl && <img src={imagenUrl} alt={nombre} className="hotel-image" />}
            <h3>{nombre}</h3>
            <p>Categoría: {categoria}</p>
            <p>Dirección: {direccion}</p>

            <Link to="/Habitaciones"
                state={{
                    id,
                    imagenUrl,
                    nombre,
                    categoria,
                    direccion,
                }}
            >
                <button>Seleccionar</button>
            </Link>

        </div>



    );



};