export default class View {
  constructor(model) {
    this.model = model;
    this.container = document.getElementById('taskBoardContainer');
  }

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  renderCards(tasks) {
    if (!this.container) return;

    if (!tasks || tasks.length === 0) {
      this.container.innerHTML = `<div class="empty-space-message">
        <i class="fas fa-space-shuttle fa-2x mb-3"></i><br>
        El espacio está vacío.
      </div>`;
      return;
    }

    let cardsHTML = '';
    for (let task of tasks) {
      const isCompleted = task.completed;
      const titleClass = isCompleted ? 'completed-title' : '';
      const dueDateFormatted = task.dueDate ? task.dueDate : 'Sin fecha';
      const completedBadge = isCompleted 
        ? '<span class="completed-badge"><i class="fas fa-check-circle"></i> Realizado</span>' 
        : '<span class="completed-badge" style="background:#343a40; color:#ffc107;"><i class="far fa-clock"></i> Pendiente</span>';
      
      cardsHTML += `
        <div class="task-card" data-task-id="${task.id}">
          <div class="card-header-custom">
            <div class="card-title">
              <span class="${titleClass}">${this.escapeHtml(task.title)}</span>
              ${isCompleted ? '<i class="fas fa-check-circle text-success" style="font-size:1.2rem;"></i>' : '<i class="fas fa-circle-notch text-muted" style="font-size:1rem;"></i>'}
            </div>
          </div>
          <div class="card-body-content">
            <div class="task-description">
              <i class="fas fa-pen-fancy mr-1 text-info"></i> ${task.description ? this.escapeHtml(task.description) : 'Sin descripción'}
            </div>
            <div class="due-date-badge">
              <i class="far fa-calendar-alt"></i> 
              <span>${dueDateFormatted}</span>
            </div>
            <div class="task-status">
              <label class="custom-check">
                <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${isCompleted ? 'checked' : ''}>
                <span class="status-label">Marcar como completada</span>
              </label>
              ${completedBadge}
            </div>
          </div>
          <div class="card-actions">
            <button class="btn-icon edit-task" data-id="${task.id}" title="Editar tarea"><i class="fas fa-edit"></i> Editar</button>
            <button class="btn-icon delete" data-id="${task.id}" title="Eliminar tarea"><i class="fas fa-trash-alt"></i> Eliminar</button>
          </div>
        </div>
      `;
    }
    this.container.innerHTML = cardsHTML;
  }
}