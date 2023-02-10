import { EmojiGameService } from './emoji-game.service';
import { Component, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-emoji-game',
  templateUrl: './emoji-game.page.html',
  styleUrls: ['./emoji-game.page.scss'],
})
export class EmojiGamePage {
  timeLeft: number = 60;
  isStarted = false;
  playerScore = 0;
  statusText = '';
  darkStatus = false;
  timer:any
  audio:any

  //player Initial Score
  // stats = new Stats();

  video!: HTMLVideoElement;
  model: any;
  predictResult = '';

  currentRequireEmotions = {
    Emotion: '',
    Emojis: '',
  };
  
  

  constructor(
    private elementRef: ElementRef,
    private emojiGameService: EmojiGameService,
    private alertController: AlertController
  ) {}

  changeDarkModeAndLightMode() {
    console.log(this.darkStatus);

    if (this.darkStatus == false) {
      document.body.parentElement?.classList.add('dark');
    } else {
      document.body.parentElement?.classList.remove('dark');
    }

    this.darkStatus = !this.darkStatus;
  }

  async ionViewWillEnter() {
    let alert = await this.alertController.create({
      header: 'RULE OF THIS GAME ',
      message: ` You have 1 minute in each round to display your facial emotions according to the emoji shown on your screen.`,
      buttons: [
        {
          text: `Let's go`,
          handler: () => {
            return this.start();
          },
        },
      ],
    });

    await alert.present();
  }

  async start() {
    this.isStarted = true;

    let timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.timeLeft === 0) {
        this.statusText = 'Game Over!';
        clearInterval(timer);
        this.end();
        return;
      }
    }, 1000);

    await this.load();
    await this.getRandomEmoji();
    this.predictModel();
    this.playBackgroundMusic();
  }

  async end() {
    if (!localStorage.getItem('token')) {
      let alert = await this.alertController.create({
        header: 'Result of this round:',
        message: this.playerScore.toString(),
        buttons: [
          {
            text: `Another Round`,
            handler: () => {
              return this.start();
            },
          },
        ],
      });

      await alert.present();

      this.isStarted = false;
      this.endBackgroundMusic()
      this.resetGame();
    }
    this.isStarted = false;
    this.endBackgroundMusic()
    this.emojiGameService.submit({ score: this.playerScore });
    this.resetGame();
  }

  async load() {
    let video = (this.video =
      this.elementRef.nativeElement.querySelector('video'));
    let statsContainer: HTMLVideoElement =
      this.elementRef.nativeElement.querySelector('.stats-container');

    await this.loadModel();
    await this.loadCamera(video);

    // this.model = await modalP;
  }

  async loadCamera(video: HTMLVideoElement) {
    let constraints = {
      audio: false,
      video: {
        facingMode: 'environment',
      },
    };
    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    await new Promise<void>((resolve) => {
      this.video.addEventListener('loadeddata', async () => {
        resolve();
      });
      this.video.srcObject = stream;
    });
  }

  async loadModel() {
    const modelUrlPath =
      'https://cdn.jsdelivr.net/gh/stella-woo/Project2_EmotionDetection_CNN_model/myModelJs/outputFile/model.json';
    this.model = await tf.loadGraphModel(modelUrlPath);
    // return model;
  }

  async predictModel() {
    let { video, model } = this;

    const imgSize = 224;
    const [divNum, subNum] = [1, 0]; // [0:255]
    const labels = [
      'Angry',
      'Disgusted',
      'Fearful',
      'Happy',
      'Neutral',
      'Sad',
      'Surprised',
    ];

    // stats.begin();

    // Prevent memory leaks by using tidy
    let imgPre = await tf.tidy(() => {
      return tf.browser
        .fromPixels(video)
        .resizeNearestNeighbor([imgSize, imgSize])
        .toFloat()
        .div(tf.scalar(divNum))
        .sub(tf.scalar(subNum))
        .expandDims();
    });

    const result = await model.predict(imgPre).data();

    await tf.dispose(imgPre); // clear memory

    // result
    let ind = result.indexOf(Math.max(...result));

    this.predictResult = `${labels[ind]} : ${result[ind] * 100}%`;

    this.determineMatch(labels[ind], result[ind]);

    // stats.end();
    requestAnimationFrame(() => this.predictModel());
  }

  determineMatch(labels: string, result: number) {
    if (labels === this.currentRequireEmotions.Emotion && result > 0.6) {
      this.playerScore += 1;
      this.emojiGameService
        .determineMatch({ score: this.playerScore })
        .subscribe({
          next: (data) => {
            console.log(data);
          },
        });
      this.playScoredAudio();
      this.getRandomEmoji();
    }
  }
  async resetGame() {
    this.playerScore = 0;
    this.currentRequireEmotions.Emotion = '';
  }
  async getRandomEmoji() {
    let emotion: { Emotion: string; Emojis: any[] }[] = [
      {
        Emotion: 'Happy',
        Emojis: ['😊', '☺️', '😃', '😄', '😁', '😀', '😆', '🥰'],
      },
      {
        Emotion: 'Fearful',
        Emojis: ['🫣', '😱', '🫢', '🙀'],
      },
      {
        Emotion: 'Sad',
        Emojis: ['😞', '😔', '😟', '😣', '🥺', '😫', '😢', '😭'],
      },
      {
        Emotion: 'Disgusted',
        Emojis: ['😒', '🤢'],
      },
      {
        Emotion: 'Neutral',
        Emojis: ['😐', '😶', '🫥'],
      },
      {
        Emotion: 'Surprised',
        Emojis: ['🤩', '😍', '😮', '😲', '😯', '😦', '🤯'],
      },

      {
        Emotion: 'Angry',
        Emojis: ['👿', '😠', '😡', '🤬'],
      },
    ];

    const rngEmotions = Math.floor(Math.random() * emotion.length);
    const rngEmoji = Math.floor(
      Math.random() * emotion[rngEmotions].Emojis.length
    );

    this.currentRequireEmotions = {
      Emotion: emotion[rngEmotions].Emotion,
      Emojis: emotion[rngEmotions].Emojis[rngEmoji],
    };
  }

  playScoredAudio() {
    let audio = new Audio();
    audio.src = 'assets/point_score.mp3';
    audio.load();
    audio.play();
  }
  playBackgroundMusic() {
    let audio = new Audio();
    audio.src = 'assets/background.mp3';
    audio.load();
    audio.play()
    this.timer =setInterval(this.playBackgroundMusic,20000);
    clearInterval(this.timer)
    
  }
 endBackgroundMusic(){
  this.audio.stop();
 }
  
}
declare var tf: any;
declare var Stats: any;
function alertModel(
  message: any,
  string: (options?: import('cast.ts').StringOptions | undefined) => {
    parse: (
      input: unknown,
      context?: import('cast.ts').ParserContext | undefined
    ) => string;
    options: import('cast.ts').StringOptions;
  }
) {
  throw new Error('Function not implemented.');
}
