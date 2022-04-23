describe('Results', () => {
  it('loads', () => {
    cy.visit(`/en/become-a-mentor/programs/montreal`);
    cy.waitUntilLoaded();
  });
})
