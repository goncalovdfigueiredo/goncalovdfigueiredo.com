import { useState, useRef, useEffect } from "react";

export default function FloatingProfilePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

  // Fecha o popup se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    if (hasUnread) setHasUnread(false); // Marca como lida ao abrir
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Botão com imagem */}
      <div className="relative">
        <button
          onClick={handleButtonClick}
          className="w-14 h-14 rounded-full shadow-lg border-2 border-white/20 overflow-hidden transition hover:scale-105 relative"
          title="Click to view message"
        >
          <img
            src="/profile.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>

        {/* Badge de notificação */}
        {hasUnread && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold shadow-md">
            1
          </span>
        )}
      </div>

      {/* Caixa de popup */}
      {isOpen && (
        <div
          ref={popupRef}
          className="mt-2 mb-2 mr-1 max-w-sm bg-background text-foreground shadow-xl border border-border rounded-lg p-4 text-sm backdrop-blur-md backdrop-filter"
        >
          <p>
            👋 Hello! Thanks for visiting my portfolio. If you'd like to get in
            touch, feel free to reach out via LinkedIn, email, or explore the
            sections above.
          </p>
        </div>
      )}
    </div>
  );
}
