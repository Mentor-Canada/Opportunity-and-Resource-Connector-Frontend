import RouteInterface from '../../RouteInterface';
import RouteBuilder from '../../pages/RouteBuilder';
import globals from '../../globals';
import BaseModule from '../BaseModule';
import BecomeAMentor from './BecomeAMentor.vue';

class BecomeAMentorModule extends BaseModule {
  getRoutes(): RouteInterface[] {
    return (new RouteBuilder())
      .title('become-a-mentor')
      .meta('newTypography', true)
      .path('become-a-mentor')
      .component(BecomeAMentor)
      .langCodes(globals.app.langCodes)
      .build();
  }
}

const becomeAMentorModule = new BecomeAMentorModule();
