import { Component, input } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-title',
  imports: [TuiButton],
  templateUrl: './title.component.html',
})
export class TitleComponent {
  title = input('Title');
}
