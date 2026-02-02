import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core'
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'tt-form-input',
  imports: [FormsModule],
  templateUrl: './tt-form-input.component.html',
  styleUrl: './tt-form-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtFormInputComponent),
    },
  ],
})
export class TtFormInputComponent implements ControlValueAccessor {
  type = input<'text'>('text')
  placeholder = input<string>()

  onChange: any
  onTouched: any
  value: string | null = null

  writeValue(val: string | null): void {
    this.value = val
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(): void {}

  onModelChange(val: string | null) {
    this.onChange(val)
  }
}
