let tareas = []; // Lista de todas las tareas

// Cargar las tareas guardadas en localStorage al abrir la app
function cargarTareas() {
  const datos = localStorage.getItem('tareasChecklist');
  if (datos) {
    tareas = JSON.parse(datos);
    tareas.forEach(crearElementoTarea); // Mostrar tareas guardadas
  }
}

// Guardar las tareas actualizadas en localStorage
function guardarTareas() {
  localStorage.setItem('tareasChecklist', JSON.stringify(tareas));
}

// Añadir una nueva tarea
function agregarTarea() {
  const texto = document.getElementById('tareaInput').value.trim();
  if (!texto) return;

  const tarea = {
    texto,
    subtareas: []
  };

  tareas.push(tarea);
  guardarTareas();
  crearElementoTarea(tarea);
  document.getElementById('tareaInput').value = '';
}

// Mostrar las subtareas de una tarea
function renderizarSubtareas(ulSub, tarea) {
  ulSub.innerHTML = '';
  tarea.subtareas.forEach((sub) => {
    const liSub = document.createElement('li');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = sub.completa;
    check.onchange = () => {
      sub.completa = check.checked;
      guardarTareas();
    };

    const textoSub = document.createElement('span');
    textoSub.textContent = sub.texto;

    // Botón para editar subtarea
    const btnEditarSub = document.createElement('button');
    btnEditarSub.textContent = 'Editar';
    btnEditarSub.onclick = () => {
      const nuevoTexto = prompt('Editar subtarea:', sub.texto);
      if (nuevoTexto) {
        sub.texto = nuevoTexto;
        guardarTareas();
        renderizarSubtareas(ulSub, tarea);
      }
    };

    // Botón para eliminar subtarea
    const btnEliminarSub = document.createElement('button');
    btnEliminarSub.textContent = 'Eliminar';
    btnEliminarSub.onclick = () => {
      tarea.subtareas = tarea.subtareas.filter(s => s !== sub);
      guardarTareas();
      renderizarSubtareas(ulSub, tarea);
    };

    liSub.appendChild(check);
    liSub.appendChild(textoSub);
    liSub.appendChild(btnEditarSub);
    liSub.appendChild(btnEliminarSub);
    ulSub.appendChild(liSub);
  });
}

// Crear el elemento visual de una tarea con sus funciones
function crearElementoTarea(tarea) {
  const li = document.createElement('li');
  li.className = 'tarea';

  const titulo = document.createElement('h3');
  titulo.textContent = tarea.texto;

  // Botones para editar o eliminar la tarea
  const btnEditar = document.createElement('button');
  btnEditar.textContent = 'Editar';
  btnEditar.onclick = () => {
    const nuevoTexto = prompt('Editar tarea:', tarea.texto);
    if (nuevoTexto) {
      tarea.texto = nuevoTexto;
      titulo.textContent = nuevoTexto;
      guardarTareas();
    }
  };

  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar';
  btnEliminar.onclick = () => {
    tareas = tareas.filter(t => t !== tarea);
    guardarTareas();
    li.remove();
  };

  const contBotones = document.createElement('div');
  contBotones.className = 'botones-tarea';
  contBotones.appendChild(btnEditar);
  contBotones.appendChild(btnEliminar);

  // Lista de subtareas
  const ulSub = document.createElement('ul');
  ulSub.className = 'subtareas';
  renderizarSubtareas(ulSub, tarea);

  // Entrada para añadir subtarea
  const entradaSub = document.createElement('div');
  entradaSub.className = 'nueva-subtarea';

  const inputSub = document.createElement('input');
  inputSub.type = 'text';
  inputSub.placeholder = 'Añadir subtarea...';

  const botonSub = document.createElement('button');
  botonSub.textContent = 'Agregar';
  botonSub.onclick = () => {
    const texto = inputSub.value.trim();
    if (!texto) return;
    const nuevaSub = { texto, completa: false };
    tarea.subtareas.push(nuevaSub);
    guardarTareas();
    renderizarSubtareas(ulSub, tarea);
    inputSub.value = '';
  };

  entradaSub.appendChild(inputSub);
  entradaSub.appendChild(botonSub);

  li.appendChild(titulo);
  li.appendChild(contBotones);
  li.appendChild(ulSub);
  li.appendChild(entradaSub);

  document.getElementById('listaTareas').appendChild(li);
}

// Al iniciar la app, cargamos las tareas guardadas
cargarTareas();
