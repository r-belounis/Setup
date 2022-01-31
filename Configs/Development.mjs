import init from "../Modules/Init.mjs";
import messages from "../Modules/Messages.mjs";
import helpers from "../Modules/Helpers.mjs";

// Concurrent Startup for development mode
// ------------------
// NB: (needs to be returned either in a SetTimeout() or SetInterval() function)
const Development = setInterval((timer) => {
    try {
        messages.onStartDev();
        init.barDev.tick(init.server());
    } catch (error) {
        // On interruption, raise message interruption
        // keyPress.sendCombination(['ctrl', 'c']) ? messages.onInterruptSetup() : null;
        // On error, raise error message from catch, exit all programs
        messages.onFailureDev();
        console.error(error);
        if (error) {
            init.barDev.terminate();
            helpers.killProcesses();
        }
    } finally {
        // On success, raise a message and clear progress bar
        if (init.barDev.complete) setTimeout(() => messages.onSuccessDev(devCLI), 300);
        // We clear interval in any case if setup is finished.
        clearInterval(timer);
    }
}, 2000);

export default { Development };