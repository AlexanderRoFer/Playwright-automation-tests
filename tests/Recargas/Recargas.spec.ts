import { test, expect, Page } from '@playwright/test';


// creamos una funcion para el logion, se ejecutara cuando la lineas de url sean ejecutadas y la llamen. 
async function login(page: Page) {
// llenamos el campo usuario del vendedor.
  await page.fill('#txtLogin', 'Marcela.Vendedora');
// llenanamos el campo contraseña
  await page.fill('#txtClave', '112233');
// click en autenticar
  await page.click('#btnAutenticar');
}

//Ceramos una funcion para obtener un numero de telefono aleatorio numeros nacionales, 
// la cual se llamara cada vez que se valla a realizar una venta de recargas.
function generarNumCelular(): string {
  const prefijos = ['809', '829'];
  const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
  const numero = Math.floor(1000000 + Math.random() * 9000000);
  return `${prefijo}${numero}`;
}
//se crea una funcion para obtener un numero de telefono aleatorio numeros internacionales.
function NumberCelInternacional(): string {
  const prefijos = ['311', '315', '312', '318'];
  const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
  const numero = Math.floor(1000000 + Math.random() * 9000000);
  return `${prefijo}${numero}`;
}

//se crea una funcion para generar numeros aleatorios de contratos.
function NumContrato(): string {
  const prefijos = ['70', '72',];
  const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
  const numero = Math.floor(10000 + Math.random() * 90000);
  return `${prefijo}${numero}`;
}

//inicio del test ingreso a la url, login y venta de recargas.
test('Ventas', async ({ page }) => {
// Ingresa a la URL
  await page.goto('https://qa-recargame.recargameonline.co/ventas/index.php');
// Ejecuta la función login
  await login(page);

//se crea un array con los operadores disponibles para realizar las ventas de recargas, esto es util para validar que el operador seleccionado sea uno de los disponibles.
  const operadores = [
        '#ckOp1',
        '#ckOp2',
        //'#ckOp3',
        //'#ckOp4',
        //'#ckOp5',
        //'#ckOp7',
        //'#ckOp81',
        //'#ckOp1003',
        //'#ckOp1004', 
      //'#ckOp1005',
      // '#ckOp1006', 
      // '#ckOp1007', 
      //'#ckOp1009', 
      // '#ckOp180', 
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

  //seccion de ventas de PAQUETES.
  await page.locator('button.menu-btn').click();
  await page.locator('[data-modulo="paquetes"]').click();

  const paquetes = [
    '#ckOp1016',
    '#ckOp1017',
    // '#ckOp1018',
    // '#ckOp1019',
    // '#ckOp1020', 
  ];

  for (const paquete of paquetes) {
    const paqueteLocator = page.locator(paquete);
    await expect(paqueteLocator).toBeVisible();

    await page.locator(paquete).click();
    await page.fill('#txtNumero', generarNumCelular());
    await page.locator('#btn-consultar-paquetes'). click();
    await page.locator('[data-key="200"]').click();
    await page.locator('#btn-confirmar').click();
    await page.getByRole('button', { name: 'Aceptar' }).click();
    await page.getByRole('button', { name: 'Aceptar' }).click();
  };  

//Seccion de ventas de facturas.
  await page.locator('button.menu-btn').click();
  await page.locator('[data-modulo="facturas"]').click();

  const facturas = [
    '#ckOp1022',
    '#ckOp1023',
    // '#ckOp1024',
    // '#ckOp1025',
    // '#ckOp1026', 
    // '#ckOp1027',
    // '#ckOp1028',
    // '#ckOp1029',
    // '#ckOp1030',
    // '#ckOp1031',
    // '#ckOp1032',
    // '#ckOp1033',
    // '#ckOp1034',
    // '#ckOp1035',
    // '#ckOp1036',
    // '#ckOp1037',
    // '#ckOp1038',
    // '#ckOp1039',
    // '#ckOp1040',
  ]

  for (const factura of facturas) {
    const facturaLocator = page.locator(factura);
    await expect(facturaLocator).toBeVisible();

    await page.locator(factura).click();
    await page.fill('#txtNumeroContrato', NumContrato());
    await page.locator('#btn-consultar-factura').click();
    await page.locator('#btn-confirmar').click();
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('button', { name: 'Aceptar' }).click();

  }
  await page.pause();

});