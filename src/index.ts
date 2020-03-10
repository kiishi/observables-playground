import { Subject, Observable } from "rxjs";
import code from "conectar-ws-test";

export class EventEmitter {
    private subjectStore: Map<string, Subject<any>> = new Map<
        string,
        Subject<any>
    >();
    private connection: any; // websocket connection

    constructor(websocket_connection: any) {
        this.connection = websocket_connection;
        // map actions here
        this.connection.onmessage = (message: any) => {
            switch (message.action) {
                case "private_message":
                    this.subjectStore.get("private_message")?.next(message);
                    break;
            }
        };
    }

    //   this would be used for testing alone
    public getObservableForEvent(event_name: string) {
        return this.subjectStore.get(event_name);
    }

    public async createWebsocketEventSubscription(
        event_name: string,
        reaction: (...x: any[]) => any
    ) {
        if (!this.subjectStore.has(event_name)) {
            this.subjectStore.set(event_name, new Subject());
        }
        this.subjectStore.get(event_name)?.subscribe(reaction);
    }

    //   private async subscribeToWebsocketEvent(event_name: string) {
    //     return;
    //   }
}

export const testFn = () => {
    console.log("running from tests");
    return true;
};
// trying it out
const main = async () => {
    const event = new EventEmitter({});
    await event.createWebsocketEventSubscription("deolu", message => {
        console.log(message);
    });
    //   imagine this is our test subscriber
    let newSubscriber = event.getObservableForEvent("deolu");
    newSubscriber?.next({ message: true });
    newSubscriber?.next({ message: false });
    newSubscriber?.next({ message: false });
};

main();

// code();
