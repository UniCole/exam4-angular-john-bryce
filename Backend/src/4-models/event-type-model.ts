import mongoose from "mongoose";

// 1. Interface
export interface IEventTypeModel extends mongoose.Document {
    eventName: string;
}

// 2. Schema
export const EventTypeSchema = new mongoose.Schema<IEventTypeModel>({
    eventName: {
        type: String,
        required: [true, "Missing event type"],
        minlength: [5, "Event's type cannot be less then 5 charts"],
        maxlength: [30, "Event's type cant exceed 30 charts"]        
    }
});

// 3. Model
export const EventTypeModel = mongoose.model<IEventTypeModel>("EventTypeModel", EventTypeSchema, "eventTypes");
