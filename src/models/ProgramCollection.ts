import WindowInterface from 'Interfaces/WindowInterface';

import Program from './Program';

declare const window: WindowInterface;

export default class ProgramCollection {
  public list: Program[] = [];

  get(search: string, callback: () => void) {
    const params = new URLSearchParams();
    if (search) {
      params.set('filter[search][condition][path]', 'field_display_title');
      params.set('filter[search][condition][value]', search);
      params.set('filter[search][condition][operator]', 'CONTAINS');
    }
    params.set('include', 'field_region');
    params.set('include', 'field_organization');
    params.set('sort', 'field_display_title');

    window.api.get(`/a/programs?${params.toString()}`)
      .then((result) => {
        const { included } = result.data;
        result.data.data.forEach((programData) => {
          const program = new Program(programData);
          let regionId: string;
          if (programData.relationships.field_region.data) {
            regionId = programData.relationships.field_region.data.id;
          }
          included?.forEach((row) => {
            if (row.id == regionId) {
              program.regionTitle = row.attributes.title;
            }
            if (row.id == program.organizationId) {
              program.organizationTitle = row.attributes.title;
            }
          });
          this.list.push(program);
        });
        if (callback) {
          callback();
        }
      });

    // const app = new App();
    // console.log(window.app);
    // console.log(window.app);
  }
}
