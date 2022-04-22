describe('Organization Administrators', () => {
  it('loads', () => {
    cy.visit(`/en/admin/organizations/administrators/d96cb4ee-2166-4121-9f1c-d140d1a3f1b7`);
    cy.waitUntilLoaded();
  });
})
