const sharp = require('sharp');
const fs = require('file-system')

fs.recurse('./toConvert', function(filepath, relative,filename){
    const img = sharp(filepath);
    let defaultSize = 0;
    //let name = filename.substr(0, filename.indexOf(','));
    console.log(filename)
    img.metadata()
    .then(function(data){

        if(data.width < 600 || data.width > 600){
        
            defaultSize = 600;
            adjustImg(filepath, filename, defaultSize);
        
        } else if(data.width > 1200 || data.height > 1200){
        
            defaultSize = 1200;
            adjustImg(filepath, filename, defaultSize);
        
        }

    }).catch(function(err){
        console.log(err, filename)
    })

})

function adjustImg(file, filename, defaultSize){
    sharp(file)
    .resize(defaultSize, defaultSize)
    .jpeg({
        quality: 100,
        force: true})
    .toFile(`./converted/${filename}`, function(error){
      if(!error){
          console.log(`success: ${filename} `)
      }else {
          console.log(error, filename)
      }
  })
}


