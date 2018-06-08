import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'since'
})
export class SincePipe implements PipeTransform {
    transform(value: string) {
        let past = Date.parse(value);
        let current = Date.parse((new Date()).toString());

        let minutes = Math.ceil((current - past) / 1000);
        let hours = Math.floor((current - past) / 1000 / 3600);
        let days = Math.floor((current - past) / 1000 / 3600 / 24);
        let months = Math.floor((current - past) / 1000 / 3600 / 24 / 30);
        let years = Math.floor((current - past) / 1000 / 3600 / 24 / 30 / 12);

        if (years > 1) {
            return years + '年';
        } else if (months >= 1) {
            return months + '月';
        } else if (days >= 1) {
            return days + '天';
        } else if (hours >= 1) {
            return hours + '小时';
        } else {
            return minutes + '分钟';
        }
    }
}