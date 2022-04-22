// module.exports  = {
//     publicPath: process.env.NODE_ENV  ===  'production'  ?  './'  :  '/'
// }
module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: "Ziki Amp",
            },
        },
    },
};