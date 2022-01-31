import config from './Modules/Startup.mjs';
import messages from './Modules/Messages.mjs';
import helpers from './Modules/Helpers.mjs';

// Startup
// -----------
// Simple version of Catalyst program to quickly run development server.
// NB: (If you want to modify this function, it needs to be returned either in a SetTimeout() or SetInterval()).

const Startup = setInterval(() => {
    try {
        // Starting up processes and check dns for database
        messages.onStart();
        // If user press exit controls then quit program
        helpers.onExitPress(messages.onInterrupt());
        // Run progress bar with concurrent commands
        config.bar.tick(helpers.Server());
    } catch (error) {
        // On error, raise error message from catch
        config.onFailure(error);
    } finally {
        // On success booting up, raise a message and clear progress bar
        if (config.bar.complete) config.onSuccess(Startup);
    }
}, 2000);

export default Startup;