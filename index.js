import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Sequelize } from "sequelize";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
);

app.get("/", (req, res) => {
  res.send("Server Node.js Berhasil Berjalan!");
});

async function startServer() {
  try {
    await sequelize.authenticate();
    process.stdout.write("Sukses terhubung ke MySQL!\n");

    app.listen(PORT, () => {
      process.stdout.write(`Server berjalan di http://localhost:${PORT}\n`);
    });
  }
  catch (err) {
    process.stdout.write(`Tidak bisa terhubung ke database! ${err.message}\n`);
  }
}

startServer();
