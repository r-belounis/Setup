import dns from "check-internet-connected";
import shell from "shelljs";
import chalk from "chalk";

// Messages
// --------
// Collection of messages to display for user with further functionalities.
// You can add your own messages here, please provide a small explanation with it.

const messages = {
    // When starting app, we lunch a menu UI for users to choose whatever they want to do
    MenuItems: [
        '1. Install Catalyst Platform on computer',
        '2. Run Catalyst Platform',
        '3. Exit Catalyst Platform Installer'
    ],
    // Raise different messages depending on which option user chooses, we also check for internet connection.
    onStart: () => dns().then((result) => {
        if (__filename === 'Startup.js') shell.echo(chalk.yellow("[Catalyst Program:]"), chalk.yellow("Booting up Catalyst dev server...\r\n"));
        else {
            switch (result) {
                case messages.MenuItems.indexOf('1. Install Catalyst Platform on computer'):
                    shell.echo(
                        chalk.greenBright("[Catalyst Program] :\r\n"),
                        chalk.green("Hello, it seems you haven't cloned the Catalyst repository.\r\n"),
                        chalk.green("We will clone it first and then process to install everything.\r\n"),
                        chalk.green("This might take a few moment, take a cofee until the wait.\r\n")
                    );
                case messages.MenuItems.indexOf('2. Run Catalyst Platform'):
                    shell.echo(chalk.yellow("[Catalyst Program:]"), chalk.yellow("Booting up Catalyst dev server...\r\n"));
                case messages.MenuItems.indexOf('3. Exit Catalyst Platform Installer'):
                    shell.echo(chalk.yellow("[Catalyst Program:]"), chalk.yellow("Exiting Catalyst Program, thank you for using it !\r\n"));
                default: ""
            }
        }
    }).catch((exitInfo) => messages.onFailure(exitInfo)),
    // On success setup message.
    onSuccessSetup: () => (
        shell.echo(
            chalk.greenBright("[Catalyst Program] :"),
            chalk.green("Installation finished, You can start development server by sending command :\r\n"),
            chalk.blue(chalk.italic('npm run dev\r\n')),
            chalk.magenta(chalk.underline("See you space cowboy !"))
        )
    ),
    // On success booting message.
    onSuccessDev: () => shell.echo(chalk.yellow("[Catalyst Program:]"), chalk.green("Dev server started correctly.\r\n")),
    // On booting failed, raise an error and quit all programs.
    onFailure: (exitInfo) => {
        if (exitInfo.errno === -3001) {
            // Shout error for no connection error
            shell.echo(chalk.yellow("\n[Catalyst Program:]"), chalk.yellow("You seemed to be not connected to network, connect first to run program..."));
        } else {
            // Shout error for any other issue with error info log
            shell.echo(chalk.yellow("\n[Catalyst Program:]"), chalk.red("Catalyst Program couldn't start up, see following trace error =>"));
            console.error(exitInfo);
        }
    },
    // On interrupt is when user promptly stop process by using ctrl+c to shout interruption message.
    onInterrupt: () => shell.echo(chalk.yellow("[Catalyst Program:]"), chalk.yellow("all processes stopped correctly.\r\n")),
};

export default messages;