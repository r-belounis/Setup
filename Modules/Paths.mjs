import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
// import shell from "shelljs";

// Configuration
// -------------

// Configure the "__dirname" for ES6 Modules path (because it is not available for modules in ES6 format).
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
// -----
//  We define the paths to find folders , files, images for executing required tasks.
const main = path.join(__dirname, "..", "..");
const logo = path.join(main, "Utils", "Assets", "Images", "Logo_full_wlg.png");
const install_backend = path.join(main, "Utils", "Configs", "Python");
const backend = path.join(main, "backend");
const frontend = path.join(main, "frontend");

// Optional
// --------
// const python = path.resolve(shell.exec("$PYTHONPATH"));

export default { main, logo, install_backend, backend, frontend };