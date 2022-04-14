describe('Program Administrators', () => {
    it('screenshots', () => {
        cy.screenshots('/admin/programs/administrators/00d7c633-8459-4eb4-8c8e-cb2b96882736', 'Program manage admins section as director');
        cy.screenshots('/admin/programs/administrators/23eedcba-0c52-41a3-9f3a-acf42989c380', 'Program manage admins section as non director');
        cy.screenshots('/admin/programs/detail/00d7c633-8459-4eb4-8c8e-cb2b96882736', 'Program detail page as director');
        cy.screenshots('/admin/programs/detail/23eedcba-0c52-41a3-9f3a-acf42989c380', 'Program detail page as non director');
    });
})
