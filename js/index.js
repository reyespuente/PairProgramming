import Model from './model.js';
import View from './view.js';
import AddTodo from './components/add-todo.js';
import Filters from './components/filters.js';
import Modal from './components/modal.js';

const model = new Model();
const view = new View(model);
const addTodo = new AddTodo();
const filters = new Filters(model, view);
const modal = new Modal(model, view);

// Configurar la vista en el modelo
model.setView(view);

// Renderizar vista inicial
view.renderCards(model.getFilteredAndSearchedTodos());

// Configurar evento para añadir tareas
addTodo.onClick((title, description, dueDate) => {
  const newTodo = model.addTodo(title, description, dueDate);
  view.renderCards(model.getFilteredAndSearchedTodos());
});

// Configurar eventos dinámicos para checkboxes, editar y eliminar
function attachDynamicEvents() {
  // Checkboxes para marcar completado
  document.querySelectorAll('.task-checkbox').forEach(cb => {
    cb.removeEventListener('change', handleCheckboxChange);
    cb.addEventListener('change', handleCheckboxChange);
  });
  
  // Botones de editar
  document.querySelectorAll('.edit-task').forEach(btn => {
    btn.removeEventListener('click', handleEditClick);
    btn.addEventListener('click', handleEditClick);
  });
  
  // Botones de eliminar
  document.querySelectorAll('.delete').forEach(btn => {
    btn.removeEventListener('click', handleDeleteClick);
    btn.addEventListener('click', handleDeleteClick);
  });
}

function handleCheckboxChange(e) {
  const taskId = parseInt(e.target.getAttribute('data-id'));
  model.toggleCompleted(taskId);
  view.renderCards(model.getFilteredAndSearchedTodos());
}

function handleEditClick(e) {
  const taskId = parseInt(e.target.closest('.edit-task').getAttribute('data-id'));
  const task = model.getTodos().find(t => t.id === taskId);
  if (task) {
    modal.openForEdit(task);
  }
}

function handleDeleteClick(e) {
  const taskId = parseInt(e.target.closest('.delete').getAttribute('data-id'));
  if (confirm('¿Estás seguro de eliminar esta tarjeta?')) {
    model.removeTodo(taskId);
    view.renderCards(model.getFilteredAndSearchedTodos());
  }
}

const observer = new MutationObserver(() => {
  attachDynamicEvents();
});

const container = document.getElementById('taskBoardContainer');
if (container) {
  observer.observe(container, {
    childList: true,
    subtree: true
  });
}

attachDynamicEvents();

filters.onFilterChange(() => {
  view.renderCards(model.getFilteredAndSearchedTodos());
});

filters.onSearch(() => {
  view.renderCards(model.getFilteredAndSearchedTodos());
});

// Ocultar la tabla original si existe
const tableElement = document.getElementById('table');
if (tableElement) {
  tableElement.style.display = 'none';
}