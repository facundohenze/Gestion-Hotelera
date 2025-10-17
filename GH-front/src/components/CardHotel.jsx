import { useState } from "react";
import "../estilos/cardHotel.css";

export const CardHotel = ({
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
        </div>
    );



};