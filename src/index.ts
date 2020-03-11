import { Subject, Observable } from "rxjs";

class EventEmitter {
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
        if(!this.subjectStore.has(event_name)){
            throw new Error("event does not exist")
        }
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
}

export const testFn = () : boolean => {
    console.log("running from tests");
    return true;
};


const eventEmitter = new EventEmitter({})
// create a subscription
eventEmitter.createWebsocketEventSubscription("private_message" , ()=>{
    testFn()
})
export {eventEmitter}

// uncomment to try out
// const main = async () => {
//     const event = new EventEmitter({});
//     await event.createWebsocketEventSubscription("deolu", message => {
//         console.log(message);
//     });
//     //   imagine this is our test subscriber
//     let newSubscriber = event.getObservableForEvent("deolu");
//     newSubscriber?.next({ message: true });
//     newSubscriber?.next({ message: false });
//     newSubscriber?.next({ message: false });
// };

// main();

// code();
