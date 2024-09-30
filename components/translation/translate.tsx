// components/TranslateComponent.tsx
import { useState } from "react";

const TranslateComponent = () => {
  const [message, setMessage] = useState<string>("");
  const [targetLang, setTargetLang] = useState<string>("es"); // Default to Spanish
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTranslatedText(null);

    try {
      const response = await fetch("/api/translation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, targetLang }),
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleTranslate}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter text to translate"
          rows={4}
          cols={50}
        />
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          {/* Add more languages as needed */}
        </select>
        <button type="submit">Translate</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {translatedText && (
        <div>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslateComponent;
