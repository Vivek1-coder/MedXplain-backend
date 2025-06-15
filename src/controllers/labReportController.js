import { GoogleGenerativeAI } from "@google/generative-ai";
import {SummaryModel} from "../models/Summary.Model.js"
const labReportLogic = async (req, res) => {
  try {
    const { metrices, remarks } = req.body;
    const user_id=req.user._id;

    if (!metrices || typeof metrices !== "object") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or missing metrics object" });
    }

    const formattedMetrics = Object.entries(metrices)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an experienced medical assistant AI. Given a set of lab metrics and remarks, return a structured JSON response with:
    A medical summary (it should be in easy language and detailed  that a common man can easily understand the summary).
    An explanation of what the results mean in simple terms.
    Actionable insights or suggestions for next steps.
    Instructions:
    Use medical deatiled reasoning.
    Do not output anything except valid JSON.
    The output should be suitable for displaying in a medical UI.
    Input:
    Metrics: ${formattedMetrics}
    Remarks: ${remarks || "None"}
    Output Format:
    {
    "summary": "...detailed summary",
    "explanation": "... detailed explaination",
    "actionable_insights": ["...", "..."]
    }
    Example:
    {
    "summary": "Low hemoglobin and high WBC suggest possible anemia with underlying infection.",
    "explanation": "WBC is elevated indicating infection or inflammation. Low hemoglobin indicates anemia. Patient symptoms     of fatigue support this finding.",
    "actionable_insights": [
    "Recommend complete iron panel to assess iron deficiency.",
    "Investigate signs of infection: CBC trend, urine/stool test.",
    "Consider referral to hematologist if anemia persists."
    ]
    }
    strictly No extra text,no extra comma , no extra punctuation, no  quotes  ,no extra backslash and no newline character , no   explanation.Only a valid JSON response .

    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    if (!responseText) {
      return res.status(502).json({
        success: false,
        message: "Model returned an empty response",
      });
    }
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (err) {
      return res.status(502).json({
        success: true,
        message: "Model responded with a invalid JSON!",
        response: responseText,
      });
    }
    // save the summary to the database
    const newSummary = new SummaryModel({
      user_id: user_id,
      metrics: metrices || {},
      remarks: remarks || "",
      summary: parsedResponse.summary,
      explanation: parsedResponse.explanation,
      actionable_insights: parsedResponse.actionable_insights,
    });

    const savedSummary = await newSummary.save();

    if (!savedSummary) {
      return res.status(502).json({
        success: true,
        message: "Failed to save summary to the database",
        response: parsedResponse,
      });
    }

    res.status(200).json({
      success: true,
      response: savedSummary,
    });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to process your query using Gemini",
      error: err.message,
    });
  }
};

export { labReportLogic };
