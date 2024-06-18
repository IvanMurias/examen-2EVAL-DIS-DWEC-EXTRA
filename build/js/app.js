document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {


    anioActual();

    navegacionFija();

    crearGaleria();

    scrollNav();


}

/** Función para implementar una barra de navegación 
 * fija en una página web, que se congela cuando el/la usuario/a hace scroll hacia abajo 
 * y alcanza una sección específica del documento **/

function navegacionFija() {

        const barra = document.querySelector('.header')
        const body = document.querySelector('body')
        const video = document.querySelector('.video')
    
        window.addEventListener('scroll', function () {
            //Si el usuario ha scroleado hasta galeria
            if (video.getBoundingClientRect().bottom < 0 && this.window.innerWidth >= 768) {
                //Añadimos las clases fijo y body-scroll, para hacer que a partir del punto en que empieza la galeria
                //El nav (barra) identificado arriba con un query selector quedara con posicion fija.
                barra.classList.add('fijo')
                body.classList.add('body-scroll')
            } else {
                //Aqui hacemos un remove de las clases previamente descritas, para hacer que el nave vuelva a su sitio siempre 
                //que no se cumpla la condicion de haber scrolleado hasta la galeria almenos,o en este caso, hasta el final del video.
                barra.classList.remove('fijo');
                barra.classList.remove('body-scroll');
            }
        });
}

/** Función para mejorar la 
 * experiencia de desplazamiento en una página 
 * web al hacer clic en los enlaces de navegación **/

function scrollNav() {
        const enlaces = document.querySelectorAll('.navegacion-principal a')

        enlaces.forEach(enlace => {
            enlace.addEventListener("click", function (e) {
                e.preventDefault();
                const seccionScroll = e.target.attributes.href.value
                const seccion = document.querySelector(seccionScroll)
    
                seccion.scrollIntoView({ behavior: "smooth" });
            });
        });
}
function verImagen(contador){
    return (`
    <source srcset="build/img/thumb/${contador}.jpeg" type="image/jpeg">
    <source srcset="build/img/thumb/${contador}.webp" type="image/webp">
    <img loading="lazy" width="300px" height="auto" src="build/img/thumb/${contador}.jpg" alt="imagen galeria">`);
}

function crearGaleria() {
    let contador = 1;
    const galeria = document.querySelector('.galeria-imagenes')
    const imagen=document.createElement('picture')
    const slider = document.createElement('div')
    const atras = document.createElement('Button')
    const adelante = document.createElement('Button')
    const imagenDiv = document.createElement('div')
    const contadorText = document.createElement('p')


    //Dandole un parametro contador, el cual sera un numero que comienza en 1, para mostrar siempre al entrar a la página la primera imagen, 
    //despues guardara en el 'p' contadorText el valor del contador para señalar en que imagen estamos en todo momento. 
    function visualImagenDiv(contador){
        imagen.innerHTML=verImagen(contador);
        contadorText.innerHTML = `${contador}/12`;
    }
 
    //Añadimos etiquetas para los estilos de cada uno de los elementos.
    slider.classList.add('slider')
    atras.classList.add('btn-atras')
    adelante.classList.add('btn-adelante')
    imagenDiv.classList.add('imagen-div')
    contadorText.classList.add('contador-text')

    visualImagenDiv(contador);

    //Funcion patras hara que el contador reste 1 a su valor y que compruebe si el valor ha llegado al limite de imagenes, 
    //si este llega a 0 (imagen que no existe) cambiara el valor del contador por el de la ultima imagen.
    //Despues llamara a la funcion que permite visualizar la imagen y el contador en el navegador.
    function patras(){
        contador -=1
        if (contador < 1){
            contador = 12;
        } 
        visualImagenDiv(contador);
        return contador;
    }
    //Esta funcion tiene la misma funcionalidad que la funcion patras();
    function palante() {
        contador +=1
        if (contador > 12){
            contador = 1;
        } 
        visualImagenDiv(contador);
        return contador;
    }

    //Eventos onclick para llamar a la respectiva funcion para ir hacia adelante o hacia atras.
    atras.innerHTML = `Atras`;
    atras.onclick = () =>{
        contador=patras();
    };

    adelante.innerHTML = `Adelante`;
    adelante.onclick = () =>{
        contador=palante();
    };

    //Onclick para abrir el modal

    imagen.onclick  = () => {
        mostrarImagen(contador)
    }

    //Funciones para el slider automático
    //Declaramos un timer vacio (nulo)
    let timer=null;
    
    //Funcion para parar el intervalo y asi parar el slider automatico
    function stop() {
        clearInterval(timer)
    };

    //Funcion start para iniciar el setInterval y hacer que pase de foto cada 3 segundos (3000 milisegundos)
    function start() {
        timer = setInterval(palante,3000)
    }; 

    //Comenzamos el timer del setInterval con la funcion Start() y vamos "empujando" cada elemento en su sitio correspondiente
    start();
    galeria.appendChild(slider)
    slider.appendChild(atras)
    slider.appendChild(imagenDiv)
    slider.appendChild(adelante)
    imagenDiv.appendChild(imagen)
    imagenDiv.appendChild(contadorText)

    //Añadimos dos funciones para parar el slider automatico en caso de tener el mouse encima de la imagen, 
    //asi como volver a reanudarlo cuando el raton salga del cuadro del slider
    slider.addEventListener("mouseover", stop)
    slider.addEventListener("mouseout", start)


}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML=verImagen(id);

    const overlay = document.createElement('DIV')
    overlay.appendChild(imagen)
    overlay.classList.add('overlay')
    overlay.onclick = function () {
        const body = document.querySelector('body')
        body.classList.remove('fijar-body')
        overlay.remove();
    }

    //Boton para cerrar el Modal

    const cerrarModal = document.createElement('P');
    cerrarModal.innerHTML = 'X';
    cerrarModal.classList.add('btn-cerrar')
    cerrarModal.onclick = function () {
        const body = document.querySelector('body')
        body.classList.remove('fijar-body')
        overlay.remove();
    }

    overlay.appendChild(cerrarModal)
    //Añadirlo al HTML

    const body = document.querySelector('body')
    body.appendChild(overlay)
    body.classList.add('fijar-body')


}

function anioActual() {
let yearSpan = document.getElementById("year");
// Obtenemos el año actual y lo almacenamos en la variable currentYear
let currentYear = new Date().getFullYear();
// Introducimos en el span yearSpan el contenido de la variable currentYear
yearSpan.textContent = currentYear;
}