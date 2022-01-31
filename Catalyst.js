import init from "./Modules/Init";
// import messages from "../Modules/Messages";

// Main initial startup of setup app
const Catalyst = () => {
    try {
        init.Initialisation(messages.onStartApp);
    } catch (error) {
    } finally {
    }
};

export default { Catalyst };