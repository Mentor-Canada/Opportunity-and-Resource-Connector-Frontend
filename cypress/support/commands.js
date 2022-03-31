// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-wait-until';

Cypress.Commands.add('waitUntilLoaded', () => {
  cy.waitUntil(() => cy.window().then(win => !win.document.body.classList.contains('loading')), {
    timeout: Cypress.env('waitUntilTimeout'),
  })
})

Cypress.Commands.add('screenshotSingleLanguage', (language, path, name) => {
  cy.visit(`/${language}${path}`);
  cy.waitUntilLoaded();

  /** convert position 'fixed' to 'absolute' for full page screenshots */
  cy.document().then(function(document) {
    document.body.querySelector("header").style.position = "absolute";
    document.body.querySelector("#feedback").style.position = "absolute";
  });

  cy.viewport('iphone-se2')
  cy.screenshot(`${name} - ${language} - small`, { capture: 'fullPage' });
  cy.viewport('ipad-2')
  cy.screenshot(`${name} - ${language} - medium`, { capture: 'fullPage' });
  cy.viewport(1920, 1080)
  cy.screenshot(`${name} - ${language} - large`, { capture: 'fullPage' });
})

Cypress.Commands.add('screenshots', (path, name) => {
  cy.screenshotSingleLanguage('en', path, name);
  cy.screenshotSingleLanguage('fr', path, name);
})
