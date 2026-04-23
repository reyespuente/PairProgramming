import { jest } from '@jest/globals';
import Model from '../js/model.js';

beforeEach(() => {
    global.localStorage = {
        getItem: jest.fn(() => null),
        setItem: jest.fn(),
    };
});

test('HU1: Agregar una tarea correctamente al modelo', () => {
    const model = new Model();
    const initialLength = model.getTodos().length;

    // Función para añadir tareas
    const newTodo = model.addTodo('Aprender XP', 'Estudiar Pair Programming');

    // Criterios de aceptación
    expect(newTodo.title).toBe('Aprender XP');
    expect(newTodo.description).toBe('Estudiar Pair Programming');
    expect(newTodo.completed).toBe(false);
    expect(model.getTodos().length).toBe(initialLength + 1);
});