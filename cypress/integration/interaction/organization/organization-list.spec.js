describe('Organization list', () => {
  it('Organization search bar exists in organizations list page', () => {
    cy.visit(`en/admin/organizations/offset/0`)
    cy.waitUntilLoaded()
    cy.get('input#organization-search-bar')
      .should('exist')
    cy.get('body').type('{alt+q}')
    cy.get('input#organization-search-bar').should('have.focus')
  });
})
