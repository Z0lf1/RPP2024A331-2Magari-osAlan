import { inicializarPersonas,mostrarDatos,agregarNuevaPersona,calcularEdadPromedio,
    grabarPersona,inicializarCheckBoxes,inicializarOrdenHeaders,eliminarPersona,cancelarEdicion} from './functions.js';

const tabla = document.querySelector('#tabla-datos tbody');
const filtroSelect = document.getElementById('filtro-tipo-persona');
const agregarBtn = document.getElementById('agregar-persona');
const calcularBtn = document.getElementById('calcular-promedio');
const edadPromedio = document.querySelector('#edad-promedio');
const formEditable = document.getElementById('form-abm');
const btnEliminar = document.getElementById('eliminar');
const btnCancelar = document.getElementById('cancelar');

inicializarPersonas();
inicializarCheckBoxes();
inicializarOrdenHeaders();
mostrarDatos(tabla);


filtroSelect.addEventListener('change', (e) => mostrarDatos(tabla, e.target.value));
calcularBtn.addEventListener('click', () => calcularEdadPromedio(tabla, edadPromedio));
agregarBtn.addEventListener('click', agregarNuevaPersona);
formEditable.addEventListener('submit', (event) => {
    event.preventDefault();
    grabarPersona(event);
});
btnEliminar.addEventListener('click', eliminarPersona);
btnCancelar.addEventListener('click', cancelarEdicion);