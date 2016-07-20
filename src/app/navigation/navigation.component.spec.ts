import {
  async,
  inject,
  addProviders
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';

import { NavigationComponent } from './navigation.component';

describe('Navigation Component', () => {
  beforeEach(() => {
    addProviders([NavigationComponent]);
  });

  it('should ...', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(NavigationComponent).then((fixture) => {
      fixture.detectChanges();
    });
  })));

});
