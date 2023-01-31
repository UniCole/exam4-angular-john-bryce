import mongoose from "mongoose";
import { EventTypeModel } from "./event-type-model";

// 1. Interface
export interface IEventModel extends mongoose.Document {
    eventTypeId: mongoose.Schema.Types.ObjectId;
    dateTime: string;
    description: string;
    address: string;
    guestAmount: number;
}

// 2. Schema
export const EventSchema = new mongoose.Schema<IEventModel>({
    eventTypeId: {
        type: mongoose.Schema.Types.ObjectId
    },
    dateTime: {
        type: String,
        required: [true, "Missing date and time"]
    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minlength: [2, "Description cannot be less then 2 charts"],
        maxlength: [100, "Description cant exceed 100 charts"]
    },
    address: {
        type: String,
        required: [true, "Missing address"],
        minlength: [2, "Address cannot be less then 2 charts"],
        maxlength: [100, "Address cant exceed 100 charts"]
    },
    guestAmount: {
        type: Number,
        required: [true, "Missing amount of guests"],
        min: [5, "The amount of guests cannot be less than 5"],
        max: [1000, "The amount of guests cannot be greater than 1000"]
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});


EventSchema.virtual("eventTypes", {
    ref: EventTypeModel,
    localField: "eventTypeId",
    foreignField: "_id",
    justOne: true
});

// 3. Model
export const EventModel = mongoose.model<IEventModel>("EventModel", EventSchema, "events");
