import Alert from './alert.js';

export default class Modal {
  constructor() {
    this.title = document.getElementById('modal-title');
    this.description = document.getElementById('modal-description');
    this.dueDate = document.getElementById('modal-due-date'); // Capturamos la fecha del modal
    this.btn = document.getElementById('modal-btn');
    this.completed = document.getElementById('modal-completed');
    this.alert = new Alert('modal-alert');

    this.todo = null;
  }

  setValues(todo) {
    this.todo = todo;
    this.title.value = todo.title;
    this.description.value = todo.description;
    this.dueDate.value = todo.dueDate || ''; // Asignamos la fecha (si existe)
    this.completed.checked = todo.completed;
  }

  onClick(callback) {
    this.btn.onclick = () => {
      if (!this.title.value || !this.description.value) {
        this.alert.show('Title and description are required');
        return;
      }

      $('#modal').modal('toggle');

      callback(this.todo.id, {
        title: this.title.value,
        description: this.description.value,
        dueDate: this.dueDate.value, // Mandamos la fecha nueva
        completed: this.completed.checked,
      });
    }
  }
}