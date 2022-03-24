import OptionCollection from 'Models/OptionCollection';

export default {

  serialize(data: any[]): any[] {
    return data.map((row) => {
      if (row.value != '') {
        return row.value;
      }
    });
  },

  deserialize(field): any[] {
    const collection = new OptionCollection();
    for (const row of field) {
      collection.add(row);
    }
    return collection.options;
  },

};
