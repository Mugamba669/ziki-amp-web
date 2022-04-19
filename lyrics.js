// // const axios = require('axios');
// // const cheerio = require('cheerio');
// // const { writeFileSync } = require('fs');
// // axios.get(`https://www.nowviba.com/music/pages/top100.php`).then((dom) => {
// //     // console.log(data);
// //    const $ = cheerio.load(dom.data);
// //    const scrapped = $('.hot100');
// //   const result =  scrapped.map((index,element)=>{
// //     let hot100 = {
// //         title:`${element.children[0].children[5].children[0].children[0].data}`,
// //         artist:`${element.children[0].children[5].children[1].children[0].data}`,
// //         artWork:`${element.children[0].children[3].children[1].attribs.data}`,
// //         url:element.children[2].children[3].children[1].attribs.src
// //     }
// //     writeFileSync('./store.json',JSON.stringify(hot100));
// //     console.log(hot100);
// //    });
// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
//   params: {id: 'UxxajLWwzqY', geo: 'DE'},
//   headers: {
//     'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com',
//     'X-RapidAPI-Key': '53270e0713msh3bb3495e68457b3p1cd1f7jsn11f3de1d1003'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
   
// // })
// // // musixmatch.getURL(`panda`).then((r) => musixmatch.getLyrics(r)).then((lyrics) => console.log(lyrics));
// const conclearsole = require("console");
const { readdirSync,statSync } = require("fs");
const mm = require('music-metadata-browser')
const { extname } = require("path");
var recursiveFolders = (dir)=>{
  var store = readdirSync(dir);
  store.forEach((track,index)=>{
      //  
      let newPath = dir+'/'+track;
      if(statSync(newPath).isDirectory() == true){
           recursiveFolders(newPath);
               console.log(newPath);

      }else if(statSync(newPath).isFile() == true && extname(newPath) == ".mp3"){
        // mm.fetchFromUrl(newPath).then((meta)=>{
        //   console.log(meta.common.artist)
        // })
        console.log(newPath);
      }
  });
}
recursiveFolders("/home/blabs/Music");
