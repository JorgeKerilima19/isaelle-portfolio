type Card = {
  title: string;
  content: string;
};

type WelcomeProps = {
  title: string;
  paragraph1: string;
  cards: Card[];
};

export function Welcome({ title, paragraph1, cards }: WelcomeProps) {
  return (
    <section className="p-16 py-54 max-w-6xl mx-auto flex flex-col items-center gap-12 mt-24">
      <h2 className="text-5xl font-bold mb-8">{title}</h2>

      <p className="text-[1.6rem] text-center max-w-7xl whitespace-pre-line mb-16">
        {paragraph1}
      </p>

      <div className="flex items-center justify-center max-w-8xl flex-wrap gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-6 border max-w-xl border-gray-200 rounded-lg bg-white shadow-sm"
          >
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              {card.title}
            </h3>
            <p className="text-[1.4rem] text-gray-700">{card.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
