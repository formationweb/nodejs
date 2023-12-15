import 'dotenv/config'
import { app } from './server.js'
import './db.js'

app.listen(process.env.PORT || 3000, () => {
    console.log('Le serveur tourne sur le port 3000')
})