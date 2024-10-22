import {Futbolista, Profesional} from "./clases.js";   

export const jsonData = JSON.parse(`[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "titulo":"Ingeniero", "facultad":"UTN",
"añoGraduacion":2002},{"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "titulo":"Medico",
"facultad":"UBA", "añoGraduacion":20012},{"id":3, "nombre":"Facundo", "apellido":"Cairo", "edad":30,
"titulo":"Abogado", "facultad":"UCA", "añoGraduacion":2017},{"id":4, "nombre":"Fernando", "apellido":"Nieto",
"edad":18, "equipo":"Independiente", "posicion":"Delantero", "cantidadGoles":7},{"id":5, "nombre":"Manuel",
"apellido":"Loza", "edad":20, "equipo":"Racing", "posicion":"Volante", "cantidadGoles":2},{"id":6, "nombre":"Nicolas",
"apellido":"Serrano", "edad":23, "equipo":"Boca", "posicion":"Arquero", "cantidadGoles":0}]`);

const checkboxes = {
    'col-id':0,
    'col-nombre':1,
    'col-apellido':2,
    'col-edad':3,
    'col-equipo':4,
    'col-posicion':5,
    'col-cantidadGoles':6,
    'col-titulo':7,
    'col-facultad':8,
    'col-anioGraduacion':9

};

const headers ={
    'id':0,
    'nombre':1,
    'apellido':2,
    'edad':3,
    'equipo':4,
    'posicion':5,
    'cantidadGoles':6,
    'titulo':7,
    'facultad':8,
    'anioGraduacion':9
}

export let personas = [];
export let personaSeleccionada=null;
export let ordenAscendente = true;

export function inicializarPersonas(){
    jsonData.forEach(persona => {
        console.log(persona);

        if (persona.equipo && persona.posicion && persona.cantidadGoles>=0){
            //console.log(persona);
            personas.push(new Futbolista(persona.id,persona.nombre,persona.apellido,persona.edad,persona.equipo,persona.posicion,persona.cantidadGoles));
            } else if (persona.titulo!== undefined && persona.facultad !== undefined){
                personas.push(new Profesional(persona.id,persona.nombre,persona.apellido,persona.edad,persona.titulo, persona.facultad, persona.añoGraduacion));
            }
            
    });
    //console.log(personas);
}

