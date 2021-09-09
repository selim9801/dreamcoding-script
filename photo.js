const fs = require('fs');
const path = require("path");

const arg = process.argv[2];
let data=[];

const dir = `/Users/selim/Documents/${arg}`;
const test=fs.readdirSync(dir);

// 캡쳐 
const captured=test.map(fileName=>{
   return /[\.](png|aae)/.test(fileName)?makeFolder('captured',fileName) : '';
})

// 비디오
const video = test.map(fileName=>{
    return /[\.](mov|mp4)/.test(fileName) ? makeFolder('video',fileName):'';
})

//이미지  
const duplicated=test.map(fileName=>{
    let duplicat=/(?!E)[0-9A-Za-z]+.jpg/.exec(fileName);
    if(duplicat){
        data.push(duplicat);
    }    
})
// ** 이미지 편집본, 원본 선별과정 
let duplicatedFile=[];
for(let i=0; i<data.length-1; i++){
    for(let j=i+1; j<data.length; j++){
        if(data[i][0]=== data[j][0]){
         duplicatedFile.push(data[i].input,data[j].input);
         duplicatedFile.forEach(arr=>{
           let result=/\_(?!E)[0-9A-Za-z]+.jpg/.test(arr);
           if(result){
               makeFolder('duplicated',arr);
           }
         })
        }
    }
}
//  ** 
function makeFolder(folderName,fileName){
 
    if(!fs.existsSync(`${dir}/${folderName}`)){
        fs.mkdirSync(`${dir}/${folderName}`)
    }
    fs.rename(`${dir}/${fileName}`,`${dir}/${folderName}/${fileName}`,(error)=>
        {console.error(error)})
    
}
