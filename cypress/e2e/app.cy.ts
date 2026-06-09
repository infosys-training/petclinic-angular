describe('PetClinic App', () => {
  it('should load the home page', () => {
    cy.visit('/');
    cy.contains('Welcome to Petclinic');
  });
});
