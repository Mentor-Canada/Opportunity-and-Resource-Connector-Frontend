describe('Organization List', () => {
  it('loads', () => {
    cy.visit(`/en/admin/organizations/offset/0`);
    cy.waitUntilLoaded();
  });
})
