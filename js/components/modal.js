export default class Modal {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentEditId = null;
    this.modalElement = document.getElementById('modal');
    this.btnSave = document.getElementById('modal-btn');
    this.titleInput = document.getElementById('modal-title');
    this.descriptionInput = document.getElementById('modal-description');
    this.dueDateInput = document.getElementById('modal-due-date');
    this.completedInput = document.getElementById('modal-completed');
    this.alertDiv = document.getElementById('modal-alert');
    
    this.attachEvents();
  }

  openForEdit(task) {
    this.currentEditId = task.id;
    this.titleInput.value = task.title;
    this.descriptionInput.value = task.description || '';
    this.dueDateInput.value = task.dueDate || '';
    this.completedInput.checked = task.completed;
    
    if (this.alertDiv) {
      this.alertDiv.classList.add('d-none');
    }
    
    $('#modal').modal('show');
  }

  saveEdit() {
    const titleValue = this.titleInput.value.trim();
    
    if (!titleValue) {
      if (this.alertDiv) {
        this.alertDiv.innerText = 'El título es obligatorio para la actividad.';
        this.alertDiv.classList.remove('d-none');
      }
      return;
    }

    if (this.currentEditId !== null) {
      this.model.editTodo(this.currentEditId, {
        title: titleValue,
        description: this.descriptionInput.value,
        dueDate: this.dueDateInput.value,
        completed: this.completedInput.checked
      });
      
      $('#modal').modal('hide');
      this.view.renderCards(this.model.getFilteredAndSearchedTodos());
      this.currentEditId = null;
    }
  }

  attachEvents() {
    if (this.btnSave) {
      this.btnSave.addEventListener('click', () => this.saveEdit());
    }
  }
}