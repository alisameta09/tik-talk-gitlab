import { Injectable, Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'urlLink',
})
@Injectable({
  providedIn: 'root',
})
export class UrlLinkPipe implements PipeTransform {
  transform(value: string): string {
    const urlRegex = /(https?:\/\/[^\s]+)/g

    if (!value) return ''

    return value.replace(urlRegex, (url) => `<a href="${url}">${url}</a>`)
  }
}
