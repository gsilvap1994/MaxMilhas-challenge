/*
 * The server js file is the responsible for starting the app.
 */

import app from './config/express';
import { PORT } from './config/global-config'


app().listen(PORT, () => {
    console.log(`Server api started at port ${PORT}`)
})