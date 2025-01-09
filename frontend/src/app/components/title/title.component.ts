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
  @Input() onTap!: () => void; // Pass a function as `Input`

  excuteAction() {
    if (this.onTap) {
      this.onTap(); // Execute the function passed as input
    }
  }
}
