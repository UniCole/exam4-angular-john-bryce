import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/models/event-model';
import { EventTypeModel } from 'src/app/models/event-type-model';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddComponent {

    public eventTypes: EventTypeModel[] = [];
    public event = new EventModel();

    public constructor(private dataService: DataService, private router: Router) { }

    public async ngOnInit() {
        try {
            this.eventTypes = await this.dataService.getAllEventTypes();
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async send() {
        try {
            await this.dataService.addEvent(this.event);
            alert("Event has been successfully added");
            this.router.navigateByUrl("/list");
        }
        catch (err: any) {
            alert(err.message);
        }
    }


}
