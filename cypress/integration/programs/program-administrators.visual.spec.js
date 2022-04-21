describe('Program Administrators', () => {
  it('screenshots', () => {
    cy.screenshots('/admin/programs/administrators/00d7c633-8459-4eb4-8c8e-cb2b96882736', 'Program manage admins section');
    cy.visit('/en/admin/programs/administrators/00d7c633-8459-4eb4-8c8e-cb2b96882736')
    cy.waitUntilLoaded();
    cy.get('form fieldset div.ui-form-row a button.compact')
      .click()
    cy.get('div.md-dialog input')
      .type('w')
    cy.waitUntilLoaded();
    cy.wait(3000)
    cy.screenshot('Add-Admin-Dialog-Auto-Complete')
  });
})
