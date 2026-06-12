import { test, expect, Page } from '@playwright/test';


// creamos una funcion para el logion, se ejecutara cuando la lineas de url sean ejecutadas y la llamen. 
async function login(page: Page) {
// llenamos el campo usuario del vendedor.
  await page.fill('#txtLogin', 'Maria.vendedora');
// llenanamos el campo contraseña
  await page.fill('#txtClave', '112233');
// click en autenticar
  await page.click('#btnAutenticar');
}

//Ceramos una funcion para obtener un numero de telefono aleatorio, la cual se llamara cada vez que se valla a realizar una venta de recargas.
function generarNumCelular(): string {
  const prefijos = ['809', '829'];
  const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
  const numero = Math.floor(1000000 + Math.random() * 9000000);
  return `${prefijo}${numero}`;
}

//inicio del test ingreso a la url, login y venta de recargas.
test('Ventas', async ({ page }) => {
// Ingresa a la URL
  await page.goto('https://release-recargame.recargame.do/pos/index.php');
// Ejecuta la función login
  await login(page);

//se crea un array con los operadores disponibles para realizar las ventas de recargas, esto es util para validar que el operador seleccionado sea uno de los disponibles.
  const operadores = [
      '#ckOp1003', 
      '#ckOp1004', 
      '#ckOp1005',
      '#ckOp1006', 
      '#ckOp1007', 
      '#ckOp1008', 
      '#ckOp1010', 
      '#ckOp1010', 
      '#ckOp1013'
    ];
//realizamos un ciclo for para validar que cada operador del array este visible en la pagina, esto es util para asegurarnos que 
// los operadores disponibles sean los correctos.
  for (const operador of operadores) {
    const operadorLocator = page.locator(operador);
// se utiliza el metodo expect para validar que el operador este visible en la pagina, esto es util para asegurarnos 
// que el operador seleccionado sea uno de los disponibles.
    await expect(operadorLocator).toBeVisible(); 

  // VENTAS DENTRO DEL USUARIO LOGIADO.

//ventas de recargas (busca el id claro y lo selecciona.
  await page.locator(operador).click();
//tomamos el numero generado y lo llenamos en el campo de celular para realizar la venta.
  await page.fill('#txtNumero', generarNumCelular());
//seleccionamos el monto de la recarga a realizar y luego hacemos click en confirmar para finalizar la venta.
  await page.locator('button[valor="100"]').click();
  await page.locator('#btn-confirmar').click(); 
//se utiliza el metodo getByRole para buscar el boton de aceptar y hacer click en el para confirmar la venta.
  await page.getByRole('button', { name: 'Aceptar' }).click();

  }

  
  await page.pause();

});
