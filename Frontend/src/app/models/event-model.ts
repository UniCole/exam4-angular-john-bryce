import { EventTypeModel } from "./event-type-model";

export class EventModel {
    _id: string;
    eventTypeId: string;
    dateTime: string;
    description: string;
    address: string;
    guestAmount: number;
    eventTypes: EventTypeModel;
}
