// Controladores: lógica para manejar requests y responses

import { getCliente, getHotelPorCategoria } from "../services/services.js";

// Controlador: maneja la request de obtener un cliente por su id
export async function fetchCliente(req, res) {
    try {
        const idCliente = parseInt(req.params.idCliente, 10);
        if (isNaN(idCliente) || idCliente <= 0) {
            return res.status(400).json({
                success: false,
                message: "ID de cliente inválido"
            });
        }
        const cliente = await getCliente(idCliente);
        if (!cliente || cliente.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Cliente no encontrado"
            });
        }
        res.json({
            success: true,
            data: cliente[0]
        });
    } catch (error) {
        console.error("❌ Error en fetchCliente:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// obtener hotel por categoria
export async function fetchHotelPorCategoria(req, res) {
    try {
        // Acepta categoría desde params, query o body
        const raw = req.params.categoria ?? req.query.categoria ?? req.body.categoria;
        if (raw === undefined || raw === null || String(raw).trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Categoría requerida"
            });
        }

        const categoria = String(raw).trim();

        // Validar como entero entre 1 y 5
        if (!/^[1-5]$/.test(categoria)) {
            return res.status(400).json({
                success: false,
                message: "Categoría inválida"
            });
        }

        // Llamar al service
        const hoteles = await getHotelPorCategoria(categoria);

        // Devolver lista completa (service ya devuelve array)
        return res.json({
            success: true,
            data: Array.isArray(hoteles) ? hoteles : []
        });

    } catch (error) {
        console.error("❌ Error en fetchHotelPorCategoria:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}