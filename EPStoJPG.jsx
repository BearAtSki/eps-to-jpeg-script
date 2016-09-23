#target Photoshop

// Script imports EPS files from a specified folder into Photoshop, then saves them as JPG files and closes the opened document.
// Define the Folder, the maximum width/height and the orientation of your images, then sit back and enjoy a tasty coffee, a cookie or a glass of wine, if you're that type of person. Go ahead, I won't judge you.

// Script by BearAtSki


// Define the length of the longest side of the final JPG in pixels
var longestSide = 5000;


// The orientation of the images - true for landscape, false for portrait orientation.
var isLandscape = false;


// Path to the folder that contains the EPS files - "C:/Folder/Another_Folder/"
// Don't forget to change all backslashes ("\") to forward slashes ("/").
var sourceFolder = Folder(" *** MAGIC *** ");


// Importing the EPS files
var epsOpts = new EPSOpenOptions();
epsOpts.antiAlias = true;

// Color mode, RGB by default, other values: GRAYSCALE, CMYK, LAB
epsOpts.mode = OpenDocumentMode.RGB;
epsOpts.resolution = 72;
epsOpts.constrainProportions = true;

if (isLandscape){
	epsOpts.width = new UnitValue( longestSide, 'px' );
	}
	else{
		epsOpts.height = new UnitValue( longestSide, 'px' ); 
	}


var fileList = sourceFolder.getFiles(/\.(eps)$/i);
for(var a = 0 ;a < fileList.length; a++){
if(fileList[a] instanceof File){
var doc = open(fileList[a],epsOpts);
var doc = app.activeDocument;


// Setting the documents resolution to 300 DPI
doc.resizeImage(null,null,300,ResampleMethod.NONE);


// Correcting the height and/or width of the image
if (doc.height > longestSide) {
    doc.resizeImage(null,UnitValue(longestSide,"px"),null,ResampleMethod.BICUBIC);
}

if (doc.width > longestSide) {
    doc.resizeImage(UnitValue(longestSide,"px"),null,null,ResampleMethod.BICUBIC);
}


// Saving the JPG files
var saveOptions = new JPEGSaveOptions();
saveOptions.embedColorProfile = true;
saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
saveOptions.matte = MatteType.NONE;
saveOptions.quality = 12;

var docName = doc.name.replace(/\.[^\.]+$/, '');
var jpegName = decodeURI(doc.path) + "/" + docName + ".jpg";
var saveName = new File(jpegName);

doc.saveAs(saveName, saveOptions, true, Extension.LOWERCASE);


// Closing the opened document
function closeCurrentDocument() {
	activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

closeCurrentDocument()

}
};