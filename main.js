document.getElementById('ollama-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const prompt = document.getElementById('prompt').value;
  const responseBox = document.getElementById('response');
  responseBox.style.display = 'block';
  responseBox.textContent = '';
  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) sendBtn.classList.add('is-loading');

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: '', // Change to your model name if needed
        prompt: prompt
      })
    });
    if (!res.ok) throw new Error('Ollama API error');
    const reader = res.body.getReader();
    let result = '';
    let partial = '';
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      partial += decoder.decode(value, { stream: true });
      let lines = partial.split('\n');
      partial = lines.pop(); // last line may be incomplete
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const data = JSON.parse(line);
          if (data.response) {
            result += data.response;
            responseBox.textContent = result;
          }
        } catch (e) {
          // ignore malformed lines
        }
      }
    }
    if (sendBtn) sendBtn.classList.remove('is-loading');
  } catch (err) {
    responseBox.textContent = 'Error: ' + err.message;
    if (sendBtn) sendBtn.classList.remove('is-loading');
  }
});
