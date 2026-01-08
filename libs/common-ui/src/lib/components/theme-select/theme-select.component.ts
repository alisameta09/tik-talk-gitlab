import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input, Renderer2,
  signal,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommunityTheme } from '@tt/shared';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'theme-select',
  imports: [FormsModule, SvgIconComponent],
  templateUrl: './theme-select.component.html',
  styleUrl: './theme-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ThemeSelectComponent),
    },
  ],
})
export class ThemeSelectComponent implements ControlValueAccessor {
  themes = Object.values(CommunityTheme);

  placeholder = input<string>('');

  selectedTheme = signal<string>('');

  innerInput = ''

  isDropdownOpened = false;
  showPlaceholder = true;

  elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.isDropdownOpened && !this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpened = false;
    }
  }

  onChange(val: string | null) {}

  onTouched() {}

  writeValue(value: string): void {
    this.selectedTheme.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {}

  onDropdownOpen() {
    this.isDropdownOpened = true
  }

  onSelectTheme(theme: string) {
    this.selectedTheme.set(theme)
    this.onChange(theme)
    this.showPlaceholder = false
  }

  onThemeDelete() {
    this.selectedTheme.set('')
    this.onChange(this.selectedTheme())
    this.showPlaceholder = true
  }
}
