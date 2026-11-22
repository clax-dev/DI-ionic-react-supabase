import { expect, test, type Page } from '@playwright/test';

// En móvil la navbar está plegada: abrimos el menú antes de pulsar un enlace.
async function goTo(page: Page, name: string) {
  const toggler = page.getByRole('button', { name: 'Abrir menú' });
  if (await toggler.isVisible()) await toggler.click();
  await page.getByRole('link', { name, exact: true }).click();
}

test('la raíz redirige a Ver clientes y la navbar navega', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/clientes$/);
  await goTo(page, 'Añadir clientes');
  await expect(page).toHaveURL(/\/clientes\/nuevo$/);
  await goTo(page, 'About');
  await expect(page).toHaveURL(/\/about$/);
  await goTo(page, 'Ver clientes');
  await expect(page).toHaveURL(/\/clientes$/);
});
