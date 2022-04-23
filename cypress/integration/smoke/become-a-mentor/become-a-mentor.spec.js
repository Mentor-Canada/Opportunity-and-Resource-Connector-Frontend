describe('Become a Mentor', () => {
  it('loads', () => {
    cy.visit(`/en/become-a-mentor`);
    cy.waitUntilLoaded();
  });
})
