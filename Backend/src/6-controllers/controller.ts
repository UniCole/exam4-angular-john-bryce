import express, { Request, Response, NextFunction } from "express";
import { EventModel } from "../4-models/event-model";
import logic from "../5-logic/logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/event-types
router.get("/event-types", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const familyMembers = await logic.getAllEventTypes();
        response.json(familyMembers);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/event-by-type/:eventTypeId
router.get("/event-by-type/:eventTypeId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const eventTypeId = request.params.eventTypeId;
        const events = await logic.getAllEventByType(eventTypeId);
        response.json(events);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/event
router.post("/events", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const event = new EventModel(request.body);
        const addedEvent = await logic.addNewEvent(event);
        response.status(201).json(addedEvent);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/events/:_id
router.delete("/events/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteEvent(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;

