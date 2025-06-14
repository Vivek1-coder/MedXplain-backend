import { GoogleGenerativeAI } from "@google/generative-ai";

const PreprocessReport = async (req, res) => {
  try {
    const { text } = req.text;
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "No text provided for preprocessing",
      });
    }
    // console.log(process.env);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a medical Ai assitant.Your are provided with a text extracted from a PDF lab-report Document.Your task is to extract the key medical metrics from the text and return them in a structured JSON format.
    The metrics should include all relevant key medical metrice present in the document.Return the metrics in the following JSON format:
    {
      "metrics": {
        "metric1": "value1",
        "metric2": "value2",
        // Add more metrics as needed
      },
      remarks: "if Any additional remarks or notes else keep it empty"
    }
    Here is the text extracted from the PDF lab-report Document:
    ${text}
    Please return the response in JSON format only.
    strictly No extra text , no extra comma , no extra punctuation,no extra quotes  ,no extra backslash and no newline character , no explanation.Only a valid JSON response .`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    if (!responseText) {
      return res.status(502).json({
        success: false,
        message: "Model returned an empty response",
      });
    }

    let cleanResponse = responseText.trim();

    // Remove markdown-like formatting if any
    if (cleanResponse.startsWith("```json")) {
      cleanResponse = cleanResponse.replace(/```json|```/g, "").trim();
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanResponse);
    } catch (err) {
      return res.status(502).json({
        success: true,
        message: "Model responded with a invalid JSON!",
        response: cleanResponse,
      });
    }

    res.status(200).json({
      success: true,
      response: parsedResponse,
    });
  } catch (err) {
    console.error("Error in preProcessPDF:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to preprocess PDF",
      error: err.message,
    });
  }
};

export { PreprocessReport };
