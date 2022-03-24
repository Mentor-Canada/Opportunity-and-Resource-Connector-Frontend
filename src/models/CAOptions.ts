import globals from '../globals';

export default {
  distanceOptions() {
    return [
      { value: '5', name: globals.app.t('app-5-km') },
      { value: '10', name: globals.app.t('app-10-km') },
      { value: '15', name: globals.app.t('app-15-km') },
      { value: '25', name: globals.app.t('app-25-km') },
      { value: '30', name: globals.app.t('app-30-km') },
      { value: '50', name: globals.app.t('app-50-km') },
      { value: '75', name: globals.app.t('app-75-km') },
      { value: '100', name: globals.app.t('app-100-km') },
    ];
  },
};
