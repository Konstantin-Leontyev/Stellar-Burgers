describe('order creation', function() {
  it('should create order', () => { 
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order-creation-response' }).as('orderCreationRequest')
    cy.login();
    cy.drop_bun('Флюоресцентная булка R2-D3');
    cy.drop_ingredient('Биокотлета из марсианской Магнолии');
    cy.drop_ingredient('Хрустящие минеральные кольца');
    cy.drop_ingredient('Мини-салат Экзо-Плантаго');
    cy.drop_ingredient('Сыр с астероидной плесенью');
    cy.drop_ingredient('Сыр с астероидной плесенью');
    cy.drop_ingredient('Соус традиционный галактический');
    cy.get('[data-testid=order_create_button]').contains('Оформить заказ').click();
    cy.wait('@orderCreationRequest').its('request.body').should("deep.equal", { 
      'ingredients': [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa093d'
      ]
    });
    cy.get('[data-testid=order-details]').contains('58996').should('exist')
    cy.get('[data-testid=order-details]').contains('идентификатор заказа').should('exist')
  });
});
