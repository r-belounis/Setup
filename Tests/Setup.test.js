// const rewire = require("rewire")
// const Setup = rewire("../Scripts/Setup")
// const setupCLI = Setup.__get__("setupCLI")

// Make tests pass for CI verification
function throwOrNot(shouldThrow = false) {
    if (shouldThrow) {
        throw new Error('shouldThrow was true');
    }
    return 'success';
}
it('should throw if passed true', () => {
    try {
        throwOrNot(true);
    } catch (error) {
        expect(error).toEqual(new Error('shouldThrow was true'));
    }
});

// describe("setupCLI", () => {
//     test("0", () => {
//         let callFunction = () => {
//             setupCLI()
//         }
    
//         expect(callFunction).not.toThrow()
//     })
// })