describe('Program list', () => {
  it('Program search bar exists in program list page', () => {
    cy.visit(`/en/admin/programs/offset/0`)
    cy.waitUntilLoaded()
    cy.get('input#program-search-bar')
      .should('exist')
    cy.get('body').type('{alt+q}')
    cy.get('input#program-search-bar').should('have.focus')
  });
})
