import { hot, cold, getTestScheduler } from 'jasmine-marbles';
import { interval, Observable, from, never, NEVER, of, EMPTY } from 'rxjs';
import { take, share, map, filter } from 'rxjs/operators';

describe('Marble Syntax', () => {
  it('emits no items but terminates normally', () => {
    expect(EMPTY).toBeObservable(cold('|'));
  });
  it('emits no items and does not terminate', () => {
    expect(NEVER).toBeObservable(cold('-'));
    expect(NEVER).toBeObservable(cold('-----'));
  });
  it('emits no items and terminates with an error', () => {
    expect(EMPTY).toBeObservable(cold('|'));
  });
});
