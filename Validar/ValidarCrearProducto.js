export default function ValidarCrearCuenta(valores){
    let errores = {

    }
    //validar el nombre del usuario
    if(!valores.nombre){
errores.nombre = 'el nombre es obligatorio'
    }
//validar la empresa
if(!valores.empresa){
    errores.empresa = "El nombre de empresa es obligatorio"
}
//validar url
if(!valores.url){
    errores.url ="la url del producto es obligatoria"
 }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
errores.url ="URL no valida"
 }
 
 //validar descripcion.
 if(!valores.descripcion){
     errores.descripcion = "Agrega una descripcion de tu producto"
 }
    return errores;
}