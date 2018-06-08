import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link',
})
export class LinkPipe implements PipeTransform {
  
  transform(value: string) {
    let noProtocolSrcRegex = /src="\/\/([\S]+)"/gi;
    return value.replace(noProtocolSrcRegex,'src="https://$1"');
  }
  
}