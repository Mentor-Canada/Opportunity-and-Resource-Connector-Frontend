describe('Home', () => {
  it('loads', () => {
    cy.visit(`/en`);
    cy.waitUntilLoaded();
  });
})
