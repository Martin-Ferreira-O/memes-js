import fetch from 'node-fetch';
import { memeInterface } from './utils/interfaces';
const BASEURL = 'https://www.reddit.com/r/{url}.json?sort=top&t=day&limit=100';

export async function getMeme(url:string): Promise<memeInterface> {
    let data: memeInterface;
    if (!url) throw new TypeError("You don't put any url");;
    const res = await fetch(BASEURL.replace("{url}", url), { "method": "GET", headers: { 'Content-Type': 'application/json' } });
    
    const json = await res.json();
    const memes: Array<any> = json.data.children;
    if(!memes.length) throw new Error("There is no post on this reddit");
    const randomMeme = memes[Math.floor(Math.random() * memes.length)].data;
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