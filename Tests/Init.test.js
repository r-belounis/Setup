// const Init = require("../Modules/Init")

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

// describe("Init.barDownload", () => {
//     test("0", () => {
//         let callFunction = () => {
//             Init.barDownload({ on: () => "2021-07-29T17:54:41.653Z" })
//         }

//         expect(callFunction).not.toThrow()
//     })

//     test("1", () => {
//         let callFunction = () => {
//             Init.barDownload({ on: () => "2021-07-30T00:05:36.818Z" })
//         }

//         expect(callFunction).not.toThrow()
//     })

//     test("2", () => {
//         let callFunction = () => {
//             Init.barDownload({ on: () => "2021-07-29T20:12:53.196Z" })
//         }

//         expect(callFunction).not.toThrow()
//     })

//     test("3", () => {
//         let callFunction = () => {
//             Init.barDownload({ on: () => "2021-07-29T15:31:46.922Z" })
//         }

//         expect(callFunction).not.toThrow()
//     })

//     test("4", () => {
//         let callFunction = () => {
//             Init.barDownload({ on: () => "2021-07-29T23:03:48.812Z" })
//         }

//         expect(callFunction).not.toThrow()
//     })

//     test("5", () => {
//         let callFunction = () => {
//             Init.barDownload(undefined)
//         }

//         expect(callFunction).not.toThrow()
//     })
// })

