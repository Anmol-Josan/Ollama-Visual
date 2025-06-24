# Ollama Visual

Ollama Visual is a clean, modern web UI for interacting with models via APIs. It features a calming animated background, a simple prompt/response interface, and a beautiful, minimal design using Bulma CSS.

## Features
- Animated, calming gradient background
- Simple prompt/response form for sending messages to models
- Token-by-token response streaming for real-time feedback
- Responsive and mobile-friendly layout
- Built with Bulma CSS for easy customization

## Usage
1. Set up your environment:
   - Create a `.env` file in the root directory.
   - Add your GitHub API key: `API_KEY=your_api_key_here`.
2. Open `index.html` in your browser.
3. Select a model from the dropdown menu.
4. Enter your prompt in the textarea and click **Send**.
5. View the response below the form, streamed token by token.
6. Use the **Clear** button to reset the prompt and response.

## Customization
- Edit `style.css` or the `<style>` section in `index.html` to change colors, fonts, or animations.
- Update `github-api.js` to modify the API interaction logic.

## Installation
1. Download or clone the repository.
2. Install dependencies:
   ```bash
   npm install dotenv
   ```
3. Run the local server:
   ```bash
   npm start
   ```
   or simply open `index.html` in your browser if you don't need a server.
4. Open your browser and navigate to the local server URL.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the coding style and include tests for new features.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Bulma CSS](https://bulma.io/) for the beautiful and responsive design.
- [Ollama](https://ollama.com/) for the model APIs.