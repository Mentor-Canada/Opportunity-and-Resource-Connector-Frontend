describe('Organization Administrators', () => {
  it('screenshots', () => {
    cy.screenshots('/admin/organizations/administrators/d96cb4ee-2166-4121-9f1c-d140d1a3f1b7', 'Organization manage admins section');
    cy.screenshots('/admin/organizations/administrators/7747fbca-9461-4906-895b-5fed432ed0e3', 'Organization manage admins section as non director');
    cy.screenshots('/admin/organizations/detail/d96cb4ee-2166-4121-9f1c-d140d1a3f1b7', 'Organization detail page');
    cy.screenshots('/admin/organizations/detail/7747fbca-9461-4906-895b-5fed432ed0e3', 'Organization detail page as non director');
  });
})

