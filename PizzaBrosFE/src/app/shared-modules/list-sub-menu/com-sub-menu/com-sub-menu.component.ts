import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-com-sub-menu',
  templateUrl: './com-sub-menu.component.html',
  styleUrls: ['./com-sub-menu.component.css']
})
export class ComSubMenuComponent implements OnInit {
  @Input() name: string ="";
  @Input() index: number=0;
  constructor() { }

  ngOnInit(): void {
  }

}
