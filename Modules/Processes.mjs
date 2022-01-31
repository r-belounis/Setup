import path from "path";
import shell from "shelljs";

// Processes
// ---------
//  We define the processes names for executing required tasks.
const python = path.resolve(shell.exec('$PYTHONPATH').split(' ').lastIndexOf().join(''));
console.log(python)

export default { python };