describe('profile page', function() { 
  it('should open profile page', () => {
    cy.login();
    cy.get('[data-testid=auth_items] li:first' ).first().click();
    cy.location('pathname').should('eq', '/profile');
    cy.get('[data-testid=profile_notice]').contains('В этом разделе вы можете изменить свои персональные данные').should('exist');
  });
});
