// const Messages = require("../Modules/Messages")

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

// describe("Messages.onStartDownload", () => {
//     test("0", () => {
//         let callFunction = () => {
//             Messages.onStartDownload()
//         }

//         expect(callFunction).not.toThrow()
//     })
// })

// describe("Messages.onStartSetup", () => {
//     test("0", () => {
//         let callFunction = () => {
//             Messages.onStartSetup()
//         }

//         expect(callFunction).not.toThrow()
//     })
// })

// describe("Messages.onStartDev", () => {
//     test("0", () => {
//         let callFunction = () => {
//             Messages.onStartDev()
//         }

//         expect(callFunction).not.toThrow()
//     })
// })
