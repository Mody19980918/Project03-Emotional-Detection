import { GoldenSentenceService } from './golden-sentence.service';
import { Component, ElementRef, Injectable, OnInit } from '@angular/core';
import { EmojiGameService } from '../emoji-game/emoji-game.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
// import { Swal } from 'sweetalert2';

@Component({
  selector: 'app-golden-sentence',
  templateUrl: './golden-sentence.page.html',
  styleUrls: ['./golden-sentence.page.scss'],
})
//******************************//
//**********GAME LOGIC**********//
//******************************//
//game start()
//button click(alert)
//count 30s
//until 30s is end(alert game is over)
//
//if player is logined contain the result
//push the result to GS ranking
//

@Injectable({
  providedIn: 'root',
})
export class GoldenSentencePage implements OnInit {
  //Initial Time
  timeLeft: number = 30;
  isStarted = false;
  //player Initial Score
  playerScore = 0;
  statusText = '';
  public progress = 0;
  // stats = new Stats();
  //
  video!: HTMLVideoElement;
  model: any;
  predictResult = '';
  //
  goldenSentenceQuestion = {
    Emotion: '',
    Situation: '',
    //
  };

  constructor(
    private elementRef: ElementRef,
    private GoldenSentenceService: GoldenSentenceService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) {
    //
    // process bar
    //
    // setInterval(() => {
    //   this.progress += 0.01;
    //   // Reset the progress bar when it reaches 100%
    //   // to continuously show the demo
    //   if (this.progress > 1) {
    //     setTimeout(() => {
    //       this.progress = 0;
    //     }, 300000);
    //   }
    // }, 50);
  }

  //
  // timer function
  //
  timer?: any;
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

      // let a = this.timeLeft / 30;

