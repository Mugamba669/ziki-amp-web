// var nodeExternals = require('webpack-node-externals');
module.exports = {
  
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            customFileProtocol: './',
            builderOptions: {
                publish: ['github'],
                asar: true,
                appId: 'com.amp.music',
                productName: 'AmpMusic'
            },
        },
    },
};
