// var nodeExternals = require('webpack-node-externals');
module.exports = {
  
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            customFileProtocol: 'app://./',
            builderOptions: {
                publish: ['github'],
                asar: true,
                appId: 'com.amp.music',
                productName: 'AmpMusic',
                linux: {
                    target:['AppImage','deb']
                }

            },
        },
    },
};
