import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'momentUtc'})
export class MomentUtcPipe implements PipeTransform {
  transform(value: moment.MomentInput): moment.Moment {
    return moment.utc(value);
  }
}
