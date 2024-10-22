export class Persona{
    constructor(id,nombre,apellido,edad){
        if (id <= 0) {
            throw new Error('El ID debe ser mayor a 0.');
        }
        if(nombre==null){
            throw new Error('Debe ingresar un nombre.');
        }
        if(apellido==null){
            throw new Error('Debe ingresar un apellido.');
        }
        if(edad <=15){
            throw new Error('Debe ingresar una edad mayor a 15.');
        }
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    toString() {
        return `Id: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
 }

 export class Futbolista extends Persona{
    constructor( id,nombre,apellido,edad,equipo,posicion,cantidadGoles) {
        super(id,nombre,apellido,edad);
        if (equipo == null) {
            throw new Error('Ingrese un equipo.');
        }
        if (posicion==null){
            throw new Error('Ingrese una posicion.');
        }
        if(cantidadGoles <0 || cantidadGoles == null){
            throw new Error('Debe ingresar algun valor igual o mayor a 0.');
        }

        this.equipo = equipo;
        this.posicion = posicion;
        if(cantidadGoles!=0){
            this.cantidadGoles=cantidadGoles;
        }else {
             this.cantidadGoles='0'
            };
    }
    toString() {
        return `Id: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}, Equipo: ${this.equipo}, Posicion: ${this.posicion}, Cantidad de goles:${this.cantidadGoles}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
 }

 export class Profesional extends Persona{
    constructor(id,nombre,apellido,edad,titulo,facultad,anioGraduacion){
        super(id,nombre,apellido,edad);
        if (titulo == null) {
            throw new Error('Debe registrar una titulo.');
        }
        if(facultad== null){
            throw new Error('Debe ingresar alguna facultad.');
        }
        if(anioGraduacion <= 1950){
            throw new Error('Debe ingresar un año valido superior a 1950');
            
        }
        this.titulo=titulo;
        this.facultad=facultad;
        this.anioGraduacion=anioGraduacion;
    }
    toString() {
        return `Id: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}, Titulo: ${this.titulo}, Facultad: ${this.facultad}, Año graduacion: ${this.anioGraduacion}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
 }