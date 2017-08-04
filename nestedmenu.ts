//our root app component
// nested ngfor with if !if conditon
import {Component} from 'angular2/core'

@Component({
  selector: 'my-app',
  providers: [],
  template: `
    <ul>
      <template ngFor #item [ngForOf]="array">
        <li *ngIf="item.hasChild" >
        {{ item.name }}
         <ul>
          <template ngFor #child [ngForOf]="item.child">
           <li *ngIf="(item.hasChild)">{{ child.name }}</li>
          </template>
         </ul>
        </li>
         <li *ngIf="(!item.hasChild)">{{ item.name }}</li>
      </template>
    </ul>
  `,
  directives: []
})
export class App {
  ngOnInit() {
    this.array=[
        {name:"Ritesh",hasChild:true,child:[{name:"R1"},{name:"R2"}]}
        {name:"R1",hasChild:false,child:[{name:"R1"},{name:"R2"}]}
      ]
  }
}
