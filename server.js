import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import books from './routes/bookRoute.js'
import writers from './routes/writerRoute.js'
import errorHandler from './middleware/error.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.js'
dotenv.config()
const PORT = process.env.PORT || 9000;
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/books', books)
app.use('/api/writers', writers)
//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(errorHandler)
app.listen(PORT, () =>  console.log(`app is running in the port number ${PORT}`)
)