import { app } from './server'
import './db'

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server started in', port)
})