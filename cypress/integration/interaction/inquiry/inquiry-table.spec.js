describe('Inquiry admin table', () => {
  it('Organization link in inquiry redirects to organization detail', () => {
    cy.visit(`en/admin/applications/offset/0`)
    cy.waitUntilLoaded()
    cy.get('body > div > main > div > div.admin-table > div.list > div:nth-child(1) > div > table > tbody > tr > td:nth-child(2) > div > a')
      .contains('Test Organization')
    cy.get('body > div > main > div > div.admin-table > div.list > div:nth-child(1) > div > table > tbody > tr > td:nth-child(2) > div > a')
      .click()
    cy.waitUntilLoaded()
    cy.url()
      .should('eq', 'https://connector.ubriety.dev/en/admin/organizations/detail/d96cb4ee-2166-4121-9f1c-d140d1a3f1b7')
  });
})
