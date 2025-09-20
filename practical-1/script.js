const votes = {
  JavaScript: 0,
  Python: 0,
  Java: 0,
  "C++": 0,
};

function vote(language) {
  votes[language]++;
  updateVotes();
}

function updateVotes() {
  for (const lang in votes) {
    document.getElementById("votes-" + lang).textContent = votes[lang];
  }
}

// setInterval: simulates real-time updates from other users
setInterval(() => {
  // Randomly pick a language to increment
  const langs = Object.keys(votes);
  const randomLang = langs[Math.floor(Math.random() * langs.length)];
  votes[randomLang]++;
  updateVotes();
}, 2000);
