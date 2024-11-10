describe('modal', function() { 
  it('should open ingredient popup', () => {
    cy.open_modal();
    cy.location('pathname').should('eq', '/ingredients/643d69a5c3f7b9001cfa093c');
    cy.get('[data-testid=modal_title]').contains('Детали ингредиента').should('exist');
    cy.get('[data-testid=ingredient_name]').contains('Краторная булка N-200i').should('exist');
  });

  it('should close ingredient popup by overlay click', () => { 
    cy.open_modal();
    cy.get('[data-testid=modal_overlay]').as('closeBtn');
    cy.get('@closeBtn').click({ force: true });
    cy.location('pathname').should('eq', '/');
  });

  it('should close ingredient popup by click on close button', () => { 
    cy.open_modal();
    cy.get('[data-testid=close_btn]').click();
    cy.location('pathname').should('eq', '/')
  });
}); 