      this.progress = this.timeLeft / 30;
    }, 1000);

    await this.load();
    await this.getRandomSituation();
    this.predictModel();
    this.statusText = '';
  }

  //  ;
  async end() {
    if (!localStorage.getItem('token')) {
      this.isStarted = false;
      this.resetGame();
    }
    this.isStarted = false;
    this.GoldenSentenceService.submit({ score: this.playerScore });
    this.resetGame();
  }
  //
  async load() {
    let video = (this.video =
      this.elementRef.nativeElement.querySelector('video'));
    let statsContainer: HTMLVideoElement =
      this.elementRef.nativeElement.querySelector('.stats-container');

    let modalP = this.loadModel();
    await this.loadCamera(video);

    this.model = await modalP;
  }

  //
  // ALERT
  //
  ionViewWillEnter() {
    this.alertModel(`
    We have setup different <mark>"Situations"</mark> for you .


    Please display different <mark>"Emotions"</mark> according to the following <mark>"Situations"</mark>.`);
  }

  async alertModel(message: string) {
    const alert = await this.alertController.create({
      header: '- RULE - ',
      message: message,
      buttons: [
        {
          text: `Let's go`,
          handler: () => {
            return !this.isStarted;
          },
        },
      ],
    });

    await alert.present();
  }
  //
  // this.timer = setInterval(() => {
  //   if (this.xx === 0) {
  //     clearInterval(this.xx);
  //     delete this.xx;
  //     this.xx = 'xx xx!';
  //     this.xxx();
  //     return;
  //   }
  //   this.xxxx--;
  // }, 1000);
  //
  // onload
  //
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();
  }
  //
  // load CAM load Model
  //

  async ngOnInit() {
    let video = (this.video =
      this.elementRef.nativeElement.querySelector('video'));
    let statsContainer: HTMLVideoElement =
      this.elementRef.nativeElement.querySelector('.stats-container');

    let modalP = this.loadModel();
    await this.loadCamera(video);

    this.model = await modalP;
    // this.playBackgroundMusic();
    this.getRandomSituation();
    // this.getRandomSituation();
    // this.start();
    this.playOneRound();
    this.predictModel();
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
      video.addEventListener('loadeddata', async () => {
        resolve();
      });
      video.srcObject = stream;
    });
  }

  async loadModel() {
    const modelUrlPath =
      'https://cdn.jsdelivr.net/gh/stella-woo/Project2_EmotionDetection_CNN_model/myModelJs/outputFile/model.json';
    let model = await tf.loadGraphModel(modelUrlPath);
    return model;
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
    //
    // stats.begin();
    //
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

    //
    // predictResult
    //
    const result = await model.predict(imgPre).data();

    await tf.dispose(imgPre); // clear memory

    // result
    let ind = result.indexOf(Math.max(...result));

    this.predictResult = `${labels[ind]} : ${result[ind] * 100}%`;

    this.determineMatch(labels[ind]);

    // stats.end();
    requestAnimationFrame(() => this.predictModel());
    return labels[ind];
  }

  determineMatch(result: string) {
    if (result === this.goldenSentenceQuestion.Emotion && this.isStarted) {
      this.playerScore += 1;
      // this.GoldenSentenceService.determineMatch({
      //   score: this.playerScore,
      // }).subscribe({
      //   next: (data) => {
      //     console.log(data);
      //   },
      // });
      this.getRandomSituation();
    }
  }

  async resetGame() {
    this.playerScore = 0;
    this.goldenSentenceQuestion.Emotion = '';
    this.timeLeft = 30;
  }

  async playOneRound() {
    //initial stage
    // setTimeout(() => {
    //   this.resetGame();
    //   this.getRandomSituation();
    //   this.start();
    //   this.predictModel();
    // }, 30000);
  }
  //
  // game start
  //
  async matchSituation(result: string) {
    if (result == this.goldenSentenceQuestion.Emotion) {
      // matching
      this.playerScore += 1;
      this.getRandomSituation();
    }
  }

  async getRandomSituation() {
    let situationInQues: { Emotion: string; Situation: string[] }[] = [
      {
        Emotion: 'Happy',
        Situation: [
          '當你在看戇豆先生的時候🤡 ~',
          '你等了一個月的禮物終於到手了！🎁',
          '封關三年多了～今天你終於到了機場，準備登機了🛫。。',
        ],
      },
      {
        Emotion: 'Fearful',
        Situation: [
          '一名沒有眼珠的人，突然在你房門出現💀～',
          '在你的夢裡，你發現你正在萬尺高空下墜中😶‍🌫️～',
          '你不小心把公司的 DATABASE 整個刪除了🧳。。。',
        ],
      },
      {
        Emotion: 'Sad',
        Situation: [
          '今天是情人節，可是你沒有🧙‍♂️。。',
          '今天是與你共事十年的老朋友的 LAST DAY🫂...',
          '🚶你形單隻影身處外地，剛被一名「 彪形大漢 」搶掠所有得資產',
        ],
      },
      {
        Emotion: 'Disgusted',
        Situation: [
          '忙碌了一天，回家的途中不小心踩中了狗屎💩',
          '上班途中，你身邊的乘客對你嘔吐🤮',
          '當你成為人型蜈蚣的 最後一位!🐛',
        ],
      },
      {
        Emotion: 'Neutral',
        Situation: [
          '🐷這是一條送分題 :)',
          '🐷這是一個笑話 :)',
          '🐷打Poker的時候 :)',
        ],
      },
      {
        Emotion: 'Surprised',
        Situation: [
          '今天一出門，你發現天空正下著雪☃️～',
          '回家了～你發現房門虛掩～你的伴侶正與你不認識的異性半裸在床上睡覺👱🏽‍♀️👨🏽‍🦰',
          '今日是你的生日，你一睡醒。發現喜歡了很久偶像來祝福你💕',
        ],
      },
      {
        Emotion: 'Angry',
        Situation: [
          '你的追求對象正在跟別的異性聊得歡天喜地🧜🏽‍♀️🧚🏽‍♂️',
          '你正如常地揼曲，但你一手把咖啡倒在鍵盤上☕️☕️☕️',
          '你正觀看世界盃決賽，可是你的網絡突然沒有信號💀。。。',
        ],
      },
    ];
    const rngEmotions = Math.floor(Math.random() * situationInQues.length);
    const rngSituation = Math.floor(
      Math.random() * situationInQues[rngEmotions].Situation.length
    );

    this.goldenSentenceQuestion = {
      Emotion: situationInQues[rngEmotions].Emotion,
      Situation: situationInQues[rngEmotions].Situation[rngSituation],
    };
  }
}

declare var tf: any;
declare var Stats: any;
