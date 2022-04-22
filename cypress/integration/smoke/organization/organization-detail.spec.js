describe('Organization Detail Page', () => {
  it('loads', () => {
    cy.visit(`/en/admin/organizations/detail/d96cb4ee-2166-4121-9f1c-d140d1a3f1b7`);
    cy.waitUntilLoaded();
  });
})
