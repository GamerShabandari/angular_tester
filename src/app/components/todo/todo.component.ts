import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  testImgUrl : string = "https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515303_10059.png"

  todo: Todo = new Todo("läsa");

  bild:string = ""

  searchedFilm: string = ""

  matchedFilm: string = ""

  matchedFilmImg: string = ""
  

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.todo.isDone = !this.todo.isDone
  }

  getMovieImg(){

    fetch("http://www.omdbapi.com/?t=alien&apikey=5ed1c386").then(response => response.json())
    .then(film => {

      let thisMovieImg:string = film.Poster;

      this.bild = thisMovieImg

      //return thisMovieImg

    })

    //return test

  }

  searchMovie(title:string){

    fetch("http://www.omdbapi.com/?t="+this.searchedFilm+"&apikey=5ed1c386").then(response => response.json())
    .then(film => {

      this.matchedFilm = film.Title;

      this.matchedFilmImg = film.Poster;

      //this.bild = thisMovieImg

      //return thisMovieImg

    })

  }

}
