//variables
const btnEnviar=document.querySelector('#enviar');
const btnReset=document.querySelector('#resetBtn');
const formulario=document.querySelector('#enviar-mail');

const btnNuevo=document.querySelector('#agregar');
const email2=document.querySelector('#email23');
//variables para campos
const  email=document.querySelector('#email');
const  asunto=document.querySelector('#asunto');
const  mensaje=document.querySelector('#mensaje');

  //expresiones regulares
  const er=
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del formulario
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);
    //enviar email
    formulario.addEventListener('submit',enviarEmail);

    //reiniciar eñ formulario
    btnReset.addEventListener('click',resetearFormulario);

    btnNuevo.addEventListener('click',mostrarOtro);
    
}

//funciones
function iniciarApp(){

    btnEnviar.disabled=true;
    //inabilita el boton y lo opaca
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');
    console.log('iniciando...')
}

//valida el formulario

function validarFormulario(e){
    if(e.target.value.length>0){
        //eimina los errores
        const error=document.querySelector('p.error');
        if(error){
           error.remove();   
        }
      
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
        //---------Forma 1
        //busca que el texto tenga una @
        //const resultado=e.target.value.indexOf('@');
        //------una mejor opcion son las expresiones regulares

      
        if(er.test(e.target.value)){
            const error=document.querySelector('p.error');
            if(error){
                error.remove();   
             }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }



    //activar el boton de enviar

    if(er.test(email.value) && asunto.value !=='' &&  mensaje.value!=='' ){
        btnEnviar.disabled=false;
        //inabilita el boton y lo opaca
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50')
    }

}




 function mostrarError(mensaje){
     const mensajeError=document.createElement('p');
     mensajeError.textContent=mensaje;
     mensajeError.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center',
     'error');
    const errores=document.querySelectorAll('.error');

    if(errores.length===0){

         formulario.appendChild(mensajeError);  
    }
  
 }
 //envia el email
 function enviarEmail(e){
    console.log('Enviar Email...')
     e.preventDefault();
     //mostrar el spinner
     const spinner=document.querySelector('#spinner');
     spinner.style.display='flex'; 
     //despues de 3 segundos ocultar spinner y mostrar el mensaje
     setTimeout(()=>{
        spinner.style.display='none';
        //mensaje que indica que se envió correctamente
        const parrafo=document.createElement('p');
        parrafo.textContent='El mensaje se a enviado correctamente';
        parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase')

        //inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo,spinner);

        setTimeout(()=>{
            parrafo.remove();//Eliminar mensaje de exito

            resetearFormulario();
            console.log('5000...')
        },5000);

        console.log('3000...')
     },3000);

 }

 //funcion que resetea formulario
 function resetearFormulario(){
     formulario.reset();
     iniciarApp();
 }

 function mostrarOtro(){
    const parrafo=document.querySelector('#email2');
    parrafo.style.display='flex'
    const parrafo1=document.querySelector('#email23');
    parrafo1.style.display='flex'
 }