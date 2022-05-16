describe('Organization Administrators', () => {
  it('Button to add a new organization administrator is visible and functional', () => {
    cy.visit(`en/admin/organizations/detail/7747fbca-9461-4906-895b-5fed432ed0e3`)
    cy.waitUntilLoaded()
    cy.get('button.cypress-org-admin-button')
      .should('exist')
    cy.get('button.cypress-org-admin-button')
      .click()
    cy.waitUntilLoaded()
    cy.url()
      .should('eq', 'https://connector.ubriety.dev/en/admin/organizations/administrators/7747fbca-9461-4906-895b-5fed432ed0e3')
  });
  it('Button to delete an organization is visible for global admin', () => {
    cy.visit(`en/admin/organizations/detail/7747fbca-9461-4906-895b-5fed432ed0e3`);
    cy.waitUntilLoaded();
    cy.get('button.danger')
      .should('exist')
  });
  it('Button to delete an organization is not visible for non global admin', () => {
    cy.visit(`en/admin/organizations/detail/7747fbca-9461-4906-895b-5fed432ed0e3`);
    cy.waitUntilLoaded();
    cy.window()
      .then((win) => {
        win.app.user.admin = false
      })
    cy.wait(3000)
    cy.get('button.danger')
      .should('not.exist')
  });

})
