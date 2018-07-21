import * as moment from "moment";
import "moment/locale/es";
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fromNow'
})
export class FromNowPipe implements PipeTransform{
    transform(value: number): string {
        return moment(value).fromNow();
    }
}
