const mongoose = require("mongoose");

const cocheSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true
    },

    modelo: {
        type: String,
        required: true
    },
    precio: Number,

    anio: {
        type: Number,
        required: true,
        min: 2000,
        max: 2026
    },

    isVendido: {
        type: Boolean,
        default: false
    },
    extras: [String],
},
    {
        timestamps: true, versionKey: false

    })

const Coche = mongoose.model('coche', cocheSchema);

module.exports = Coche