import { IMeme } from './utils/interfaces';
/**
 *
 * @param url The name of the subreddit
 * @param force If we want to force the url to be an image
 * @returns all the necessary information of the post
 */
export declare function getMeme(url: string, force?: boolean): Promise<IMeme>;
