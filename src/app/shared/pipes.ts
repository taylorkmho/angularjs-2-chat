import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';

const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({name: 'myReverse'})
export class ReversePipe implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }
}

@Pipe({name: 'myKeys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }
}

@Pipe({ name: 'myTimeAgo', pure: false })
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private _currentTimer: number;

  constructor(private _cdRef: ChangeDetectorRef) {
  }

  transform(value: Date | moment.Moment): string {
    const momentInstance = momentConstructor(value);
    this._removeTimer();
    const timeToUpdate = this._getSecondsUntilUpdate(momentInstance) * 1000;
    this._currentTimer = window.setTimeout(() => this._cdRef.markForCheck(), timeToUpdate);
    const secAgo = -momentInstance.diff(momentConstructor(),'seconds');
    console.log(secAgo);

    if (secAgo < 60) { // if under a minute
      return 'now';
    } else if (secAgo >= 60 && secAgo < 3600) { // if over a minute && under an hour
      return -momentInstance.diff(momentConstructor(), 'minutes') + 'm';
    } else if (secAgo >= 3600 && secAgo < 86400) { // if over an hour && < 1 day
      return -momentInstance.diff(momentConstructor(), 'hours') + 'h';
    } else if (secAgo >= 86400 && secAgo < 432000) { // if over a day && < 5 days
      return -momentInstance.diff(momentConstructor(), 'days') + 'd';
    } else if (secAgo >= 432000 && secAgo < 31556926) { // if over 5 days && < 1 year
      return momentConstructor(value).format('MMM D');
    } else { // else (>= 1 year)
      return momentConstructor(value).format('MMM D YY');
    }
  }

  ngOnDestroy(): void {
    this._removeTimer();
  }

  _removeTimer() {
    if (this._currentTimer) {
      window.clearTimeout(this._currentTimer);
      this._currentTimer = null;
    }
  }

  _getSecondsUntilUpdate(momentInstance: moment.Moment) {
    const howOld = Math.abs(momentConstructor().diff(momentInstance, 'minute'));
    if (howOld < 1) {
      return 1;
    } else if (howOld < 60) {
      return 30;
    } else if (howOld < 180) {
      return 300;
    } else {
      return 3600;
    }
  }
}
