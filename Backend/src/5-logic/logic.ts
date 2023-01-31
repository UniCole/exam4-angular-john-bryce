import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import { EventModel, IEventModel } from "../4-models/event-model";
import { EventTypeModel, IEventTypeModel } from "../4-models/event-type-model";

// Get all event types: 
function getAllEventTypes(): Promise<IEventTypeModel[]> {
    return EventTypeModel.find().exec();
}

// Get events by event type: 
function getAllEventByType(eventTypeId: string): Promise<IEventModel[]> {
    return EventModel.find({ eventTypeId }).populate("eventTypes").exec();
}

// Add new event: 
function addNewEvent(event: IEventModel): Promise<IEventModel> {
    const errors = event.validateSync();
    if (errors) throw new ValidationErrorModel(errors.message);
    return event.save();
}

// Delete assignment: 
async function deleteEvent(_id: string): Promise<void> {
    const deletedEvent = await EventModel.findByIdAndDelete(_id);
    if (!deletedEvent) throw new ResourceNotFoundErrorModel(_id);
}


export default {
    getAllEventTypes,
    getAllEventByType,
    addNewEvent,
    deleteEvent
};