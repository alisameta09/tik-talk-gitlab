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
import { CommunityTheme } from '@tt/shared'
import { SvgIconComponent } from '../svg-icon/svg-icon.component'

@Component({
  selector: 'tt-select',
  imports: [FormsModule, SvgIconComponent],
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
  themes = Object.values(CommunityTheme)

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

  onSelectItem(theme: string) {
    this.selectedItem.set(theme)
    this.onChange(theme)
  }

  onDeleteItem() {
    this.selectedItem.set('')
    this.onChange(this.selectedItem())
  }
}
