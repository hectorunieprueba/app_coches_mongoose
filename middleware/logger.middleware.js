// const logger = (req, res, next) => {

//     console.log("Ha llegado una petición");

//     next();
// }

// module.exports = logger;


const logger = (req, res, next) => {

    console.log("Método:", req.method);
    console.log("URL:", req.url);

    //next => he terminado, continua con otra cosa
    next();


}

module.exports = logger;