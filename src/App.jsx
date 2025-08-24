import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Prototype: Quiz de blasons (liste augmentée avec 5 questions)
const blasons = [
  {
    name: "Stark",
    image: "https://www.lagardedenuit.com/images/3/3d/Blason_Stark.png",
    options: ["Stark", "Lannister", "Targaryen", "Baratheon"],
  },
  {
    name: "Lannister",
    image: "https://www.lagardedenuit.com/images/f/f1/Blason_Lannister.png",
    options: ["Greyjoy", "Tully", "Lannister", "Arryn"],
  },
  {
    name: "Targaryen",
    image: "https://www.lagardedenuit.com/images/1/1e/Blason_Targaryen.png",
    options: ["Martell", "Stark", "Targaryen", "Baratheon"],
  },
  {
    name: "Baratheon",
    image: "https://www.lagardedenuit.com/images/5/5e/Blason_Baratheon.png",
    options: ["Baratheon", "Tyrell", "Greyjoy", "Arryn"],
  },
  {
    name: "Greyjoy",
    image: "https://www.lagardedenuit.com/images/9/9f/Blason_Greyjoy.png",
    options: ["Greyjoy", "Stark", "Lannister", "Targaryen"],
  },
];

export default function BlasonQuiz() {
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md p-6 text-center shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold mb-4">Quiz des Blasons de Westeros</h1>
        <CardContent>
          <img
            src={question.image}
            alt="Blason"
            className="mx-auto mb-4 w-40 h-40 object-contain"
          />
          <div className="grid grid-cols-2 gap-2">
            {question.options.map((opt) => (
              <Button
                key={opt}
                onClick={() => handleAnswer(opt)}
                variant={
                  answered && opt === question.name
                    ? "default"
                    : answered && opt === selected
                    ? "destructive"
                    : "outline"
                }
              >
                {opt}
              </Button>
            ))}
          </div>
          {answered && (
            <div className="mt-4">
              {selected === question.name ? (
                <p className="text-green-600 font-semibold">✅ Bonne réponse !</p>
              ) : (
                <p className="text-red-600 font-semibold">
                  ❌ Mauvais choix... La réponse était {question.name}.
                </p>
              )}
              <Button className="mt-2" onClick={nextQuestion}>
                Question suivante
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <p className="mt-4 text-lg">Score : {score} / {blasons.length}</p>
    </div>
  );
}