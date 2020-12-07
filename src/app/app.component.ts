import { Component } from '@angular/core';

@Component({
  selector: 'memo-root',
  template: `
  <div class="container">
    <div class="left-col">
      <memo-info-board></memo-info-board>
    </div>
    <div class="right-col">
      <memo-game></memo-game>
    </div>
  </div>
  `,
  styles: [
    '.container {display: flex; flex-direction: row; height: 100vh;}',
    '.left-col { margin: 0; flex-grow: 0.45;}',
    '.right-col { margin: 0 auto; flex-grow: 1;}']
})
// width: 35%;
// width: 65%;
export class AppComponent {
  title = 'ng-memory';
}
