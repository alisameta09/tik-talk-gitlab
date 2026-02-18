import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'plural',
  standalone: true,
  pure: true,
})
export class PluralPipe implements PipeTransform {
  rules = new Intl.PluralRules('ru')

  transform(value: number): string {
    const category = this.rules.select(value)

    switch (category) {
      case 'one':
        return `${value} подписчик`
      case 'few':
        return `${value} подписчика`
      default:
        return `${value} подписчиков`
    }
  }
}
