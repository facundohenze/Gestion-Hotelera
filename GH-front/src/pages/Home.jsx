import { useEffect, useState } from "react";
import "../estilos/home.css";
import { CardHotel } from "../components/CardHotel";

export function Home() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState(null);
    const [searchError, setSearchError] = useState(null);
    const [categoria, setCategoria] = useState('');
    const [hoteles, setHoteles] = useState([]);

    useEffect(() => {
        fetch('/login-data')
            .then(res => {
                if (!res.ok) throw new Error('No autenticado');
                return res.json();
            })
            .then(response => {
                if (response.ok && response.datos) setUserData(response.datos);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setError('Debe iniciar sesión para acceder');
                setLoading(false);
            });
    }, []);

    // Buscar hoteles por categoría (acepta evento o una categoría como string)
    const buscarHotelPorCategoria = async (arg) => {
        // si es evento, prevenir comportamiento por defecto
        if (arg && typeof arg.preventDefault === 'function') arg.preventDefault();

        // si se pasó una categoría (string/number) usarla, sino usar el estado `categoria`
        const categoriaSeleccionada = (typeof arg === 'string' || typeof arg === 'number')
            ? String(arg)
            : categoria;

        if (!categoriaSeleccionada || categoriaSeleccionada.trim() === '') {
            setSearchError('Por favor ingrese una categoría');
            return;
        }

        // sincronizar estado para mostrar cuál categoría está buscando
        setCategoria(categoriaSeleccionada);
        setSearching(true);
        setSearchError(null);
        setHoteles([]);

        try {
            const response = await fetch(`/api/hoteles?categoria=${encodeURIComponent(categoriaSeleccionada)}`);
            const contentType = response.headers.get('content-type') || '';

            if (!response.ok) {
                const text = await response.text(); // leer body para debug
                throw new Error(`HTTP ${response.status}: ${text}`);
            }

            if (!contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Respuesta no es JSON: ${text}`);
            }

            const data = await response.json();

            if (data && data.success) {
                setHoteles(data.data || []);
            } else {
                setSearchError(data?.message || 'No se encontraron hoteles para esta categoría');
            }
        } catch (err) {
            console.error('Error al buscar hoteles:', err);
            setSearchError(String(err.message || 'Error de conexión al buscar hoteles'));
        } finally {
            setSearching(false);
        }
    };

    const limpiarBusqueda = () => {
        setCategoria('');
        setHoteles([]);
        setSearchError(null);
    };

    if (loading) {
        return (
            <div className="home-container">
                <h1>Home Page</h1>
                <p>Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-container">
                <h1>Home Page</h1>
                <p className="search-error">{error}</p>
            </div>
        );
    }

    return (
        <div className="home-container">
            <h1>Gestión Hotelera</h1>

            {/* {userData && (
                <div className="user-box">
                    <h2>Bienvenido</h2>
                    <p><strong>Usuario:</strong> {userData.usuario}</p>
                    <p><strong>Rol:</strong> {userData.rol}</p>
                </div>
            )} */}

            <div className="search-box">
                {/* <h2>Buscar Hotel</h2> */}

                <div>
                    <label>Categoria:</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                        {[1, 2, 3, 4, 5].map(n => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => buscarHotelPorCategoria(String(n))}
                                disabled={searching}
                            >
                                {searching && categoria === String(n) ? 'Buscando...' : `Categoria ${n}`}
                            </button>
                        ))}

                    </div>
                </div>

                <div style={{ marginTop: 12 }}>
                    <button type="button" onClick={limpiarBusqueda} disabled={searching}>
                        Limpiar
                    </button>
                </div>

                {searchError && <p className="search-error">{searchError}</p>}
            </div>

            {hoteles.length > 0 ? (
                <div className="result-box">
                    <h2>Hoteles encontrados</h2>
                    <ul>
                        {hoteles.map((h, i) => (
                            <li key={h.id || i}>
                                <CardHotel
                                    imagenUrl={h.imagenUrl || ''}
                                    nombre={h.nombre || 'Sin nombre'}
                                    categoria={h.categoria || 'Sin categoría'}
                                    direccion={h.direccion || 'Sin dirección'}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                !searchError && <p>No hay hoteles para mostrar.</p>
            )}

        </div>
    );
}



