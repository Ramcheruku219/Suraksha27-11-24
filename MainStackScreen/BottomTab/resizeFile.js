import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

export async function resizeAndConvertToPDF(imageUri) {
    try {
        // Resize the image
        const resizedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [{ resize: { width: 500 } }], // adjust the width to your needs
            { compress: 0.5, format: 'jpeg' } // specify the format as 'jpeg'
        );

        const pdfUri = await FileSystem.cacheDirectory + 'converted_image.pdf';
        const pdfData = await ImageManipulator.manipulateAsync(
            resizedImage.uri, 
            [],
            { format: ImageManipulator.SaveFormat.PDF }
        );
        console.log(pdfData)
        return pdfData;
    } catch (error) {
        console.error('Error resizing and converting image:', error);
        return null;
    }
}
