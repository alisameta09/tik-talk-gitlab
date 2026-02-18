import { Component, forwardRef, HostBinding, HostListener, input, signal } from '@angular/core'
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'
import { SvgIconComponent } from '../index'
import { BehaviorSubject } from 'rxjs'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'stack-input',
  imports: [SvgIconComponent, AsyncPipe, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInputComponent),
    },
  ],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
})
export class StackInputComponent implements ControlValueAccessor {
  innerInput = ''
  #disabled = false

  isDuplicate = signal<boolean>(false)

  placeholder = input<string>()
  errorMessageName = input<string>()

  value$ = new BehaviorSubject<string[]>([])

  @HostBinding('class.disabled')
  get disabled() {
    return this.#disabled
  }

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: Event) {
    event.preventDefault()
    event.stopPropagation()

    if (!this.innerInput) return

    const currentValue = this.value$.value

    if (!new Set(currentValue).has(this.innerInput.toUpperCase())) {
      this.isDuplicate.set(true)
      this.value$.next([...currentValue, this.innerInput.toUpperCase()])
    }

    this.innerInput = ''
    this.onChange(this.value$.value)
  }

  writeValue(stack: string[] | null): void {
    if (!stack) {
      this.value$.next([])
      return
    }

    this.value$.next(stack)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.#disabled = isDisabled
  }

  onChange(value: string[] | null) {}

  onTouched() {}

  onTagDelete(index: number) {
    const tags = [...this.value$.value]
    tags.splice(index, 1)
    this.value$.next(tags)
    this.onChange(this.value$.value)
  }
}
