const readline = require("readline");
const yargs = require("yargs");
const fs = require("fs");

const argv = yargs.option("file", {
  alias: "f",
  type: "string",
  describe: "Nombre del archivo donde se guardarán los datos",
  default: "productos.json",
}).argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Nombre del producto: `, (producto) => {
  rl.question(`Precio del producto: `, (precio) => {
    rl.question(`Cantidad de unidades del producto: `, (cantidad) => {
      const nuevoProducto = {
        nombre: producto,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad),
      };

      let productos = [];

      if (fs.existsSync(argv.file)) {
        try {
          const data = fs.readFileSync(argv.file, "utf-8");
          productos = JSON.parse(data);
        } catch (error) {
          console.error(error);
        }
      }

      productos.push(nuevoProducto);

      try {
        fs.writeFileSync(
          argv.file,
          JSON.stringify(productos, null, 2),
          "utf-8"
        );
      } catch (err) {
        console.error(err);
      }

      try {
        const contenido = fs.readFileSync(argv.file, "utf-8");
        console.log(contenido);
      } catch (err) {
        console.error(err);
      }

      rl.close();
    });
  });
});
