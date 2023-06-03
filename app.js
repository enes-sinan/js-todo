const task_text = $('.input-add-todo');
const btn_task_text = $('.btn-add-todo');
const btn_check = $('.check');
const btn_edit = $('.edit');
const btn_delete = $('.delete');

$(document).ready(() => {
  See_Tasks();
});

// add task
$(document).on('click', '.btn-add-todo', () => {
  Add_Task();
  See_Tasks();
});

// delete task
$(document).on('click', '.delete', (element) => {
  let task_id = $(element.target).parent().find('.my-todo-text').attr('task_id');
  Delete_Task(task_id);
  See_Tasks();
});

// change task active or not
$(document).on('click', '.check', (element) => {
  let task_id = $(element.target).parent().find('.my-todo-text').attr('task_id');
  Active_Task(task_id);
  See_Tasks();
});

// edit task
$(document).on('click', '.edit', (element) => {
  let task_id = $(element.target).parent().find('.my-todo-text').attr('task_id');
  let new_task_value = $(element.target).parent().find('.my-todo-text').val();
  Change_Task(task_id, new_task_value);
  See_Tasks();
});

function Add_Task() {
  const task_new_index =
    JSON.parse(localStorage.getItem('tasks')) === null ? 0 : JSON.parse(localStorage.getItem('tasks')).length + 1;

  // const text = task_text.val() == "" ? alert("todo bos olomaz !") : JSON.stringify(task_text.val()).replaceAll('"', "");
  const text = task_text.val().trim();

  if (text) {
    Add_Storage({ id: task_new_index, value: text, task_active: 'yes' });
  } else {
    alert('todo bos olomaz !');
    return;
  }
}

// delete task
function Delete_Task(index) {
  let parse_task = JSON.parse(localStorage.getItem('tasks'));
  let task_index = parse_task.findIndex((task) => task.id == index);
  console.log(task_index, index);
  parse_task.splice(task_index, 1);
  localStorage.setItem('tasks', JSON.stringify(parse_task));
}

// change task text
function Change_Task(index, text) {
  let parse_task = JSON.parse(localStorage.getItem('tasks'));
  let task_index = parse_task.findIndex((task) => task.id == index);
  parse_task[task_index].value = text;
  localStorage.setItem('tasks', JSON.stringify(parse_task));
}

// check task active or not
function Active_Task(index) {
  let parse_task = JSON.parse(localStorage.getItem('tasks'));
  let task_index = parse_task.findIndex((task) => task.id == index);
  console.log(task_index, parse_task[task_index].task_active);
  if (parse_task[task_index].task_active == 'yes') {
    parse_task[task_index].task_active = 'task_disable';
  } else {
    parse_task[task_index].task_active = 'yes';
  }
  console.log(task_index, parse_task[task_index].task_active);
  localStorage.setItem('tasks', JSON.stringify(parse_task));
}

function See_Tasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let inner = '';
  for (let index = 0; index < tasks.length; index++) {
    let task_active = tasks[index].task_active === 'yes' ? '' : 'task_disable';

    inner += `<div class="my-todo">
    <div class="check">*</div>
    <input class="my-todo-text ${task_active}" type="text" value="${tasks[index].value}" task_id="${tasks[index].id}" />
    <div class="edit">/</div>
    <div class="delete">X</div>
  </div>`;
  }
  $('.list-todos').html(inner);
}

function Add_Storage(element) {
  let tasks = localStorage.getItem('tasks') || [element];
  if (tasks) {
    tasks = JSON.parse(tasks);
    tasks.push(element);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
