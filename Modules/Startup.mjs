// External modules
import chalk from "chalk";
import ProgressBar from "progress";

// Internal modules
import messages from "./Messages.mjs";

// Startup
// -------
// Configuration script to run quick development server.
// You can customize this config parameter to add functions for exemple. Please provide a small explanation with it.

const config = {
    // We create a progress bar for booting server
    bar: new ProgressBar(chalk.blue("Booting Dev Mode: [:bar] (percent: :percent / time: :etas)"), {
        complete: "=",
        incomplete: " ",
        width: 20,
        total: 10
    }),
    // On success booting start a new bar, raise a message and quit all programs and processes.
    onSuccess: (timer) => (messages.onSuccessDev(), clearInterval(timer)),
    // On mode booting failed, raise an error and quit all programs
    onFailure: (exitInfo) => {
        messages.onFailure(exitInfo)
        config.bar.terminate();
        config.killProcesses();
    }
};

export default config;