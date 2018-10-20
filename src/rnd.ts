import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const source = interval(3000).pipe(take(5));

source.subscribe(
  x => {
    console.log('onNext', x, new Date());
  },
  e => {
    console.log('onError', e);
  },
  () => {
    console.log('onComplete', new Date());
  }
);
