import fs from "fs";
import init from "../Modules/Init.mjs";
import messages from "../Modules/Messages.mjs";
import helpers from "../Modules/Helpers.mjs";

// Main initial setup for local development
// ------------------
// NB: needs to be returned either in a SetTimeout() or SetInterval() function.
const Setup = () => {
    setTimeout(() => {
        try {
            // First we try to see if git repository exist in computer. If not, clone repository.
            if ('git ls-remote -h https://github.com/WhiteLabGenomics/Catalyst.git') {
                try {
                    // We let message to explain the downloading process.
                    messages.onStartDownload,
                    // Then we set download when user has read message.
                    setTimeout(() => init.CatalystDownload('https://github.com/WhiteLabGenomics/Catalyst.git'), 2000);
                } catch (error) {
                    // On download error, throw an error message then kill all processes.
                    messages.onFailureDownload();
                    helpers.Clear(null, null, error);
                    helpers.killProcesses();
                }
            }
            // Otherwise if repository is already present, go for installation instead.
            else if (fs.existsSync('/Catalyst')) {
                try {
                    setTimeout(() => {
                        // We let message to explain things before installation.
                        messages.onStartSetup();
                        // Then we initialize the installation process.
                        init.barSetup(init.installs());
                    }, 3000)
                    if (init.installs) helpers.Clear(null, true, null);
                } catch (error) {
                    // On install error, throw an error then kill all processes.
                    helpers.Clear(null, null, error);
                    helpers.killProcesses();
                }
            }
            // Else that means user has already done the download & installation processes.
            // Quit installation process.
            else {
                if (init.barSetup.complete) setTimeout(() => messages.onSuccessSetup(setupCLI), 300);
                // We clear interval in any case if setup is finished.
                helpers.Clear(true, true, null)
            }
        } catch (error) {
            
        } finally {
            // On finished process we wait a bit, raise a message.
            if (init.barSetup.complete) setTimeout(() => messages.onSuccessSetup(setupCLI), 300);
            // We clear interval in any case if setup is finished.
            helpers.Clear(true, true, null)
        }
    }, 1)
};

export default { Setup };