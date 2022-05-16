describe('Program Administrators', () => {
  it('Button to add a new program administrator is visible and functional', () => {
      cy.visit(`en/admin/programs/detail/23eedcba-0c52-41a3-9f3a-acf42989c380`);
      cy.waitUntilLoaded();
      cy.get('body > div.app > main > div > div.content-transition-wrapper > form > div:nth-child(2) > div.actions > button:nth-child(3)')
          .should('exist')
      cy.get('body > div.app > main > div > div.content-transition-wrapper > form > div:nth-child(2) > div.actions > button:nth-child(3)')
          .click()
      cy.waitUntilLoaded()
      cy.url()
          .should('eq', 'https://connector.ubriety.dev/en/admin/programs/administrators/23eedcba-0c52-41a3-9f3a-acf42989c380')
  });
  it('Button to delete a program is visible for global admin', () => {
    cy.visit(`en/admin/programs/detail/23eedcba-0c52-41a3-9f3a-acf42989c380`);
    cy.waitUntilLoaded();
    cy.get('button.danger')
      .should('exist')
  });
  it('Button to delete a program is not visible for non global admin', () => {
    cy.visit(`en/admin/programs/detail/23eedcba-0c52-41a3-9f3a-acf42989c380`);
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
