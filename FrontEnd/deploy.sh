set -e
set -x
npm run build
rsync -SavLP www server:~/Project2_EmotionDetection/FrontEnd/
