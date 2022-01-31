// External modules
import exec from "child_process";
import readline from "readline";
import fkill from "fkill";
import shell from "shelljs";
import keyPress from "node-key-sender";
import concurrently from "concurrently";

// Internal modules
import messages from "./Messages.mjs";
import paths from "./Paths.mjs";
import processes from "./Processes.mjs";

// Confgure readline to read keypress events
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

// Helpers functions
// -----------------
// Here you can define your helper functions to provide you help in doing repeating or trivial tasks.
// Please provide a definition on your functions and put them in module export.

/**
 * @name Server
 * @description Function helper to launch development server in concurrent format. 
 * @requires paths.js
 * @requires concurrently
 * @returns Development server in concurrent format (will launch backend and frontend simultaneously).
**/

const Server = () => concurrently([
    {
        // First we run backend
        command: `cd ${paths.backend} && ${processes.python} run.py`,
        name: "Backend",
        prefixColor: "red"
    }, {
        // Last we run frontend
        command: `cd ${paths.frontend} && npm run dev`,
        name: "Frontend",
        prefixColor: "blue"
    }], {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 3,
});

/**
 * @name killProcesses
 * @description Function helper to kill development processes. This is useful if rebooting and port are already opened.
 * @returns Kill backend/frontend ports and processes requested (nodejs and python).
**/

const killProcesses = () => {
    fkill('node');
    fkill(`python3`);
    shell.exec("npx kill-port 3000 5000");
    process.exit();
};

/**
 * @name Clear
 * @description Function helper to clear timeouts or intervals.
 * @param {boolean} timer The value or boolean to provide for clearing setInterval.
 * @param {boolean} timeout The value or boolean to provide for clearing setTimeout.
 * @param {parameter} error The value or callback for returning error log.
 * @returns Clears any timer and send error message to user on console if provided.
**/

const Clear = (timer = false, timeout = false, error) => {
    if (timer) clearInterval(timer)
    if (timeout) clearTimeout(timeout)
    if (error) console.error(error)
}

/**
 * @name errorHandling
 * @description Function helper to throw errors with automatic kill processes.
 * @param {boolean} err The value or boolean to provide for returning function.
 * @returns If error is returned, it will send message error depending on situation cases (like key press or build error).
**/

const errorHandling = (err) => {
    switch(err) {
        // On interruption process, send message interruption.
        case keyPress.sendCombination(['ctrl', 'c']):
            // Cancel console process
            messages.onInterrupt();
            break;
        // On error, raise error message from catch, send error message then kill all processes.
        case err:
            messages.onFailure(err),
            Clear(null, null, error), 
            killProcesses();
            break;
    }
}

/**
 * @name isProcessRunning
 * @description Function helper to check if processes are running in background.
 * @param {string} processName The executable name to check
 * @param {function} cb The callback function
 * @returns {boolean} True: Process running, False: Not running
**/

 const isProcessRunning = (processName, cb) => {
    const cmd = (() => {
        switch (process.platform) {
            case 'win32' : return `tasklist`;
            case 'darwin' : return `ps -ax | grep ${processName}`;
            case 'linux' : return `ps -A`;
            default: return false;
        }
    })();
    exec(cmd, (err, stdout, stderr) => cb(stdout.toLowerCase().indexOf(processName.toLowerCase()) > -1));
}

/**
 * @name onExitPress
 * @description Function helper to check if user keypress "Ctrl" + "C". Exit code with message.
 * @returns {string} Return message for abording ongoing process.
 * @returns {function} Return killProcesses() function.
**/

const onExitPress = (message) => process.stdin.on('keypress', (str, key) => { if (key.ctrl && key.name === 'c') message, killProcesses() });

export default { Server, killProcesses, Clear, errorHandling, isProcessRunning, onExitPress }