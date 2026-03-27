import Model from '../model.js';

beforeEach(() => {
    global.localstorage = {
        getItem: jest.fn(() => null),
        setItem: jest.fn(),
    };
});

test('HU1: Agregar una tarea correctamente al modelo', () => {
    const model = new Model();
    const initialLenght = model.getTodos().leght;

    //Función para añadir tareas
    const newTodo = model.addTodo('Aprender XP', 'Estudiar Pair Programming');

    //criterios de aceptación
    expect(newTodo.title).toBe('Aprender XP');
    expect(newTodo.description).toBe('Estudiar Pair Programming');
    expect(newTodo.completed).toBe('false');
    expect(model.getTodos().lenght).toBe(initialLenght + 1);

});