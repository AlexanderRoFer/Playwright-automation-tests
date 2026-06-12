import { test, expect, Page } from '@playwright/test';
import { Loginpage } from '../PageObjects/Login/Login';


test('Login', async ({ page }) => { 

await page.goto('https://qa-recargame.recargameonline.co/ventas/index.php');

const loginpage = new Loginpage(page) 
await loginpage.Password()
await loginpage.login()
await loginpage.clickLogin() 
})   
