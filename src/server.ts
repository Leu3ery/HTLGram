import app from './app'
import connectDB from './config/db'
import {config} from './config/config'
import http from 'http'
import initSocket from './socket'


const startServer = async () => {
    try {
        await connectDB()

        const httpServer = http.createServer(app);

        initSocket(httpServer)

        httpServer.listen(config.PORT, () => {
            console.log(`Server runs on http://localhost:${config.PORT}`)
        })
    } catch (error: any) {
        console.log(error.message)
        process.exit(1)
    }
}

startServer()