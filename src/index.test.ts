import * as module from "./index";

// how to test
describe("it should fucking work", () => {

    it("should call the necessary functions", async () => {
        jest.spyOn(module, "testFn").mockImplementation(() => true);
        const eventEmitterInstance = module.eventEmitter
        const mockPrivateMessageDispatcher = eventEmitterInstance.getObservableForEvent(
            "private_message"
        );
        // seun mocking private_message payload
        mockPrivateMessageDispatcher?.next({ message: "hello world" });
        expect(module.testFn).toHaveBeenCalled();
    });
});
