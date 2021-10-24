import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-sub-menu',
  templateUrl: './list-sub-menu.component.html',
  styleUrls: ['./list-sub-menu.component.css']
})
export class ListSubMenuComponent implements OnInit {

  @Input() listProducts: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
