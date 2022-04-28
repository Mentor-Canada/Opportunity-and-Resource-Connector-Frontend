import RouteInterface from '../../RouteInterface';
import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import BaseModule from '../BaseModule';
import FindAMentor from './FindAMentor.vue';

class FindAMentorModule extends BaseModule {
  getRoutes(): RouteInterface[] {
    return (new RouteBuilder())
      .title('find-a-mentor')
      .meta('newTypography', true)
      .path('find-a-mentor')
      .component(FindAMentor)
      .langCodes(globals.app.langCodes)
      .build();
  }
}

const findAMentorModule = new FindAMentorModule();
