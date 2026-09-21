import app from './app.js'
import { connectDatabase, env } from './config.js'
connectDatabase().then(()=>app.listen(env.port,()=>console.log(`API listening on ${env.port}`))).catch(error=>{console.error(error.message);process.exit(1)})
