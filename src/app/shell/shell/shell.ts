import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent }
    from '../../shared/sidebar/sidebar';

@Component({
    selector: 'app-shell',
    standalone: true,
    imports: [
        RouterOutlet,
        SidebarComponent
    ],
    templateUrl: './shell.html',
    styleUrl: './shell.css'
})
export class Shell {
}