describe('Organization list filter', () => {
  it('Organization list filter functions properly when table has offset', () => {
    cy.testFilterOnOffset('en/admin/organizations/offset/20', 'cypress-organization-name-filter')
  });
})
