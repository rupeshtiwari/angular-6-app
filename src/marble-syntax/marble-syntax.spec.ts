import { cold } from 'jasmine-marbles';
import { NEVER, EMPTY } from 'rxjs';

describe('Marble Syntax', () => {
  it('emits no items but terminates normally', () => {
    expect(EMPTY).toBeObservable(cold('|'));
  });

  it('emits no items and does not terminate', () => {
    expect(NEVER).toBeObservable(cold('-'));
    expect(NEVER).toBeObservable(cold('-----'));
  });
});
