import { Locator, Page } from "@playwright/test";

// se crea una clase Loginpage para encapsular los elementos y metodos relacionados con el login, esto es util para mantener el codigo organizado y reutilizable.
export class Loginpage {
// se definen las propiedades de la clase, incluyendo el objeto Page y los locators para los elementos del login, esto es util para poder interactuar con ellos en los metodos de la clase.
    private readonly page: Page
    private readonly userInput: Locator
    private readonly passwordInput: Locator
    private readonly loginButton: Locator
// se crea el constructor de la clase, el cual recibe el objeto Page y asigna los locators a las propiedades correspondientes, esto es util para poder utilizar los locators en los metodos de la clase.
    constructor(page: Page) {
        this.page = page
        this.userInput = page.locator('#txtLogin')
        this.passwordInput = page.locator('#txtClave')
        this.loginButton = page.locator('#btnAutenticar')
    }
// se crean los metodos de la clase para realizar las acciones de login, esto es util para poder reutilizar el codigo y mantenerlo organizado.
    async login() {
        await this.userInput.fill('Marcela.Vendedora')
}
    async Password() {
        await this.passwordInput.fill('332211')

}
    async clickLogin() {
        await this.loginButton.click()
    }
//si cambia el nombre de los elementos del login, solo se tendra que actualizar el locator del contructor.
}
