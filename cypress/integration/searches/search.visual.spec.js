describe('Search', () => {
  it('screenshots', () => {
    cy.screenshots('', 'Search');
    cy.screenshots('/admin/searches/offset/0', 'Search table');
  });
})
