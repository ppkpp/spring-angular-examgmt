import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden-page',
  template: `
    <div class="events forbidden">
      <h1>403 Forbidden</h1>
      <p>You do not have permission to access this resource.</p>
    </div>
  `,
  styles: [
    `
      .forbidden {
        text-align: center;
        margin-top: 50px;
      }
      h1 {
        color: red;
      }
    `,
  ],
})
export class ForbiddenPageComponent {}
