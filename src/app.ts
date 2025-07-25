import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import path from 'path'
import fs from 'fs'

const app = express()

// limiter
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 1 minutes"
})

// Public dir
export const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log(`Created missing directory: ${publicDir}`);
}

app.use(limiter)
app.use(cors())
app.use(express.json())
app.use('/public', express.static(publicDir))


// ROUTES
import usersRouter from './modules/users/users.routes'
import friendsRouter from './modules/friends/friends.routes'

app.use('/api/users', usersRouter)
app.use('/api/friend-requests', friendsRouter)


// Additional handlers
import errorHandler from './common/middlewares/errorHandlerMiddleware'
import notFound from './common/middlewares/notFoundMiddleware'

app.use(notFound)
app.use(errorHandler)

export default app

