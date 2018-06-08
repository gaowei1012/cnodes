import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'link'
})
export class LinkPipe implements PipeTransform {
    transform(value: string) {
        let noPrptocolSrcRegex = /src="\/\/([\S]+)"/gi;
        return value.replace(noPrptocolSrcRegex, 'src="https://$1"');
    }
}