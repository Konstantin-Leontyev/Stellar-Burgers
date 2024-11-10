/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => { 
  let email = 'K.A.Leontyev@yandex.ru';
  let password = 'd[jl123'

  cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients'})
  cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', { fixture: 'login' }).as('postLogin');

  cy.visit('http://localhost:3000/login');
  cy.get('[data-testid=email_input]').type(`${email}`);
  cy.get('[data-testid=password_input]').type(`${password}`);
  cy.get('[data-testid=login_button]').contains('Войти').click();
  window.localStorage.setItem("accessToken", JSON.stringify("test-accessToken"));
})

Cypress.Commands.add('open_modal', () => { 
  cy.login();
  cy.get('[data-testid=burger_ingredients] li:first').first().click();
});

Cypress.Commands.add('drop_bun', (ingredient_name) => { 
  cy.get('[data-testid=burger_ingredients]').contains(ingredient_name).trigger('dragstart');
  cy.get('[data-testid=bun_drop]').trigger('drop');
});

Cypress.Commands.add('drop_ingredient', (ingredient_name) => { 
  cy.get('[data-testid=burger_ingredients]').contains(ingredient_name).trigger('dragstart');
  cy.get('[data-testid=ingredient_drop]').trigger('drop');
});

