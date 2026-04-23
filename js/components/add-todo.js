import Alert from './alert.js';

export default class AddTodo {
  constructor() {
    this.btn = document.getElementById('add');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    this.dueDate = document.getElementById('due_date');

    this.alert = new Alert('alert');
  }

  onClick(callback) {
    if (this.btn) {
      this.btn.onclick = () => {
        if (this.title.value === '') {
          this.alert.show('El título es obligatorio para crear la tarea');
        } else {
          this.alert.hide();
          callback(
            this.title.value, 
            this.description.value, 
            this.dueDate.value
          );

          this.title.value = '';
          this.description.value = '';
          this.dueDate.value = '';
        }
      };
    }
  }
}