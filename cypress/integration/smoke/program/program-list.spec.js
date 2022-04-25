describe('Program List', () => {
  it('loads', () => {
    cy.visit(`/en/admin/programs/offset/0`);
    cy.waitUntilLoaded();
  });
})
