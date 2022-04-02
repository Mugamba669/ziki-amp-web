const axios = require('axios');
const cheerio = require('cheerio');
const { writeFileSync } = require('fs');
axios.get(`https://www.nowviba.com/music/pages/top100.php`).then((dom) => {
    // console.log(data);
   const $ = cheerio.load(dom.data);
   const scrapped = $('.hot100');
  const result =  scrapped.map((index,element)=>{
    let hot100 = {
        title:`${element.children[0].children[5].children[0].children[0].data}`,
        artist:`${element.children[0].children[5].children[1].children[0].data}`,
        artWork:`${element.children[0].children[3].children[1].attribs.data}`,
        url:element.children[2].children[3].children[1].attribs.src
    }
    writeFileSync('./store.json',JSON.stringify(hot100));
    console.log(hot100);
   });
   
   
})
// musixmatch.getURL(`panda`).then((r) => musixmatch.getLyrics(r)).then((lyrics) => console.log(lyrics));