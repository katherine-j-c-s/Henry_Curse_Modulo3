const app = require('./app')
const PORT = 3001;
//inicialisar el servidor
app.listen(PORT, () => {
   console.log(`Server raised in port: http://localhost:${PORT}`);
});