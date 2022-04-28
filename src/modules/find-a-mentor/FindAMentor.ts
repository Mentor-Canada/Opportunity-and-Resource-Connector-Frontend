import MCSplashCanvas from "../../core/mc-splash-canvas/MCSplashCanvas";

export default class FindAMentor {

  public splash: MCSplashCanvas;

  constructor() {
    this.splash = new MCSplashCanvas();
    setTimeout(() => {
      this.splash.targetGlobalOpacity = 0.5;
      this.splash.startRender();
    }, 250);
  }

}
