const sharp = require('sharp');
const fs = require('file-system')

fs.recurse('./toConvert', function(filepath, relative,filename){
    
    const img = sharp(filepath);
    
    let defaultSize = 0;
    
    
    let name = filename.substr(0, (filename.length -4));  
    
    let extension = filename.substr(filename.length -3);

    img.metadata()
    .then(function(data){

        if(data.width < 600 || data.width > 600){
            defaultSize = 600;
            adjustImg(filepath, name, defaultSize, extension);
        
        } else if(data.width > 1200 || data.height > 1200){
        
            defaultSize = 1200;
            adjustImg(filepath, name, defaultSize, extension);
        
        }

    }).catch(function(err){
        console.log(err, filename)
    })

})

function adjustImg(file, filename, defaultSize, extension){
    
    sharp(file)
    .resize( defaultSize, defaultSize,
        { 
        fit: 'contain',
        background: { r: 255, g: 255, b: 255}
        }
    )
    .flatten({
        background:  { r: 255, g: 255, b: 255}
    })
    .jpeg({
        quality: 100,
        force: true})
    .toFile(`./converted/${filename}.jpg`, function(error){
      if(!error){
          if(extension === 'png' || extension ==='PNG'){
            console.log(`convertido: ${filename}, no formato: ${extension}, para jpg`)
          }
      }else {
          console.log(error, filename)
      }
  })
}


