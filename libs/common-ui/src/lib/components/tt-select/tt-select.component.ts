import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core'
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'
import { SvgIconComponent } from '../svg-icon/svg-icon.component'
import { TtDropdownComponent } from '../tt-dropdown/tt-dropdown.component'
import { PortalComponent } from '../portal/portal.component'

@Component({
  selector: 'tt-select',
  imports: [FormsModule, SvgIconComponent, TtDropdownComponent, PortalComponent],
  templateUrl: './tt-select.component.html',
  styleUrl: './tt-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtSelectComponent),
    },
  ],
})
export class TtSelectComponent implements ControlValueAccessor {
  elementRef = inject(ElementRef)

  placeholder = input<string>('')

  selectedItem = signal<string>('')
  isDropdownOpened = signal<boolean>(false)

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.isDropdownOpened() && !this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpened.set(false)
    }
  }

  onChange(val: string | null) {}

  onTouched() {}

  writeValue(value: string): void {
    this.selectedItem.set(value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {}

  onToggleDropdown() {
    this.isDropdownOpened.set(!this.isDropdownOpened())
  }

  onSelectItem(value: string) {
    this.selectedItem.set(value)
    this.onChange(value)
  }

  onDeleteItem() {
    this.selectedItem.set('')
    this.onChange(this.selectedItem())
  }
}
