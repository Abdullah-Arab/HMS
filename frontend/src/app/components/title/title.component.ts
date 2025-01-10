import { Component, Input, input } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-title',
  imports: [TuiButton],
  templateUrl: './title.component.html',
})
export class TitleComponent {
  title = input.required();
  actionTitle = input.required();
  @Input() onTap!: () => void; // Function input

  executeAction() {
    if (this.onTap) {
      console.log('Executing onTap');
      this.onTap();
    } else {
      console.error('onTap is not defined');
    }
  }
}
