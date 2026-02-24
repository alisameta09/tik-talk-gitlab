import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SvgIconComponent } from '../svg-icon/svg-icon.component'

@Component({
  selector: 'tt-show-modal-button',
  imports: [SvgIconComponent],
  templateUrl: './tt-show-modal-button.component.html',
  styleUrl: './tt-show-modal-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowModalButtonComponent {}
