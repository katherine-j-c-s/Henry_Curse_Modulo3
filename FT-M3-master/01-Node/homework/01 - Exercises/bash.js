const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');

function bash() {
   process.stdout.write("prompt > ")
   //le escribe este sting como data
   process.stdin.on("data", (data) => {//frena a esperar que tenga una data
      //espera a ver que tiene adentro
      const args = data.toString().trim().split(" ")//lo convierte en string ,le quita los espacios del inicio y fin ,y lo convierte en array
      const cmd = args.shift()//saca el primero y lo guarda aca
      if (commands.hasOwnProperty(cmd)) {//si existe esta propiedad en commands
         commands[cmd](print, args.join(" "));
         //ejecutamos la funcion y por parametro
         // le pasamos la funcion print y el resto de la data transformada en string de nuevo
      }else {
         print(`command not found: ${cmd}`)
      }

   })
}

function print(output) {//muestra en pantalla lo que necesitamos motras
   process.stdout.write(output)
   process.stdout.write("\nprompt > ")//vulve a vaciarce para proximo uso
}

bash();
module.exports = {
   print,
   bash,
};
