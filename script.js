// Список цитат
const quotes = [
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" }
  ];
  
  // Элементы DOM
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const newQuoteButton = document.getElementById('new-quote');
  const telegramShareButton = document.getElementById('telegram-share');
  const vkShareButton = document.getElementById('vk-share');
  const whatsappShareButton = document.getElementById('whatsapp-share');
  
  // Функция для генерации случайной цитаты
  function generateRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { text, author } = quotes[randomIndex];
    quoteText.textContent = `"${text}"`;
    quoteAuthor.textContent = `— ${author}`;
    updateShareLinks(text, author);
  }
  
  // Обновление ссылок для кнопок "Поделиться"
  function updateShareLinks(text, author) {
    const quote = `"${text}" ${author}`;
    const encodedQuote = encodeURIComponent(quote);
  
    telegramShareButton.href = `https://t.me/share/url?url=https://yourwebsite.com&text=${encodedQuote}`;
    vkShareButton.href = `https://vk.com/share.php?url=https://yourwebsite.com&title=${encodedQuote}`;
    whatsappShareButton.href = `https://api.whatsapp.com/send?text=${encodedQuote}`;
  }
  
  // Событие для генерации новой цитаты
  newQuoteButton.addEventListener('click', generateRandomQuote);
  
  // Инициализация виджета с первой цитатой
  generateRandomQuote();
  