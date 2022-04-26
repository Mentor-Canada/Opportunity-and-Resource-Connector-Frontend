describe('Program list filter', () => {
  it('Program list filter functions properly when table has offset', () => {
    cy.testFilterOnOffset('en/admin/programs/offset/20', 'cypress-program-name-filter')
  });
})
