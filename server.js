
import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import booksRoute from './routes/bookRoute.js'
import writersRoute from './routes/writerRoute.js'
import authRoutes from './routes/authRoutes.js'
import errorHandler from './middleware/error.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.js'
dotenv.config()
const PORT = process.env.PORT || 9000;
const app = express();
app.use(cors())
app.use(express.json())
//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
//routes
app.use('/api/auth',authRoutes)
app.use('/api/books', booksRoute)
app.get("/debug-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS time");
    res.json({
      message: "DB OK",
      server_time: rows[0].time
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/api/writers', writersRoute)

app.use(errorHandler)
app.listen(PORT, () =>  console.log(`app is running in the port number ${PORT}`)
)