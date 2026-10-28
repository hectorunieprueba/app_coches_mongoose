const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    //unique: es único, no puede haber 2 iguales
    unique: true
  },
  password: {
    type: String,
    required: true, 
    //select: cualquier consulta, o cualquier objeto que devuelva nunca se manda ni llega
    select: false
  },
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    //validate: HAY MUCHOS VALIDADORES EN NODE, BUSCAR ALGUNO??
    //match para expresiones regulares
    match: [/^\S+@\S+\.\S+$/, 'el email no es válido']
  },
  enabled: {
    type: Boolean,
    default: true,
    select: false
  },
  rol: {
    type: String,
    required: true,
    trim: true,
    //enum no es escalable. Tendríamos que parar Node y actualizar.
    enum : ['ADMON', 'CLIENTE', 'DIRECTOR']
  }
},
{
  timestamps: true,
  versionKey: false
}
);

const Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;