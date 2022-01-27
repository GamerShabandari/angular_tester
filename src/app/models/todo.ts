export class Todo {
    todoItem : string;
    isDone : boolean;

    constructor(newTodo:string){

        this.todoItem = newTodo;
        this.isDone = false;

    }
}