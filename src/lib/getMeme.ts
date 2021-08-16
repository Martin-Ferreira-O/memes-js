import axios from "axios";
import { IMeme } from './';
const BASEURL = 'https://www.reddit.com/r/{url}.json?sort=top&t=day&limit=100';
/**
 * 
 * @param url The name of the subreddit
 * @param force If we want to force the url to be an image
 * @returns all the necessary information of the post
 */
export const getMeme = async (url:string, force: boolean = false): Promise<IMeme> => {
    if (typeof url != 'string') throw TypeError("The url received is not a string, I received " + typeof url);
    if (typeof force != 'boolean') throw TypeError("The force received is not a boolean, I received " + typeof url);

    let data: IMeme;
    const res = await axios.get(BASEURL.replace("{url}", url));
    const memes: Array<any> = res.data.data.children;
    if(!memes.length) throw new Error("There is no post on this reddit");
    const randomMeme = memes[Math.floor(Math.random() * memes.length)].data;
    if(!/^.*\.(jpg?g|png|gif|gifv)$/.test(randomMeme.url) && force) return getMeme(url, true);
    data = {
        title: randomMeme.title,
        author: randomMeme.author,
        created: randomMeme.created,
        downs: randomMeme.downs,
        ups: randomMeme.ups,
        url: randomMeme.url,
        comments: randomMeme.num_comments
    }
    return data;
}