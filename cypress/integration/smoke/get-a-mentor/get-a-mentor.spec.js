describe('Get a Mentor', () => {
  it('loads', () => {
    cy.visit(`/en/get-a-mentor`);
    cy.waitUntilLoaded();
  });
})
