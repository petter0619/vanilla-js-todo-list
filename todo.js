let state = [];

const addTodo = (newTodo) => {
  state.push(newTodo);
  dispatchEvent(new Event('statechange'));
};

const toggleTodoIsDone = (e) => {
  const todoId = e.target.dataset.todoid;
  state[todoId].isDone = !state[todoId].isDone;
  dispatchEvent(new Event('statechange'));
};

const deleteTodo = (e) => {
  const todoId = e.target.dataset.todoid;
  state.splice(todoId, 1);
  dispatchEvent(new Event('statechange'));
};

const addToLocalStorage = (key, value) => localStorage.setItem(key, value);

const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

const render = (htmlString, selectedElement) => {
  const el = selectedElement;
  el.innerHTML = htmlString;
};

const createTodoHTML = ({ text, isDone }, id) => `
    <li class="list-item ${isDone ? 'list-item--done' : 'list-item--pending'}">
        <input class="list-item__checkbox" type="checkbox" id="item${id}" ${isDone ? 'checked' : ''} data-todoid="${id}">
        <label class="list-item__label ${isDone ? 'list-item__label--done' : ''}" for="item${id}">${text}</label>
        ${isDone ? `<button class="list-item__delete-btn" data-todoid="${id}">X</button>` : ''}
    </li>`;

const createTodoListHTML = (todoArray) => {
  const pendingTodos = todoArray.filter((todo) => !todo.isDone).length;
  const completeTodos = todoArray.filter((todo) => todo.isDone).length;
  const titleHTML = `
        <h3 class="list__title list__title--pending">Pending: ${pendingTodos}</h3>
        <h3 class="list__title list__title--done">Done: ${completeTodos}</h3>
    `;
  const todosHTML = todoArray.map((todo, index) => createTodoHTML(todo, index)).join('');
  return todosHTML.length > 0 ? titleHTML + todosHTML : todosHTML;
};

const createEventListeners = () => {
  document.querySelectorAll('.list-item__delete-btn').forEach((btn) => {
    btn.addEventListener('click', deleteTodo);
  });
  document.querySelectorAll('.list-item__checkbox').forEach((btn) => {
    btn.addEventListener('change', toggleTodoIsDone);
  });
};

const createNewTodo = (e) => {
  e.preventDefault();
  const form = e.target;
  if (form.todo.value === '') return;
  const newTodo = {
    text: form.todo.value,
    isDone: false,
  };
  addTodo(newTodo);
  form.reset();
};

const handleStatechange = () => {
  render(createTodoListHTML(state), document.querySelector('.list'));
  createEventListeners();
  addToLocalStorage('todoSave', JSON.stringify(state));
};

document.querySelector('form').addEventListener('submit', createNewTodo);

window.addEventListener('statechange', handleStatechange);

if (getFromLocalStorage('todoSave')) state = getFromLocalStorage('todoSave');
if (state.length > 0) {
  render(createTodoListHTML(state), document.querySelector('.list'));
  createEventListeners();
}
