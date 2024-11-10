  describe('order creation', function() { 
  it('should request with correct data', () => { 
    cy.login();
    cy.wait("@postLogin").its('request.body').should('deep.equal', {
      email: 'K.A.Leontyev@yandex.ru',
      password: 'd[jl123'
    });
  })

  it('should login', () => {
    cy.login();
    cy.location('pathname').should('eq', '/')
    cy.get('[data-testid=main_page_title]').contains('Соберите бургер').should('exist');
  });
});
