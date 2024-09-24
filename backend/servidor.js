import 'dotenv/config.js'
import express from "express";
import cors from "cors"
import { banco } from "./db/conn.js"
import { router } from "./routes/routes.js"
import { errorHandler } from "./middleware/errorHandler.js";
import { config } from "dotenv"

config()
const servidor = express() 

servidor.use(cors()) // resolve problema com browser
servidor.use(express.json())
servidor.use("/api", router) // chama todas nossas rotas criadas
servidor.use(errorHandler)

banco() // conexão com banco pelo mongoose

servidor.listen(process.env.PORT, () => {
    console.log('Servidor ativo na porta 3333')
})