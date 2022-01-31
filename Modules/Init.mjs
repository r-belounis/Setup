// External modules
import fs from "fs"
import prompt from "prompt-sync";
import shell from "shelljs";
import chalk from "chalk";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";
import { terminal } from "terminal-kit";

// Internal modules
import paths from "./Paths.mjs";
import processes from "./Processes.mjs";

// Initialisators
//---------------
// You can customize these configs parameter to add functions

// We define a selection setup before downloading or setting up software
const Initialisation = (items) => {
    // We construct our initilisator here
    const SelectionRendering = [
        [terminal.drawImage(logo, shrink)],
        [terminal.cyan('Welcome to Catalyst Development App.\n')],
        [terminal.cyan('Choose an option below.\n')],
        [terminal.singleColumnMenu(items, function (error, response) {
            terminal('\n').eraseLineAfter.green(
                "#%s selected: %s (%s,%s)\n",
                response.selectedIndex,
                response.selectedText,
                response.x,
                response.y
            );
            terminal.processExit(1);
        })]
    ]

    // And finally we render everything on a table
    terminal.table(SelectionRendering,
        // Options for table cell
        {
            hasBorder: false,
            contentHasMarkup: true,
            borderChars: 'lightRounded',
            width: 60,
            fit: true
        });
}

// We create a progress bar for download setup
const CatalystDownload = (req) => git.clone({
    fs,
    http,
    dir: main,
    url: req,
    singleBranch: true,
    depth: 1,
    // corsProxy: 'https://cors.isomorphic-git.org',
    onAuth: () => {
        let auth, username, token;
        if (req) {
            terminal.greenBright("[Catalyst Download] :\r\n");
            terminal.green('To download Catalyst, you need to provide your github username and personal access token.\r\n');
            return auth = Promise.resolve(function (resolve, reject) {
                username = prompt('Please provide your github username: '),
                token = prompt('And your github personal access token : ')
            }).then(auth = { username: username, token: token });
        } else return { cancel: true }
    },
    onProgress: event => {
        updateLabel(chalk.cyan(event.phase));
        if (event.total) updateProgressBar(chalk.cyan(event.loaded / event.total));
        else updateIndeterminateProgressBar(chalk.cyan(event.loaded));
    }
})

// We create a Progress bar for installations
const Progress = (process, list) => {
    // Initialisators
    let progressBar;
    const tasks = [list];
    const countdown = tasks.length;
    
    // Our function to initialise the progress bar
    function start() {
        if (!tasks.length) return;
        const task = tasks.shift();
        progressBar.startItem(task);
        // Finish the task in...
        setTimeout(done.bind(null, task), 500 + Math.random() * 1200);
        // Start another parallel task in...
        setTimeout(start, 400 + Math.random() * 400);
    }

    // The function to end the progress bar (included in start function as a callback)
    function done(task) {
        progressBar.itemDone(task);
        countdown--;
        // Cleanup and exit
        if (!countdown) setTimeout(() => {term('\n'); process.exit();}, 200);
    }

    progressBar = term.progressBar({
        width: 80,
        title: 'Jobs:',
        eta: true,
        percent: true,
        items: thingsToDo.length
    });
    
    return start;
}

// We define here our process for installation process
const Installs = () => {
    return Promise.resolve(
        // First we install dependencies for main folder
        shell.cd(paths.main).exec('npm i')
    ).then(
        // Second we run installs for backend
        shell.cd(paths.install_backend).exec(`${processes.python} installs_backend.py`)
    ).then(
        // Last we install frontend dependencies
        shell.cd(paths.frontend).exec('npm i')
    )
}

export default { Initialisation, Progress, CatalystDownload, Installs };