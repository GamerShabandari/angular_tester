import { compileClassMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit {

  source = of(7,8,9);

  prenumerant = {
    next: (x:number) => {console.log(x);},
    error: (err:any) => {console.log("special error", err);},
    complete: () => {console.log("complete with this");
    }
  }

  constructor() { }

  ngOnInit(): void {

    this.source.subscribe(this.prenumerant);

    let observable = new Observable<number>((o)=>{
      o.next(1);
      o.next(2);
      o.next(3);

      o.complete()

    })

    let observer = {
      next:(n:number) => {
        console.log(n);
      },
      error:(error:any) =>{
        console.log("error");
        
      },
      complete: () => {
        console.log("no more data");
        
      }

    }

    observable.subscribe(observer)

  }
};
