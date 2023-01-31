import { Component } from '@angular/core';
import { EventModel } from 'src/app/models/event-model';
import { EventTypeModel } from 'src/app/models/event-type-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {

    public eventTypes: EventTypeModel[] = [];
    public events: EventModel[] = [];
    public today = new Date().toISOString();

    public constructor(private dataService: DataService) { }

    public async ngOnInit() {
        try {
            this.eventTypes = await this.dataService.getAllEventTypes();
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async displayEvents(args: Event) {
        try {
            const selectElement = args.target as HTMLSelectElement;
            const eventTypeId = selectElement.value;
            this.events = await this.dataService.getEventsByType(eventTypeId);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async deleteMe(_id: string) {
        try {
            
            if(!window.confirm("Are you sure?")) return;

            await this.dataService.deleteEvent(_id);
            alert("Event has been deleted");
            
            // Refresh list:
            const index = this.events.findIndex(e => e._id === _id);
            this.events.splice(index, 1);
            
        }
        catch (err: any) {
            alert(err.message);
        }
    }
}
