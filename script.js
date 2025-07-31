let tareas = []; // 🧠 Arreglo principal donde se guardan todas las tareas y sus subtareas

// 🔄 Carga las tareas desde el almacenamiento local del navegador al iniciar la app
function cargarTareas() {
  const datos = localStorage.getItem('tareasChecklist'); // Busca datos guardados
  if (datos) {
    tareas = JSON.parse(datos); // Convierte los datos de texto a objeto JavaScript
    tareas.forEach(crearElementoTarea); // Muestra cada tarea en pantalla
  }
}

// 💾 Guarda las tareas actuales en el almacenamiento local del navegador
function guardarTareas() {
  localStorage.setItem('tareasChecklist', JSON.stringify(tareas)); // Convierte las tareas en texto
}

// ➕ Agrega una nueva tarea a la lista
function agregarTarea() {
  const texto = document.getElementById('tareaInput').value.trim(); // Toma el texto del input
  if (!texto) return; // Si está vacío, no hace nada

  const tarea = {
    texto, // Texto de la tarea
    subtareas: [] // Arreglo vacío para subtareas
  };

  tareas.push(tarea); // Añade la nueva tarea al arreglo
  guardarTareas(); // Guarda los cambios
  crearElementoTarea(tarea); // Muestra la tarea en pantalla
  document.getElementById('tareaInput').value = ''; // Limpia el campo de entrada
}

// 📋 Genera y muestra todas las subtareas de una tarea
function renderizarSubtareas(ulSub, tarea) {
  ulSub.innerHTML = ''; // Limpia la lista antes de agregar elementos
  tarea.subtareas.forEach((sub) => {
    const liSub = document.createElement('li'); // Crea elemento de lista

    const check = document.createElement('input'); // Casilla de verificación
    check.type = 'checkbox';
    check.checked = sub.completa; // Marca si está completada
    check.onchange = () => {
      sub.completa = check.checked; // Actualiza el estado
      guardarTareas(); // Guarda los cambios
    };

    const textoSub = document.createElement('span'); // Texto de la subtarea
    textoSub.textContent = sub.texto;

    // ✏️ Botón para editar subtarea
    const btnEditarSub = document.createElement('button');
    btnEditarSub.textContent = 'Editar';
    btnEditarSub.onclick = () => {
      const nuevoTexto = prompt('Editar subtarea:', sub.texto);
      if (nuevoTexto) {
        sub.texto = nuevoTexto; // Actualiza el texto
        guardarTareas();
        renderizarSubtareas(ulSub, tarea); // Re-renderiza
      }
    };

    // 🗑️ Botón para eliminar subtarea
    const btnEliminarSub = document.createElement('button');
    btnEliminarSub.textContent = 'Eliminar';
    btnEliminarSub.onclick = () => {
      tarea.subtareas = tarea.subtareas.filter(s => s !== sub); // Elimina del arreglo
      guardarTareas();
      renderizarSubtareas(ulSub, tarea);
    };

    // Agregamos todos los elementos a la subtarea
    liSub.appendChild(check);
    liSub.appendChild(textoSub);
    liSub.appendChild(btnEditarSub);
    liSub.appendChild(btnEliminarSub);
    ulSub.appendChild(liSub);
  });
}

// 🏷️ Crea el HTML para mostrar una tarea completa (con botones y subtareas)
function crearElementoTarea(tarea) {
  const li = document.createElement('li');
  li.className = 'tarea'; // Clase para aplicar estilos CSS

  const titulo = document.createElement('h3'); // Título de la tarea
  titulo.textContent = tarea.texto;

  // ✏️ Botón para editar la tarea
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

  // 🗑️ Botón para eliminar la tarea
  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar';
  btnEliminar.onclick = () => {
    tareas = tareas.filter(t => t !== tarea); // Elimina del arreglo
    guardarTareas();
    li.remove(); // Elimina de la vista
  };

  // 📦 Contenedor para botones de tarea
  const contBotones = document.createElement('div');
  contBotones.className = 'botones-tarea';
  contBotones.appendChild(btnEditar);
  contBotones.appendChild(btnEliminar);

  // 📋 Lista de subtareas
  const ulSub = document.createElement('ul');
  ulSub.className = 'subtareas';
  renderizarSubtareas(ulSub, tarea);

  // ➕ Entrada para añadir nueva subtarea
  const entradaSub = document.createElement('div');
  entradaSub.className = 'nueva-subtarea';

  const inputSub = document.createElement('input'); // Campo de texto para subtarea
  inputSub.type = 'text';
  inputSub.placeholder = 'Añadir subtarea...';

  const botonSub = document.createElement('button'); // Botón para añadir subtarea
  botonSub.textContent = 'Agregar';
  botonSub.onclick = () => {
    const texto = inputSub.value.trim();
    if (!texto) return;
    const nuevaSub = { texto, completa: false }; // Crea nueva subtarea
    tarea.subtareas.push(nuevaSub); // Añade al arreglo
    guardarTareas();
    renderizarSubtareas(ulSub, tarea);
    inputSub.value = ''; // Limpia el campo
  };

  entradaSub.appendChild(inputSub);
  entradaSub.appendChild(botonSub);

  // 🧱 Estructuramos todo el elemento tarea
  li.appendChild(titulo);
  li.appendChild(contBotones);
  li.appendChild(ulSub);
  li.appendChild(entradaSub);

  document.getElementById('listaTareas').appendChild(li); // Lo agregamos a la lista principal
}

cargarTareas(); // 🚀 Ejecutamos la carga de datos al iniciar la aplicación
``

document.getElementById("formRegistro").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const nombre = document.getElementById("nombreUsuario").value;
  const email = document.getElementById("emailUsuario").value;
  const clave = document.getElementById("claveUsuario").value;

  // Solo para mostrar por ahora; puedes guardarlo en localStorage más adelante si quieres
  alert(`¡Usuario registrado!\nNombre: ${nombre}\nCorreo: ${email}`);
  
  // Limpiar los campos del formulario
  e.target.reset();
});

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "NOME_DO_PROJETO",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

