document.getElementById('ollama-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const prompt = document.getElementById('prompt').value;
  const model = document.getElementById('model').value;
  const responseBox = document.getElementById('response');
  const thinkingBox = document.getElementById('thinking');
  responseBox.style.display = 'block';
  responseBox.textContent = '';
  if (thinkingBox) {
    thinkingBox.style.display = 'none';
    thinkingBox.textContent = '';
  }
  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) sendBtn.classList.add('is-loading');

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
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
            // Parse <think>...</think> if present
            let thinkMatch = result.match(/<think>([\s\S]*?)<\/think>/i);
            let mainText = result.replace(/<think>[\s\S]*?<\/think>/i, '').trim();
            if (thinkMatch && thinkingBox) {
              thinkingBox.textContent = thinkMatch[1].trim();
              thinkingBox.style.display = 'block';
            }
            responseBox.textContent = mainText;
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
