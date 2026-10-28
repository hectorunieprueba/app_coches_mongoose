const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema({

    coche: {
        type: mongoose.Schema.Types.ObjectId,
        // const Coche = mongoose.model('coche', cocheSchema); Esto es la referencia ('coche')
        ref: "coche",
        required: true
    },

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        // const Coche = mongoose.model('coche', cocheSchema); Esto es la referencia ('coche')
        ref: "usuario",
        required: true
    },
    precio: Number
},
    {
        timestamps: true,
        versionKey: false
    }


)

const Venta = mongoose.model('venta', ventaSchema);

module.exports = Venta