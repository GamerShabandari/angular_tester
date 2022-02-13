import { compileClassMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit {

  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  latitudePos:number = 0
  longitudePos:number = 0

  source = of(7, 8, 9);

  prenumerant = {
    next: (x: number) => { console.log(x); },
    error: (err: any) => { console.log("special error", err); },
    complete: () => {
      console.log("complete with this");
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////


  constructor() { }

  ngOnInit(): void {

    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////


    this.source.subscribe(this.prenumerant);


    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////

    let slowObservable = new Observable<number>((o) => {
      let rowOfNumbers: number[] = [10, 11, 12, 13, 14, 15];
      let timeout: NodeJS.Timeout;

      function getValue(i: number) {
        timeout = setTimeout(() => {
          o.next(rowOfNumbers[i])
          if (i === rowOfNumbers.length - 1) {
            o.complete();
          }
          else {
            getValue(++i)
          }

        }, 2000);

      }

      getValue(0);

      return {
        unsubscribe(){
          clearTimeout(timeout);
        }
      }

    })


    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////

    let geoObserveble = new Observable<GeolocationPosition>((o)=>{
      let watchId: number;

      if("geolocation" in navigator){
        watchId = navigator.geolocation.watchPosition(
          (position:GeolocationPosition)=>{
            o.next(position);
          },
          (error:GeolocationPositionError) => {
            o.error(error)
          });
      } else{
        o.error("geolocation not available in browser, update your old ass shit")
      }

      return{
        unsubscribe(){
          navigator.geolocation.clearWatch(watchId)
        }
      }

    });


    let observable = new Observable<number>((o) => {
      o.next(1);
      o.next(2);
      o.next(3);

      o.complete()

    })

    let observer = {
      next: (n: number) => {
        console.log(n);
      },
      error: (error: any) => {
        console.log("error");

      },
      complete: () => {
        console.log("no more data");

      }

    }

    let geoObserver = {
      next:(pos:GeolocationPosition) => {
        console.log(pos);
        this.latitudePos = pos.coords.latitude
        this.longitudePos = pos.coords.longitude
      },
      error:(e:any) => {console.log(e, "error");
      },
      complete: () => {"finito, done here"}
    }

    geoObserveble.subscribe(geoObserver)

    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////


    //observable.subscribe(observer)
    slowObservable.subscribe(observer)

    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////


  }
};
