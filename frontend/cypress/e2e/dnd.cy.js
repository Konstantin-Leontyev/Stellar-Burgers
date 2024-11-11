describe('DnD functionality', function() { 
  it('should add bun', () => { 
    cy.login();
    cy.drop_bun('Краторная булка N-200i');
    cy.get('[data-testid=bun_drop]').contains('Краторная булка N-200i').should('exist');
  });

  it('should add ingredient', () => { 
    cy.login();
    cy.drop_ingredient('Биокотлета из марсианской Магнолии')
    cy.get('[data-testid=ingredient_drop]').contains('Биокотлета из марсианской Магнолии').should('exist');
  });
});
