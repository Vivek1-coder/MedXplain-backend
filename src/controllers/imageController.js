export const extractText = async (req, res) => {
    if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  try {
    // Initialize Tesseract worker
    const worker = await createWorker({
      logger: m => console.log(m), // Optional: Log progress
    });

    // Set language (e.g., 'eng' for English)
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    // Extract text from image
    const { data: { text } } = await worker.recognize(req.file.path);
    await worker.terminate();

    // Delete uploaded image after processing
    await fs.unlink(req.file.path);

    res.status(200).json({ 
      success: true,
      extractedText: text.trim() 
    });

  } catch (err) {
    console.error('OCR Error:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to extract text' 
    });
  }
}