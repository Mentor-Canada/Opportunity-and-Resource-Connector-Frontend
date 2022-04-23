import RouteInterface from '../../RouteInterface';
import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import BaseModule from '../BaseModule';
import GetAMentor from './GetAMentor.vue';

class GetAMentorModule extends BaseModule {
  getRoutes(): RouteInterface[] {
    return (new RouteBuilder())
      .title('get-a-mentor')
      .path('get-a-mentor')
      .component(GetAMentor)
      .langCodes(globals.app.langCodes)
      .build();
  }
}

const getAMentorModule = new GetAMentorModule();
