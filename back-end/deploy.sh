set -e
set -x
npm run build
rsync -SavLP \
  package.json \
  dist \
  server:~/Project2_EmotionDetection/back-end/
ssh server "
  set -e
  cd ~/
  source .nvm/nvm.sh
  cd ~/Project2_EmotionDetection/back-end/
  npm i --omit=dev
  # npm run start:prod
  forever restart dist/src/main.js
"