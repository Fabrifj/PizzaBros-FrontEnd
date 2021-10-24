import { Component, OnInit, OnChanges, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.css']
})
export class ReusableTableComponent implements OnChanges {


  @Input() datos : any;
  @Input() columnas: any;
  //@Input() buttons : boolean = false;
  @Input() buttonNames : string[] | undefined;

  //['name','kevin']
  //bool yes, solo eso, bool no, quitar eso
  @Input() filtros : [string, string, boolean][] = [] ;

  @Output() parentMethod = new EventEmitter<any>();


  

  constructor() { }


  ngOnInit(){
   
    this.filtros.forEach(filtro => {
      
      console.log(filtro);
      console.log(filtro[0]);
      console.log(filtro[1]);
      console.log(filtro[2]);
      console.log("-----------")
    });
    


    

  }

  ngOnChanges(){



  }

  pressedbtn(namefunction:string,object:any){
   
    this.parentMethod.emit([namefunction,object])
    

  }

  


}
