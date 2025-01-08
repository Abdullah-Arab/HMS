import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { TuiAccordion } from '@taiga-ui/kit';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiAccordion, TuiIcon],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'World';
}
