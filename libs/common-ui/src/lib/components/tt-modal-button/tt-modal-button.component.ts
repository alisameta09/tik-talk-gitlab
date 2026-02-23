import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SvgIconComponent } from '../svg-icon/svg-icon.component'

@Component({
  selector: 'tt-modal-button',
  imports: [SvgIconComponent],
  templateUrl: './tt-modal-button.component.html',
  styleUrl: './tt-modal-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalButtonComponent {}
