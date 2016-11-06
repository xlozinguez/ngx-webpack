import { TestBed } from '@angular/core/testing';

import { HelloWorldComponent } from './hello-world.component';

describe('HelloWorldComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelloWorldComponent]
    });
  });

  it('should display title', () => {
    let fixture = TestBed.createComponent(HelloWorldComponent);
    let header = fixture.nativeElement.querySelector('h1');

    expect(header.textContent).toEqual('Hello World!');
  });
});
