import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: '<svg:use [attr.href]="href()"></svg:use>',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  icon = input<string>('')

  href = computed(() => `/assets/svg/${this.icon()}.svg#${this.icon()}`)
}
