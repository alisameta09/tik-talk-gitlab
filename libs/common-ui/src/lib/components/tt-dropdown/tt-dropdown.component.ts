import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'
import { SvgIconComponent } from '../svg-icon/svg-icon.component'

@Component({
  selector: 'tt-dropdown',
  imports: [SvgIconComponent],
  templateUrl: './tt-dropdown.component.html',
  styleUrl: './tt-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TtDropdownComponent {
  item = input<string>('')

  selectedItems = input<string[]>([])
  itemChange = output<string>()

  emitItem(item: string) {
    this.itemChange.emit(item)
  }
}
