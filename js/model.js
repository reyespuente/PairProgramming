export default class Model {
  constructor() {
    this.view = null;
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
      if (this.todos.length > 0) {
        this.currentId = Math.max(...this.todos.map(t => t.id)) + 1;
      } else {
        this.todos = this.getDefaultTodos();
        this.currentId = this.todos[this.todos.length - 1].id + 1;
      }
    } else {
      this.todos = this.getDefaultTodos();
      this.currentId = this.todos[this.todos.length - 1].id + 1;
    }
  }

  getDefaultTodos() {
    return [
      {
        id: 0,
        title: 'Aprender JavaScript avanzado',
        description: 'Completar curso de JS moderno y promesas',
        dueDate: '2026-05-20',
        completed: false,
      },
      {
        id: 1,
        title: 'Diseñar interfaz espacial',
        description: 'Implementar tarjetas flotantes con efecto glassmorfismo',
        dueDate: '2026-05-15',
        completed: true,
      },
      {
        id: 2,
        title: 'Implementar filtros y búsqueda',
        description: 'Añadir sistema de filtrado por estado y búsqueda textual',
        dueDate: '2026-04-30',
        completed: false,
      }
    ];
  }

  setView(view) {
    this.view = view;
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    if (this.view) {
      this.view.renderCards(this.getFilteredAndSearchedTodos());
    }
  }

  getTodos() {
    return this.todos.map((todo) => ({...todo}));
  }

  getFilteredAndSearchedTodos() {
    let filtered = [...this.todos];
    
    const selectedFilter = document.querySelector('input[name="type"]:checked');
    const filterValue = selectedFilter ? selectedFilter.value : 'all';
    
    if (filterValue === 'completed') {
      filtered = filtered.filter(t => t.completed === true);
    } else if (filterValue === 'uncompleted') {
      filtered = filtered.filter(t => t.completed === false);
    }
    
    // Obtener término de búsqueda
    const searchInput = document.querySelector('input[name="words"]');
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchTerm) ||
        (t.description && t.description.toLowerCase().includes(searchTerm))
      );
    }
    
    return filtered;
  }

  findTodoIndex(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  toggleCompleted(id) {
    const index = this.findTodoIndex(id);
    if (index !== -1) {
      this.todos[index].completed = !this.todos[index].completed;
      this.save();
    }
  }

  editTodo(id, values) {
    const index = this.findTodoIndex(id);
    if (index !== -1) {
      Object.assign(this.todos[index], values);
      this.save();
    }
  }

  addTodo(title, description, dueDate) {
    const todo = {
      id: this.currentId++,
      title,
      description: description || '',
      dueDate: dueDate || '',
      completed: false,
    };
    
    this.todos.push(todo);
    this.save();
    return {...todo};
  }

  removeTodo(id) {
    const index = this.findTodoIndex(id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.save();
    }
  }
}