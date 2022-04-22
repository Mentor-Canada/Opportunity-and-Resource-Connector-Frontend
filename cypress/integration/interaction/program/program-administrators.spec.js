describe('Program Administrators', () => {
  it('Displays autocomplete accounts correctly', () => {
    cy.visit(`/en/admin/programs/administrators/00d7c633-8459-4eb4-8c8e-cb2b96882736`);
    cy.waitUntilLoaded();
    cy.get('form fieldset div.ui-form-row a button.compact')
      .click()
    cy.get('div.md-dialog')
      .should('exist')
    cy.get('div.md-dialog input')
      .type('w')
    cy.get('div.md-dialog ul li a div.user-name')
      .should('exist')
    cy.get('div.md-dialog ul li a div.user-email')
      .should('exist')
    cy.get('div.md-dialog ul li a div.user-name')
      .eq(0)
      .should('has.text', 'John Smith')
    cy.get('div.md-dialog ul li a div.user-name')
      .eq(1)
      .should('has.text', 'withoutName@example.com')
    cy.get('div.md-dialog ul li a div.user-email')
      .eq(0)
      .should('has.text', 'withName@example.com')
  });
})
