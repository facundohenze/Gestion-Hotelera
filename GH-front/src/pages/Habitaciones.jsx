import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CardHabitaciones } from "../components/CardHabitaciones.jsx";
import "../estilos/habitaciones.css"

export function Habitaciones() {
    const [habitaciones, setHabitaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const hotel = location.state; // Datos del hotel que viene del Home

    useEffect(() => {
        // Si hay un hotel seleccionado, cargamos sus habitaciones
        if (hotel?.idHotel) {
            buscarHabitaciones(hotel.idHotel);
        }
    }, [hotel]);

    const buscarHabitaciones = async (idHotel) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3001/api/habitaciones/hotel/${idHotel}`);
            console.log("🔹 Estado de la respuesta:", response.status);
            const data = await response.json();
            console.log("🔹 Datos recibidos del backend:", data);


            if (response.ok && data.success) {
                setHabitaciones(data.data); // Guardamos las habitaciones obtenidas
            } else {
                setError(data.message || "No se pudieron cargar las habitaciones");
            }
        } catch (err) {
            console.error("Error al buscar habitaciones:", err);
            setError("Error de conexión al buscar habitaciones");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="habitaciones-container">

            <h1>{hotel?.nombre}</h1>
            <Link to="/home">
                <button>Voler</button>
            </Link>


            {/* <p>Categoría: {hotel?.categoria}</p>
            <p>Dirección: {hotel?.direccion}</p>
            <img src={hotel?.imagenUrl} alt={hotel?.nombre} width="400" /> */}

            {loading && <p>Cargando habitaciones...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && (
                <div className="habitaciones-list">
                    <ul>
                        {habitaciones.map((h) => (
                            <div key={h.idHabitacion}>
                                <li>
                                    <CardHabitaciones
                                        Habitación={h.numero}
                                        Tipo={h.tipo}
                                        Capacidad={h.capacidad} personas
                                        Estado={h.estado}
                                        Precio={h.precio}
                                    />
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
