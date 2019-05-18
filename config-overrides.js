/**
 * This file holds overrides for configurations provided by the default
 * create-react-app build process. We use this so we don't have to 
 * eject the app.
 */

const rewireStyledComponents = require('react-app-rewire-styled-components');

module.exports = function override(config, env) {
    
    // Allows us to use styled components in our JS files
    config = rewireStyledComponents(config, env);
    
    return config;
}