export function mostrarDatos(tabla){
    console.log(tabla);
    tabla.innerHTML = '';
    const tipoSeleccionado = document.getElementById('filtro-tipo-persona').value;
    let personasFiltradas = personas;
    console.log(tabla);
    if (tipoSeleccionado ==='Futbolista'){
        personasFiltradas = personas.filter(v=>v instanceof Futbolista);
    }else if (tipoSeleccionado === 'Profesional'){
        personasFiltradas = personas.filter(v=>v instanceof Profesional);
    }
       

    personasFiltradas.forEach(persona=>{
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${persona.id}</td>
        <td>${persona.nombre}</td>
        <td>${persona.apellido}</td>
        <td>${persona.edad}</td>
        <td>${persona.equipo || ''}</td> 
        <td>${persona.posicion || ''}</td> 
        <td>${persona.cantidadGoles || ''}</td>
        <td>${persona.titulo || ''}</td>
        <td>${persona.facultad || ''}</td>
        <td>${persona.anioGraduacion || ''}</td>
    `;
    fila.addEventListener('dblclick', () => editarPersona(persona));
    tabla.appendChild(fila);
}); 
   actualizarColumnasSeleccionadas();
}

export function alternarForm(mostrarFormulario){
    document.getElementById('form-abm').style.display= mostrarFormulario ? 'block' :'none';
    document.getElementById('form-datos').style.display= mostrarFormulario ? 'none' :'block';
}

export function mostrarCamposSegunTipo(tipo){
    const esFutbolista = tipo ==='Futbolista';
    document.getElementById('futbolista-fields').style.display = esFutbolista ? 'block' : 'none';
    document.getElementById('profesional-fields').style.display = esFutbolista ? 'none' : 'block';

}

export function editarPersona(persona){
  
    personaSeleccionada = persona;
    document.getElementById('id').value=persona.id;
    document.getElementById('nombre').value=persona.nombre;
    document.getElementById('apellido').value=persona.apellido;
    document.getElementById('edad').value=persona.edad;

    const tipoSeleccionado = document.getElementById('tipo-persona');
    tipoSeleccionado.disabled = true;
    if ( persona instanceof Futbolista){

        tipoSeleccionado.value='Futbolista';
        document.getElementById('equipo').value= persona.equipo;
        document.getElementById('posicion').value= persona.posicion;
        if(persona.cantidadGoles!=0){
        document.getElementById('cantidadGoles').value=persona.cantidadGoles;
        }else
            {document.getElementById('cantidadGoles').value="0";
        }
    } else if (persona instanceof Profesional){
        tipoSeleccionado.value= 'Profesional';
        document.getElementById('titulo').value= persona.titulo;
        document.getElementById('facultad').value= persona.facultad;
        document.getElementById('anioGraduacion').value= persona.anioGraduacion;
    }
    
    document.getElementById('guardar').textContent = 'Modificar';
    document.getElementById('eliminar').style.display = 'inline';

    mostrarCamposSegunTipo(tipoSeleccionado.value);
    alternarForm(true);
}
export function calcularEdadPromedio(tabla, edadPromedioSpan) {
    const filas = tabla.querySelectorAll('tr');
    let totalEdad = 0;
    let cantidadPersonas = 0;

    filas.forEach(fila => {
        const edad = parseFloat(fila.children[3].textContent);
        if (!isNaN(edad)) {
            totalEdad += edad;
            cantidadPersonas++;
        }
    });

    const promedio = cantidadPersonas > 0 ? totalEdad / cantidadPersonas : 0;
    edadPromedioSpan.textContent = promedio.toFixed(2);
}

function validarPersona(tipoPersona,nombre,apellido,edad,equipo,posicion,cantidadGoles,titulo,facultad,anioGraduacion){
    const errores =[];

    if(!nombre || nombre.trim()===""){
        errores.push("Se requiere un nombre.");
    }
    if(!apellido || apellido.trim()===""){
        errores.push("Se requiere un apellido.");
    }
    if (isNaN(edad) || edad <= 15) {
        errores.push("Ingresar edad mayor a 15 años.");
    }

    if(tipoPersona==='Futbolista'){
        if(!equipo){
            errores.push("Debe ingrersar un equipo");
        }
        if(!posicion){
            errores.push("Debe ingrersar una posicion");
        }
        if (isNaN(cantidadGoles) || cantidadGoles < 0) {
            errores.push("Ingresar cantidad de goles igual o mayor a 0.");
        }
    }

    if(tipoPersona==='Profesional'){
        if(!titulo){
        errores.push("Debe ingrersar un Titulo");
    }
    if(!facultad){
        errores.push("Debe ingrersar una Facultad");
    }
        if (isNaN(anioGraduacion) && anioGraduacion<=1950 ) {
            errores.push("Debe ingresar un año de graduacion superoior a 1950.");
        }   
    }

    if (errores.length>0){
        return { valido: false, mensaje: errores.join("\n")};
    }

    return {valido: true, mensaje:""};
}

function mostrarError(mensaje){
    const errorDiv= document.getElementById('error-mensaje');
    errorDiv.textContent = mensaje;
    errorDiv.style.display='block';
}

function ocultarError(){
    const errorDiv = document.getElementById('error-mensaje');
    errorDiv.textContent = '';
    errorDiv.style.display='none';
}

export function grabarPersona(event){
    event.preventDefault();
    const tipoPersona = document.getElementById('tipo-persona').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = parseInt(document.getElementById('edad').value);
    const equipo = document.getElementById('equipo').value;
    const posicion = document.getElementById('posicion').value;
    const cantidadGoles = parseInt(document.getElementById('cantidadGoles').value);
    const titulo = document.getElementById('titulo').value;
    const facultad = document.getElementById('facultad').value;
    const anioGraduacion = parseInt(document.getElementById('anioGraduacion').value);

    const validacion = validarPersona(tipoPersona,nombre,apellido,edad,equipo,posicion,cantidadGoles,titulo,facultad,anioGraduacion);

    if(!validacion.valido){
        mostrarError(validacion.mensaje);
        return;
    }
    ocultarError();
    if(personaSeleccionada){
        personaSeleccionada.nombre=nombre;
        personaSeleccionada.apellido=apellido;
        personaSeleccionada.edad=edad;
        if(tipoPersona==='Futbolista'){
            personaSeleccionada.equipo= equipo;
            personaSeleccionada.posicion=posicion;
            personaSeleccionada.cantidadGoles=cantidadGoles;
        } else if (personaSeleccionada==='Profesional'){
            personaSeleccionada.titulo=titulo;
            personaSeleccionada.facultad= facultad;
            personaSeleccionada.anioGraduacion=anioGraduacion;
        }
        
        
    } else{
        const nuevoId = generarIdUnico();
        let nuevaPersona;
        if(tipoPersona === 'Futbolista'){
            nuevaPersona= new Futbolista(nuevoId,nombre,apellido,edad,equipo,posicion,cantidadGoles);
           }else if (tipoPersona ==='Profesional'){
            nuevaPersona = new Profesional(nuevoId,nombre,apellido,edad,titulo,facultad,anioGraduacion);
           }
        personas.push(nuevaPersona);
    }
    console.log(document.querySelector('#tabla-datos tbody'));
    mostrarDatos(document.querySelector('#tabla-datos tbody'));
    alternarForm(false);
}

function generarIdUnico(){
    const idsExistentes = personas.map(p => p.id).sort((a, b) => a - b);
    let nuevoId = 1;
    for (let i = 0; i < idsExistentes.length; i++) {
        if (idsExistentes[i] !== nuevoId) {
            break;
        }
        nuevoId++;
    }
    return nuevoId;
}

export function agregarNuevaPersona(){
personaSeleccionada = null;

document.getElementById('id').value = ''; 
document.getElementById('nombre').value = '';
document.getElementById('apellido').value = '';
document.getElementById('edad').value = '';
document.getElementById('equipo').value = '';
document.getElementById('posicion').value = '';
document.getElementById('cantidadGoles').value = '';
document.getElementById('titulo').value = '';
document.getElementById('facultad').value = '';
document.getElementById('anioGraduacion').value = '';


const tipoPersonaSelec = document.getElementById('tipo-persona');
tipoPersonaSelec.disabled=false;
tipoPersonaSelec.value = 'Futbolista';

tipoPersonaSelec.addEventListener('change', (e)=> {mostrarCamposSegunTipo(e.target.value);});

document.getElementById('guardar').textContent='Agregar';
document.getElementById('eliminar').style.display='none';

mostrarCamposSegunTipo(tipoPersonaSelec.value);
alternarForm(true);
}

export function inicializarCheckBoxes(){
    Object.keys(checkboxes).forEach(checkboxId => {
        
       const checkbox = document.getElementById(checkboxId);
 
       checkbox.addEventListener('change',()=>{
        volverColumnaVisible(checkbox,checkboxes[checkboxId]);
       });
       
   });
}

function volverColumnaVisible(checkbox, indiceColumna){
    const tabla =document.querySelector('#tabla-datos');
    const esVisible= checkbox.checked;

    const filas = tabla.querySelectorAll('tr');
    filas.forEach(fila=>{
        const celda = fila.children[indiceColumna];
        if(celda){
            celda.style.display = esVisible ? 'table-cell' : 'none';
        }
    });
}

function actualizarColumnasSeleccionadas(){
    Object.keys(checkboxes).forEach(checkboxId=>{
        const checkbox = document.getElementById(checkboxId);
        volverColumnaVisible(checkbox,checkboxes[checkboxId]);
    });
}

export function inicializarOrdenHeaders(){
    Object.keys(headers).forEach(headerId =>{
        const header = document.querySelector(`#tabla-datos th:nth-child(${headers[headerId] + 1})`);
        header.style.cursor = 'pointer';
        header.addEventListener('click', ()=>{
            ordenarPorColumna(headers[headerId]);
        });
    });
}

function ordenarPorColumna(columnIndex){
    const tabla = document.querySelector('#tabla-datos tbody');
    let filas = Array.from(tabla.querySelectorAll('tr'));
    const esNumerico = ['id', 'edad', 'cantidadGoles', 'anioGraduacion'].includes(Object.keys(headers)[columnIndex]);


    filas.sort((a,b)=>{
        const valorA = a.children[columnIndex].textContent.trim();
        const valorB = b.children[columnIndex].textContent.trim();
        if(esNumerico){
            return ordenAscendente ? (parseFloat(valorA)- parseFloat(valorB)) : (parseFloat(valorB)- parseFloat(valorA));
        } else {
            return ordenAscendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
        }
    });
    ordenAscendente= !ordenAscendente;
    tabla.innerHTML='';
    filas.forEach(fila=>tabla.appendChild(fila));
}

export function cancelarEdicion(){
    alternarForm(false);
}

export function eliminarPersona(){
    if(personaSeleccionada){
        personas= personas.filter(v=> v!== personaSeleccionada);
        mostrarDatos(document.querySelector('#tabla-datos tbody'));
        alternarForm(false);
    }
}