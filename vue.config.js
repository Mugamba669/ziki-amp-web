// module.exports  = {
//     
// }
module.exports = {
     publicPath: process.env.NODE_ENV  ===  'production'  ?  './'  :  '/',
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: "Amp",
            },
        },
    },
};
