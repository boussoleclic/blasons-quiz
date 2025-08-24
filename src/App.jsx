import { useState } from "react";

// Liste réduite de blasons
const blasons = [
  {
    name: "Stark",
    image: "https://www.lagardedenuit.com/wiki/images/8/89/Blason-stark-2014-v01-256px.png",
    options: ["Stark", "Lannister", "Targaryen", "Baratheon"],
  },
  {
    name: "Lannister",
    image: "https://www.lagardedenuit.com/wiki/images/e/e7/Blason-lannister-2014-v01-256px.png",
    options: ["Greyjoy", "Tully", "Lannister", "Arryn"],
  },
  {
    name: "Targaryen",
    image: "https://www.lagardedenuit.com/wiki/images/8/80/Blason-targaryen-2014-v01-256px.png",
    options: ["Martell", "Stark", "Targaryen", "Baratheon"],
  },
  {
    name: "Baratheon",
    image: "https://www.lagardedenuit.com/wiki/images/a/a5/Blason-baratheon-2014-v01-256px.png",
    options: ["Baratheon", "Tyrell", "Greyjoy", "Arryn"],
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);

  const question = blasons[current];

  const handleAnswer = (choice) => {
    if (answered) return;
    setSelected(choice);
    setAnswered(true);
    if (choice === question.name) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setAnswered(false);
    setSelected(null);
    setCurrent((prev) => (prev + 1) % blasons.length);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Quiz des Blasons de Westeros</h1>
      <img
        src={question.image}
        alt="Blason"
        style={{ width: "200px", margin: "20px auto" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", maxWidth: "300px", margin: "auto" }}>
        {question.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            style={{
              padding: "10px",
              backgroundColor:
                answered && opt === question.name
                  ? "lightgreen"
                  : answered && opt === selected
                  ? "salmon"
                  : "#eee",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <div style={{ marginTop: "20px" }}>
          {selected === question.name ? (
            <p style={{ color: "green" }}>✅ Bonne réponse !</p>
          ) : (
            <p style={{ color: "red" }}>
              ❌ Mauvais choix... La réponse était {question.name}.
            </p>
          )}
          <button onClick={nextQuestion} style={{ marginTop: "10px", padding: "10px" }}>
            Question suivante
          </button>
        </div>
      )}
      <p style={{ marginTop: "20px" }}>
        Score : {score} / {blasons.length}
      </p>
    </div>
  );
}

export default App;
