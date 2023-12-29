import { app } from "electron";
import { existsSync, writeFileSync } from "fs"


const appStore = app.getPath('userData');
const downloads = app.getPath('music');

if (existsSync(`${appStore}/store.json`) == false) {
   writeFileSync(`${appStore}/store.json`,{data:[]});
}

export{
    appStore,downloads
}