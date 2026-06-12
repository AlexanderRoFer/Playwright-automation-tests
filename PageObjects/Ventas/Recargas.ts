import { Locator, Page } from "@playwright/test";

export class Recargas {

    private readonly page: Page; 
    private readonly buttonselectores: Locator[];
    private readonly buttonvalor: Locator;
    private readonly buttonconfirmar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonselectores = [
            page.locator('#ckOp1'), 
            page.locator('#ckOp2'),
            page.locator('#ckOp3'),
            page.locator('#ckOp4'),
            page.locator('#ckOp5'), 
            page.locator('#ckOp7'),
            page.locator('#ckOp81'),
            page.locator('#ckOp1003'),
            page.locator('#ckOp1004'),
            page.locator('#ckOp1005'),
            page.locator('#ckOp1006'),
            page.locator('#ckOp1007'),
            page.locator('#ckOp1009'),
            page.locator('#ckOp180')
        ];
        this.buttonvalor = page.locator('button[valor="100"]');
        this.buttonconfirmar = page.locator('#btn-confirmar');
        
    }
    async seleccionarOperador(operador: string) {
        const operadorLocator = this.page.locator(operador);
        await operadorLocator.click();

    }
    async seleccionarValor() {
        await this.buttonvalor.click();
    }   
    async confirmarVenta() {
        await this.buttonconfirmar.click();
    }
  }

function expect(operadorLocator: Locator) {
    throw new Error("Function not implemented.");
}
