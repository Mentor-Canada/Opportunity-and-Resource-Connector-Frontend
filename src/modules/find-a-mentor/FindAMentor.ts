import MCSplashCanvas from "../../core/mc-splash-canvas/MCSplashCanvas";

export default class FindAMentor {

  constructor() {
    const splash = new MCSplashCanvas();
    setTimeout(() => {
      splash.targetGlobalOpacity = 0.5;
      splash.startRender();
    }, 250);
  }

}
