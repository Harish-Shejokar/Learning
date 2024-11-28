const router = require("express").Router();
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require("fs");


router.get("/", (req, res) => {
    // console.log("=======backend=========", req.ip)
    res.send({ message: "PDF" })
})


router.post("/", async (req, res) => {
    try {
        // Create a new PDFDocument
        // await createForm("form-2");
        // await modifyPdfExistingDocmentInFile("Gunner-Conrad-client-info");
        await modiftyPdfByUrlAndSave("Mario");
        res.send({ message: "PDF Created successfully", })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})



async function createForm(fileName) {
    const pdfDoc = await PDFDocument.create()
  
    const page = pdfDoc.addPage([550, 750])
  
    const form = pdfDoc.getForm()
  
    page.drawText('Enter your favorite superhero:', { x: 50, y: 700, size: 20 })
  
    const superheroField = form.createTextField('favorite.superhero')
    superheroField.setText('One Punch Man')
    superheroField.addToPage(page, { x: 55, y: 640 })
  
    page.drawText('Select your favorite rocket:', { x: 50, y: 600, size: 20 })
  
    page.drawText('Falcon Heavy', { x: 120, y: 560, size: 18 })
    page.drawText('Saturn IV', { x: 120, y: 500, size: 18 })
    page.drawText('Delta IV Heavy', { x: 340, y: 560, size: 18 })
    page.drawText('Space Launch System', { x: 340, y: 500, size: 18 })
  
    const rocketField = form.createRadioGroup('favorite.rocket')
    rocketField.addOptionToPage('Falcon Heavy', page, { x: 55, y: 540 })
    rocketField.addOptionToPage('Saturn IV', page, { x: 55, y: 480 })
    rocketField.addOptionToPage('Delta IV Heavy', page, { x: 275, y: 540 })
    rocketField.addOptionToPage('Space Launch System', page, { x: 275, y: 480 })
    rocketField.select('Saturn IV')
  
    page.drawText('Select your favorite gundams:', { x: 50, y: 440, size: 20 })
  
    page.drawText('Exia', { x: 120, y: 400, size: 18 })
    page.drawText('Kyrios', { x: 120, y: 340, size: 18 })
    page.drawText('Virtue', { x: 340, y: 400, size: 18 })
    page.drawText('Dynames', { x: 340, y: 340, size: 18 })
  
    const exiaField = form.createCheckBox('gundam.exia')
    const kyriosField = form.createCheckBox('gundam.kyrios')
    const virtueField = form.createCheckBox('gundam.virtue')
    const dynamesField = form.createCheckBox('gundam.dynames')
  
    exiaField.addToPage(page, { x: 55, y: 380 })
    kyriosField.addToPage(page, { x: 55, y: 320 })
    virtueField.addToPage(page, { x: 275, y: 380 })
    dynamesField.addToPage(page, { x: 275, y: 320 })
  
    exiaField.check()
    dynamesField.check()
  
    page.drawText('Select your favorite planet*:', { x: 50, y: 280, size: 20 })
  
    const planetsField = form.createDropdown('favorite.planet')
    planetsField.addOptions(['Venus', 'Earth', 'Mars', 'Pluto'])
    planetsField.select('Pluto')
    planetsField.addToPage(page, { x: 55, y: 220 })
  
    page.drawText('Select your favorite person:', { x: 50, y: 180, size: 18 })
  
    const personField = form.createOptionList('favorite.person')
    personField.addOptions([
      'Julius Caesar',
      'Ada Lovelace',
      'Cleopatra',
      'Aaron Burr',
      'Mark Antony',
    ])
    personField.select('Ada Lovelace')
    personField.addToPage(page, { x: 55, y: 70 })
  
    page.drawText(`* Pluto should be a planet too!`, { x: 15, y: 15, size: 15 })
  
    const pdfBytes = await pdfDoc.save()

    // specify the file path where the pdf is saved 
    const outputPath = `./pdfPackageLearning/pdfFiles/${fileName}.pdf`;

    //now writing pdf as file using fs module
    fs.writeFileSync(outputPath, pdfBytes);
}


async function  modiftyPdfByUrlAndSave(fileName) {
    const formUrl = `https://pdf-lib.js.org/assets/dod_character.pdf`;
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    // let existingPdfFile ;
    // fs.readFile(`./pdfPackageLearning/pdfFiles/${fileName}.pdf` ,(err, data)=>{
    //     if (err) {
    //         console.error('Error reading PDF file:', err);
    //         return;
    //     }
    //     // console.log(data);
    //     existingPdfFile = data;
    // } );
    
    // const pdfDoc = await PDFDocument.load(existingPdfFile);

    const formFields = pdfDoc.getForm();
    // formFields.getFields().map((item, index) => console.log("=======",index, item.getName()));

    formFields.getTextField("CharacterName 2").setText("Mario");
    formFields.getTextField("Age").setText("25");

    const pdfBytes = await pdfDoc.save();

     // specify the file path where the pdf is saved 
     const outputPath = `./pdfLearn/pdfFiles/${fileName}.pdf`;

     //now writing pdf as file using fs module
     fs.writeFileSync(outputPath, pdfBytes);

}

async function  modifyPdfExistingDocmentInFile(fileName) {

    let existingPdfFile ;
    existingPdfFile = fs.readFileSync(`./pdfLearn/pdfFiles/${fileName}.pdf`);
    
    const pdfDoc = await PDFDocument.load(existingPdfFile);

    const formFields = pdfDoc.getForm();
    console.log( "=============",formFields.getFields())
    formFields.getFields().map((item, index) => console.log("=======",index, item.getName()));

    // formFields.getTextField("CharacterName 2").setText("Mario");
    // formFields.getTextField("Height").setText("5.8");

    const pdfBytes = await pdfDoc.save();

     // specify the file path where the pdf is saved 
     const outputPath = `./pdfPackageLearning/pdfFiles/${fileName}.pdf`;

     //now writing pdf as file using fs module
     fs.writeFileSync(outputPath, pdfBytes);

}


async function createPdfAndSave(fileName) {
    const pdfDoc = await PDFDocument.create()

    // Embed the Times Roman font

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // Add a blank page to the document
    const page = pdfDoc.addPage()

    // Get the width and height of the page
    const { width, height } = page.getSize()

    // Draw a string of text toward the top of the page
    const fontSize = 30
    page.drawText('Creating PDFs in JavaScript is awesome!', {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // specify the file path where the pdf is saved 
    const outputPath = `./pdfPackageLearning/pdfFiles/${fileName}.pdf`;

    //now writing pdf as file using fs module
    fs.writeFileSync(outputPath, pdfBytes);


}

module.exports = router;