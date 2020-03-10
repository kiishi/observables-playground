import { EventEmitter, testFn } from "./index";

describe("it should fucking work", () => {
    it("should call the necessary functions", async () => {
        const eventEmitterInstance = new EventEmitter({});
        eventEmitterInstance.createWebsocketEventSubscription(
            "private_message",
            () => {
                testFn();
            }
        );
        const mockPrivateMessageDispatcher = eventEmitterInstance.getObservableForEvent(
            "private_message"
        );
        mockPrivateMessageDispatcher?.next({ message: "hello world" });
        expect(testFn).toHaveBeenCalled()
    });
});
