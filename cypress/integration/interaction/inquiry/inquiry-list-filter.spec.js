describe('Inquiry list filter', () => {
  it('Inquiry list filter functions properly when table has offset', () => {
    cy.testFilterOnOffset('en/admin/applications/offset/20', 'cypress-inquiry-contact-first-name-filter')
  });
})
