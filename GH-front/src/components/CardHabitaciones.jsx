import { useState } from "react";
import { Link } from "react-router-dom"
import "../estilos/card.css";

export const CardHabitaciones = ({
    Habitación,
    Tipo,
    Capacidad,
    Estado,
    Precio,
}) => {
    return (
        <div className="card">
            <h3>{Habitación}</h3>
            <p>Tipo: {Tipo}</p>
            <p>Capacidad: {Capacidad}</p>
            <p>Estado: {Estado}</p>
            <p>Precio: {Precio}</p>

        </div>
    );
};

