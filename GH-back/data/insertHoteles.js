/* insercion de datos iniciales */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Hotel from "../src/models/hotelMongo.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });


const hoteles = [
  {
    nombre: "Hotel Welcome",
    direccion: "San Jerónimo 125, Córdoba",
    telefono: "351-4567890",
    email: "info@welcome.com",
    categoria: 3,
    imagenUrl: "https://res.cloudinary.com/tu_cuenta/image/upload/v1/hoteles/welcome.jpg"
  },
  {
    nombre: "De la Cañada",
    direccion: "Marcelo T. de Alvear 580, Córdoba",
    telefono: "351-4789563",
    email: "contacto@delacaniada.com",
    categoria: 4,
    imagenUrl: "https://res.cloudinary.com/tu_cuenta/image/upload/v1/hoteles/delacaniada.jpg"
  },
  {
    nombre: "Panorama",
    direccion: "Av. Colón 550, Córdoba",
    telefono: "351-4321987",
    email: "info@panorama.com",
    categoria: 5,
    imagenUrl: "https://res.cloudinary.com/tu_cuenta/image/upload/v1/hoteles/panorama.jpg"
  }
];

async function insertHoteles() {
  try {
    console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    await Hotel.deleteMany({});
    console.log("🧹 Hoteles anteriores eliminados.");

    await Hotel.insertMany(hoteles);
    console.log("✅ Nuevos hoteles insertados en MongoDB.");

  } catch (error) {
    console.error("❌ Error insertando hoteles:", error);
  } finally {
    mongoose.connection.close();
  }
}

insertHoteles();
