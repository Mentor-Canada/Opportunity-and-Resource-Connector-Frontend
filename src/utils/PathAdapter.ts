export default class PathAdapter {

  public static kebabCase(path: string): string {
    let dataUrl = path
    dataUrl = dataUrl.replace(/(?:en|fr)(?=\/|$)/, ''); // Strip language
    dataUrl = dataUrl.replace(/^\/+|\/+$/g, ''); // Strip leading and trailing '/'
    dataUrl = dataUrl.replace(/\//g, '-');
    if(!dataUrl) {
      dataUrl = 'home';
    }
    return dataUrl;
  }

}
