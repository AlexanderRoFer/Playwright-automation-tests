import test, { expect } from "@playwright/test";

test('login', async ({ page }) => {
//se coloca la url a la que se va a ingresar.
    await page.goto("https://passports.appoloatiende.com/home/agendar");
//busca el selector por su id y selecciona la opcion que se le indica por su label, en este caso "Cédula Ciudadanía"
    await page.selectOption('#databundle_passportschedulingrequest_documentTypeSolicitante',
        { label: 'Cédula Ciudadanía' });


//CAMPOS EN ESTE ESPACIO SOLO SON LOS QUE OBLIGATORIAMNETE DEBEN CAMBIAR:
//se ubica el campo de cedula por su id y se le asigna un valor, en este caso "1234567890"
    await page.locator('#databundle_passportschedulingrequest_dniSolicitante')
    .fill('98378866');
//se ubica el campo de Nombre por su id y se le asigna un valor, (campo de nombre completo va relacionado con 
//el campo de cedula y el pago realizado para la solicitud de pasaporte.)
    await page.locator('//*[@id="databundle_passportschedulingrequest_nameApplicant"]')
    .fill('Hector Emilio Rosero');


// localiza el campo de seleccion por su id y selecciona la opcion que se le indica por su label,
//  en este caso "Renovación de pasaporte"
    await page.selectOption('#databundle_passportschedulingrequest_passportRequestType',
        { label: 'Renovación de pasaporte' });
//se crea una const para generar un numero de celular aleatorio y se ubica el campo de celular por su id para asignarle el valor de la const creada.
const celular = `3${Math.floor(100000000 + Math.random() * 900000000)}`;
     await page.locator('//*[@id="databundle_passportschedulingrequest_cellPhone"]').fill(celular);
//se crea una const para generar un numero de telefono aleatorio y se ubica el campo por su id y se asigna el valor de la const.
const telefono = `3${Math.floor(10000 + Math.random() * 90000)}`;
    await page.locator('//*//*[@id="databundle_passportschedulingrequest_phone"]')
    .fill(telefono);
   // Genera dirección aleatoria y se ubica el campo de dirección por su id para asignarle el valor de la const creada.
const direccion = `Calle ${Math.floor(Math.random() * 200)} #${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 100)}`;
// Llena campo dirección
    await page.locator('#databundle_passportschedulingrequest_address').fill(String(direccion));
//se ubica en el campo de correo por su id y se le asigna un valor, en este caso "equipoqaplay@gmail.com
    await page.locator('//*//*[@id="databundle_passportschedulingrequest_email"]') 
    .fill('equipoqaplay@gmail.com');
//se ubica en el campo de confirmacion de correo por su id y se le asigna un valor, en este caso "equipoqaplay@gmail.com"
    await page.locator('//*//*[@id="databundle_passportschedulingrequest_confirmemail"]')
    .fill('equipoqaplay@gmail.com');
//realiza la funcion de quitar el foco del campo de correo para activar la validacion del mismo 
    await page.keyboard.press('Tab');
//se realiza una asersion con el metodo expect para validar que el boton este habilitado.
//(la asercion es una validacion que se realiza par verificar que el resultado obtenido sea el esperado, 
// en este caso se espera que el boton este habilitado para poder hacer click en el.)
//despues de la asercion se realiza la accion de click en el boton para enviar el formulario.
    await expect(page.locator('#miBoton')).toBeEnabled();
    await page.locator('#miBoton').click();
//confirmamos el envio del codigo de confirmacion al correo ingresado.
    await page.locator('#sendCodOtp').click();
//no se de debe cerrar la ventana mientras se confirma el codigo
//se debe de llenar los ultimnos campos de la solicitud.
    await page.pause();
//se pausa el test para verificacion del codigo y teminacion del proceso de solicitud de manera manual.
//ya que no se tiene el alcance para terminar el proceso. 
});