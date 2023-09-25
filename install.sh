git clone https://github.com/Redstonerayy/templex/ ~/.templex
cd ~/.templex
npm install
npm run build
echo 'alias templex="node ~/.templex/dist/main.js"' >> ~/.zshrc
source ~/.zshrc
echo 'alias templex="node ~/.templex/dist/main.js"' >> ~/.bashrc
source ~/.bashrc
