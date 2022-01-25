const fs = require('fs');
const {v4 : uuid} = require('uuid');
const allowExtension = ["png", "jpg"];
const deleteTemp = (file)=>fs.unlink(file, e=>console.log(e));
const saveFile = ({mimetype, path}, extension, destFolder = './public/images')=>{
    const [type, ext] = mimetype.split("/");
    try{
        if(!extension.includes(ext)){
            throw new Error("formato incorrecto");
        }
        const uid = uuid();
        const fileName = `${uid}.${ext}`;
        const fileNameOut =`${destFolder/fileName}`;
        fs.createReadStream(path).pipe(fs.createWriteStream(fileNameOut));
        deleteTemp(path);
        return fileName;
    }catch(e){
        console.log(e);
        deleteTemp(path);

    }
}
const imgFile = (file) => saveFile(file, allowExtension);
module.exports = {imgFile};
