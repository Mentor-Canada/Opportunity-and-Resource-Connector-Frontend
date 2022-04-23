declare const FLAG_NEW_RESULTS: boolean;
declare const FLAG_SPLIT_SEARCH: boolean;

export default class FeatureFlags {
  public static readonly SPLIT_SEARCH: boolean = FLAG_SPLIT_SEARCH;

  public static readonly NEW_RESULTS: boolean = FLAG_NEW_RESULTS;
}
