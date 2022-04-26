describe('Account list filter', () => {
  it('Account list filter functions properly when table has offset', () => {
    cy.testFilterOnOffset('en/admin/accounts/offset/20', 'cypress-account-contact-first-name-filter')
  });
})
