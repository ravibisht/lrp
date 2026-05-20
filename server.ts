import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const PORT = 3000;

// Lazy initialization of GoogleGenAI client to avoid crashes if GEMINI_API_KEY is not defined yet
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

const LOCAL_FALLBACK_ROASTS = [
  "Auditor's Report: Highly Unstable behavior! You sleep at 4 AM and wake up at 2 PM, seeking 'growth'. Draw a chalk circle around your phone and back away slowly!",
  "REKHA AUDIT WARNING: Subject shows strong CJP (Cockroach Janta Party) sympathizer symptoms. Enjoys damp blankets, late-night instant noodles in dark corners, and avoids daylight. We are drawing a Lakshman Rekha over your front door!",
  "REKHA AUDITED: Laziness Quotient exceeds normal limit. Recommended therapy: Draw 10 Lakshman Rekhas on your desk and sit within them for 2 hours of solid study/work.",
  "ALERT: Cockroach presence detected in thoughts. You have scrolled Reels for 3 hours today. Draw the Rekha now, or Baygon will be dispatched!",
  "VERDICT: Innocent of laziness, but highly distracted. Your Rekha status is: 'Prone to Procrastination'. Recommended: 5 sets of chalk-scribbling exercises."
];

const LOCAL_SLOGANS = [
  "Line ke is paar, self-respect aur dildaar. Line ke us paar, balti, room and berozgaar!",
  "Lakshman Rekha is not a boundary, it's a personality development line!",
  "Clean lines make clean lives. Be a Rekha Ranger, not a Corner Crawler!",
  "No more corner sleeping! CJP, your moisture-rich reign is finished!",
  "A message to lazy youth: Chalk is cheap, but safety is priceless. Draw your boundary!"
];

async function startServer() {
  const app = express();
  app.use(express.json());

  // API router - ROASTING / INQUISITION ENGINE
  app.post("/api/audit-cjp-behavior", async (req, res) => {
    const { name, behavior, cjpAffiliationScale } = req.body;
    
    const client = getGeminiClient();

    if (!client) {
      // Graceful fallback with humorous preset responses when API key is not present
      const randomIndex = Math.floor(Math.random() * LOCAL_FALLBACK_ROASTS.length);
      const randomSlogan = Math.floor(Math.random() * LOCAL_SLOGANS.length);
      return res.json({
        success: true,
        isFallback: true,
        roast: `${name ? `Dear ${name} (Volunteer ID: LRP-MOCK-${Math.floor(1000 + Math.random() * 9000)})` : "Fellow citizen"}, based on our physical local ledger, here is your audit verdict: ${LOCAL_FALLBACK_ROASTS[randomIndex]}`,
        status: "CHALK_REKHA_ACTIVE",
        slogan: LOCAL_SLOGANS[randomSlogan],
        actionRequired: "Draw a border line in your room with white chalk immediately and stand on the clean side."
      });
    }

    try {
      const prompt = `You are the Honorable Chief Justice of the Lakshman Rekha Party (LRP), a fictional political party of highly-organized, self-improving, border-defining Indian Gen Z youth (18-30). Your party logo is the protective circle drawn in chalk, and your arch-enemy is the Cockroach Janta Party (CJP), who are chaotic, lazy, sleep-deprived corner-dwelling insect-sympathizers.

You must audit a citizen's CJP-leaning habits.
Citizen's Name: ${name || "Anonymous Citizen"}
Reported Behavior: "${behavior || "Likes sitting in dark rooms scrolling reels all night"}"
Affiliation to Cockroach culture scale: ${cjpAffiliationScale || 5}/10.

Write a roasting political assessment/verdict in hilarious Hinglish (Hindi + English) with strong Indian Gen-Z internet slang (terms like "beta", "bro thinks", "clown behavior", "room cleanup", "Rekha checked", "rekt", "Baygon treatment", "LRP high command").
Your response must be extremely funny, energetic, mock-authoritarian, and motivational. Call out their cockroach habits (like eating Maggi in the dark, being lazy, refusing to line up their desk) and demand they clean up, draw their boundaries, and rise as a "Rekha Ranger" or "Rekha Warrior".

Return the response strictly as a JSON object with this exact structure (do not wrap in markdown blocks, return pure raw JSON or standard parsable format):
{
  "roast": "The long, funny Hinglish roast and verdict...",
  "status": "A short funny status label like 'COCKROACH_INFESTED_BRAIN' or 'REKHA_RANGER_CANDIDATE' or 'BAYGON_TARGET_LEVEL_9'",
  "slogan": "A customized funny rally slogan or chanting line tailored to their roast",
  "actionRequired": "A funny remedial task they must perform within 24 hours to gain LRP immunity"
}`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.9,
        }
      });

      const responseText = response.text || "";
      let parsedData;
      try {
        parsedData = JSON.parse(responseText.trim());
      } catch (e) {
        // Fallback parse if the LLM output can't be cleanly parsed directly
        parsedData = {
          roast: responseText,
          status: "REKHA_ALERT_ACTIVE",
          slogan: "Border par khade raho, lazy habits se lade raho!",
          actionRequired: "Clean your table and draw a straight line dividing clean work area from snack area"
        };
      }

      res.json({
        success: true,
        isFallback: false,
        ...parsedData
      });

    } catch (error: any) {
      console.error("Gemini API Error:", error.message);
      res.status(500).json({
        success: false,
        error: "Failed to audit behavior",
        details: error.message
      });
    }
  });

  // Hot-Slogans and Meme-Sticker Generator Route
  app.post("/api/generate-slogan", async (req, res) => {
    const { topic } = req.body;
    const client = getGeminiClient();

    if (!client) {
      const phrases = [
        "Aar paar, baandho rekha ke taar!",
        "Chalk uthao, cockroach bhagao!",
        "Line ke andar clean work, line ke baahar CJP quirk!",
        "Mera desk safe, Lakshman Rekha ke peeche!",
        "Gen Z ka dharam: Boundaries first, chilling second!"
      ];
      const randomSlogan = phrases[Math.floor(Math.random() * phrases.length)];
      return res.json({ slogan: randomSlogan });
    }

    try {
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Create a funny one-line political slogan for the imaginary 'Lakshman Rekha Party' (LRP) in Hinglish based on the topic: "${topic || "studying hard"}". 
        It must sound like a dramatic Indian election chant (e.g. "Abki Baar, Chalk Sarkar" or similar) combined with youth meme speak. Return only the text. Max 15 words.`,
      });
      res.json({ slogan: response.text?.trim() });
    } catch {
      res.json({ slogan: "Chalk ka dhar dhar, CJP behadd darr!" });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA catch-all
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lakshman Rekha Server running on http://localhost:${PORT}`);
  });
}

startServer();
