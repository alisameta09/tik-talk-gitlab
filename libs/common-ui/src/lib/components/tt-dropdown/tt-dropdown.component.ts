import { ChangeDetectionStrategy, Component, output } from '@angular/core'
import { SvgIconComponent } from '../svg-icon/svg-icon.component'

@Component({
  selector: 'tt-dropdown',
  imports: [SvgIconComponent],
  templateUrl: './tt-dropdown.component.html',
  styleUrl: './tt-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TtDropdownComponent {
  items = ['PROGRAMMING', 'TECHNOLOGY', 'EDUCATION', 'SPORT', 'OTHER']

  selectedItem = output<string>()

  emitItem(value: string) {
    this.selectedItem.emit(value)
  }
}
