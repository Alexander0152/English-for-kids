import express, { Request, Response } from "express";
var router = express.Router();

var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const testFolder = "./uploads/";
const fs = require("fs");
let path = require("path");

const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://alexander:7JxL83PMVNNf52r@cluster0.tcllk.mongodb.net/English-for-kids?retryWrites=true&w=majority"
);

const getAdmin = async () => {
  try {
    await client.connect();
    console.log("Database connected");
    // await client.db().createCollection("cards");
    const users = client.db().collection("cards");

    users.insertMany([
      {
        category: "category",
        cards: [
          {
            name: "Fruits",
            type: "category",
            category: "category",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/categories/apple.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/apple.mp3",
          },
          {
            name: "Action1",
            type: "category",
            category: "category",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/categories/dive.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/dive.mp3",
          },
          {
            name: "Countries",
            type: "category",
            category: "category",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/categories/france.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/france.mp3",
          },
          {
            name: "Animals1",
            type: "category",
            category: "category",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/categories/horse.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/horse.mp3",
          },
          {
            name: "Action2",
            type: "category",
            category: "category",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/categories/jump.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/jump.mp3",
          },
          {
            name: "Emotion",
            type: "category",
            category: "category",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/categories/laugh.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/laugh.mp3",
          },
          {
            name: "Animals2",
            type: "category",
            category: "category",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/categories/lion.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/lion.mp3",
          },
          {
            name: "Clothes",
            type: "category",
            category: "category",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/categories/shirt.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/shirt.mp3",
          },
        ],
      },
      {
        category: "fruits",
        cards: [
          {
            name: "apple",
            translate: "яблоко",
            type: "word",
            category: "fruits",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/fruits/apple.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/apple.mp3",
          },
          {
            name: "avocado",
            translate: "авокадо",
            type: "word",
            category: "fruits",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/fruits/avocado.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/avocado.mp3",
          },
          {
            name: "banana",
            translate: "банан",
            type: "word",
            category: "fruits",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/fruits/banana.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/banana.mp3",
          },
          {
            name: "grape",
            translate: "виноград",
            type: "word",
            category: "fruits",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/fruits/grape.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/grape.mp3",
          },
          {
            name: "lemon",
            translate: "лимон",
            type: "word",
            category: "fruits",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/fruits/lemon.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/lemon.mp3",
          },
          {
            name: "orange",
            translate: "апельсин",
            type: "word",
            category: "fruits",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/fruits/orange.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/orange.mp3",
          },
          {
            name: "peach",
            translate: "персик",
            type: "word",
            category: "fruits",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/fruits/peach.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/peach.mp3",
          },
          {
            name: "pineapple",
            translate: "ананас",
            type: "word",
            category: "fruits",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/fruits/pineapple.jpg",
            audioPath:
              "https://ts-server0152.herokuapp.com/audio/pineapple.mp3",
          },
        ],
      },
      {
        category: "action1",
        cards: [
          {
            name: "dance",
            translate: "танцевать",
            type: "word",
            category: "action1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action1/dance.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/dance.mp3",
          },
          {
            name: "draw",
            translate: "рисовать",
            type: "word",
            category: "action1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action1/draw.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/draw.mp3",
          },
          {
            name: "jump",
            translate: "прыгать",
            type: "word",
            category: "action1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action1/jump.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/jump.mp3",
          },
          {
            name: "point",
            translate: "указывать",
            type: "word",
            category: "action1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action1/point.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/point.mp3",
          },
          {
            name: "ride",
            translate: "ездить",
            type: "word",
            category: "action1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action1/ride.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/ride.mp3",
          },
          {
            name: "run",
            translate: "бегать",
            type: "word",
            category: "action1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action1/run.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/run.mp3",
          },
          {
            name: "sing",
            translate: "петь",
            type: "word",
            category: "action1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action1/sing.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/sing.mp3",
          },
          {
            name: "skip",
            translate: "прыгать",
            type: "word",
            category: "action1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action1/skip.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/skip.mp3",
          },
        ],
      },
      {
        category: "countries",
        cards: [
          {
            name: "Australia",
            translate: "Австралия",
            type: "word",
            category: "countries",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/countries/australia.jpg",
            audioPath:
              "https://ts-server0152.herokuapp.com/audio/australia.mp3",
          },
          {
            name: "Brazil",
            translate: "Бразилия",
            type: "word",
            category: "countries",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/countries/brazil.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/brazil.mp3",
          },
          {
            name: "China",
            translate: "Китай",
            type: "word",
            category: "countries",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/countries/china.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/china.mp3",
          },
          {
            name: "France",
            translate: "Франция",
            type: "word",
            category: "countries",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/countries/france.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/france.mp3",
          },
          {
            name: "Greece",
            translate: "Греция",
            type: "word",
            category: "countries",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/countries/greece.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/greece.mp3",
          },
          {
            name: "Italy",
            translate: "Италия",
            type: "word",
            category: "countries",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/countries/italy.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/italy.mp3",
          },
          {
            name: "Japan",
            translate: "Япония",
            type: "word",
            category: "countries",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/countries/japan.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/japan.mp3",
          },
          {
            name: "Russia",
            translate: "Россия",
            type: "word",
            category: "countries",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/countries/russia.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/russia.mp3",
          },
        ],
      },
      {
        category: "animals1",
        cards: [
          {
            name: "fish",
            translate: "рыба",
            type: "word",
            category: "animals1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals1/fish.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/fish.mp3",
          },
          {
            name: "frog",
            translate: "жаба",
            type: "word",
            category: "animals1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals1/frog.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/frog.mp3",
          },
          {
            name: "giraffe",
            translate: "жираф",
            type: "word",
            category: "animals1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals1/giraffe.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/giraffe.mp3",
          },
          {
            name: "horse",
            translate: "лошадь",
            type: "word",
            category: "animals1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals1/horse.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/horse.mp3",
          },
          {
            name: "pig",
            translate: "свинья",
            type: "word",
            category: "animals1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals1/pig.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/pig.mp3",
          },
          {
            name: "rabbit",
            translate: "кролик",
            type: "word",
            category: "animals1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals1/rabbit.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/rabbit.mp3",
          },
          {
            name: "sheep",
            translate: "овца",
            type: "word",
            category: "animals1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals1/sheep.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/sheep.mp3",
          },
          {
            name: "turtle",
            translate: "черепаха",
            type: "word",
            category: "animals1",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals1/turtle.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/turtle.mp3",
          },
        ],
      },
      {
        category: "emotion",
        cards: [
          {
            name: "angry",
            translate: "злой",
            type: "word",
            category: "emotion",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/emotion/angry.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/angry.mp3",
          },
          {
            name: "happy",
            translate: "счастливый",
            type: "word",
            category: "emotion",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/emotion/happy.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/happy.mp3",
          },
          {
            name: "laugh",
            translate: "смех",
            type: "word",
            category: "emotion",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/emotion/laugh.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/laugh.mp3",
          },
          {
            name: "sad",
            translate: "грусть",
            type: "word",
            category: "emotion",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/emotion/sad.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/sad.mp3",
          },
          {
            name: "scared",
            translate: "испуг",
            type: "word",
            category: "emotion",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/emotion/scared.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/scared.mp3",
          },
          {
            name: "smile",
            translate: "улыбка",
            type: "word",
            category: "emotion",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/emotion/smile.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/smile.mp3",
          },
          {
            name: "surprised",
            translate: "удивленный",
            type: "word",
            category: "emotion",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/emotion/surprised.jpg",
            audioPath:
              "https://ts-server0152.herokuapp.com/audio/surprised.mp3",
          },
          {
            name: "tired",
            translate: "уставший",
            type: "word",
            category: "emotion",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/emotion/tired.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/tired.mp3",
          },
        ],
      },
      {
        category: "animals2",
        cards: [
          {
            name: "cat",
            translate: "кот",
            type: "word",
            category: "animals2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals2/cat.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/cat.mp3",
          },
          {
            name: "chick",
            translate: "цыпленок",
            type: "word",
            category: "animals2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals2/chick.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/chick.mp3",
          },
          {
            name: "chicken",
            translate: "курица",
            type: "word",
            category: "animals2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals2/chicken.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/chicken.mp3",
          },
          {
            name: "dog",
            translate: "собака",
            type: "word",
            category: "animals2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals2/dog.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/dog.mp3",
          },
          {
            name: "dolphin",
            translate: "дельфин",
            type: "word",
            category: "animals2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals2/dolphin.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/dolphin.mp3",
          },
          {
            name: "elephant",
            translate: "слон",
            type: "word",
            category: "animals2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals2/elephant.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/elephant.mp3",
          },
          {
            name: "lion",
            translate: "лев",
            type: "word",
            category: "animals2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals2/lion.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/lion.mp3",
          },
          {
            name: "mouse",
            translate: "мышь",
            type: "word",
            category: "animals2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/animals2/mouse.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/mouse.mp3",
          },
        ],
      },
      {
        category: "clothes",
        cards: [
          {
            name: "blouse",
            translate: "блузка",
            type: "word",
            category: "clothes",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/clothes/blouse.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/blouse.mp3",
          },
          {
            name: "boot",
            translate: "ботинки",
            type: "word",
            category: "clothes",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/clothes/boot.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/boot.mp3",
          },
          {
            name: "coat",
            translate: "пальто",
            type: "word",
            category: "clothes",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/clothes/coat.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/coat.mp3",
          },
          {
            name: "dress",
            translate: "платье",
            type: "word",
            category: "clothes",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/clothes/dress.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/dress.mp3",
          },
          {
            name: "pants",
            translate: "штаны",
            type: "word",
            category: "clothes",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/clothes/pants.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/pants.mp3",
          },
          {
            name: "shirt",
            translate: "майка",
            type: "word",
            category: "clothes",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/clothes/shirt.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/shirt.mp3",
          },
          {
            name: "shoe",
            translate: "туфли",
            type: "word",
            category: "clothes",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/clothes/shoe.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/shoe.mp3",
          },
          {
            name: "skirt",
            translate: "юбка",
            type: "word",
            category: "clothes",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/clothes/skirt.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/skirt.mp3",
          },
        ],
      },
      {
        category: "action2",
        cards: [
          {
            name: "cry",
            translate: "плакать",
            type: "word",
            category: "action2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action2/cry.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/cry.mp3",
          },
          {
            name: "dive",
            translate: "нырять",
            type: "word",
            category: "action2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action2/dive.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/dive.mp3",
          },
          {
            name: "fish",
            translate: "рыбачить",
            type: "word",
            category: "action2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action2/fish.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/fish.mp3",
          },
          {
            name: "fly",
            translate: "летать",
            type: "word",
            category: "action2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action2/fly.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/fly.mp3",
          },
          {
            name: "hug",
            translate: "обнимать",
            type: "word",
            category: "action2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action2/hug.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/hug.mp3",
          },
          {
            name: "open",
            translate: "открывать",
            type: "word",
            category: "action2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action2/open.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/open.mp3",
          },
          {
            name: "play",
            translate: "играть",
            type: "word",
            category: "action2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action2/play.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/play.mp3",
          },
          {
            name: "swim",
            translate: "плавать",
            type: "word",
            category: "action2",
            imagePath:
              "https://ts-server0152.herokuapp.com/images/action2/swim.jpg",
            audioPath: "https://ts-server0152.herokuapp.com/audio/swim.mp3",
          },
        ],
      },
    ]);
    // console.log(user);
  } catch (e) {
    console.log(e);
  }
};
// getAdmin();

router.get("/", async function (req: Request, res: Response) {
  const { category } = req.query;

  if (category === "all") {
    try {
      await client.connect();
      const cards = client.db().collection("cards");
      const categoryCards = await cards.find().toArray();
      res.json({
        cards: categoryCards,
      });
    } catch (e) {
      console.log(e);
    }
    return;
  }

  try {
    await client.connect();
    const cards = client.db().collection("cards");
    const categoryCards = await cards.findOne({ category: category });
    res.json({
      cards: categoryCards.cards,
    });
  } catch (e) {
    console.log(e);
  }
});

interface MulterRequest extends Request {
  file: any;
  filename: string;
  originalname: string;
}

interface MyFile extends File {
  type: string;
}

router.post(
  "/updateimage",
  upload.single("file"),
  async function (req: Request, res: Response) {
    const files = fs.readdirSync(testFolder);

    // console.log((req as MulterRequest).file);
    for (const file of files) {
      fs.rename(
        `uploads/${(req as MulterRequest).file.filename}`,
        `public/images/${(req as MulterRequest).file.originalname}`,
        (err: Error) => {
          console.log(err);
        }
      );
    }
  }
);

router.post(
  "/updateaudio",
  upload.single("file"),
  async function (req: Request, res: Response) {
    const files = fs.readdirSync(testFolder);

    // console.log((req as MulterRequest).file);
    for (const file of files) {
      fs.rename(
        `uploads/${(req as MulterRequest).file.filename}`,
        `public/audio/${(req as MulterRequest).file.originalname}`,
        (err: Error) => {
          console.log(err);
        }
      );
    }
  }
);

router.post("/", async function (req: Request, res: Response) {
  const editCategory: string = req.body.categoryName.toLowerCase();
  const newCategoryInfo: {
    newName: string;
    newImage: FormData;
    newImagePath: string;
  } = req.body.newCategoryInfo;

  try {
    await client.connect();
    const cards = client.db().collection("cards");
    cards.updateOne(
      { category: editCategory },
      { $set: { category: newCategoryInfo.newName.toLowerCase() } }
    );

    const categoryCards = await cards.findOne({ category: "category" });
    const cardIndex = categoryCards.cards.findIndex(
      (card: {
        name: string;
        type: string;
        category: string;
        imagePath: string;
        audioPath: string;
      }) => card.name.toLowerCase() === editCategory
    );

    categoryCards.cards[cardIndex].name = newCategoryInfo.newName;

    if (newCategoryInfo.newImagePath) {
      categoryCards.cards[
        cardIndex
      ].imagePath = `${newCategoryInfo.newImagePath}`;
    }

    cards.updateOne(
      { category: "category" },
      { $set: { category: "category", cards: categoryCards.cards } }
    );
  } catch (e) {
    console.log(e);
  }
});

router.post("/word", async function (req: Request, res: Response) {
  const category: string = req.body.category.toLowerCase();
  const editWord: string = req.body.wordName.toLowerCase();
  const newWordInfo: {
    newName: string;
    newTranslate: string;
    newImage: FormData;
    newImagePath: string;
    newAudio: FormData;
    newAudioPath: string;
  } = req.body.newWordInfo;

  try {
    await client.connect();
    const cards = client.db().collection("cards");

    const categoryCards = await cards.findOne({ category: category });
    const cardIndex = categoryCards.cards.findIndex(
      (card: {
        name: string;
        type: string;
        category: string;
        imagePath: string;
        audioPath: string;
      }) => card.name.toLowerCase() === editWord
    );

    categoryCards.cards[cardIndex].name = newWordInfo.newName;
    categoryCards.cards[cardIndex].translate = newWordInfo.newTranslate;
    if (newWordInfo.newImagePath) {
      categoryCards.cards[cardIndex].imagePath = newWordInfo.newImagePath;
    }
    if (newWordInfo.newAudioPath) {
      categoryCards.cards[cardIndex].audioPath = newWordInfo.newAudioPath;
    }
    cards.updateOne(
      { category: category },
      { $set: { cards: categoryCards.cards } }
    );
  } catch (e) {
    console.log(e);
  }
});

router.post("/createnewcategory", async function (req: Request, res: Response) {
  const newName: string = req.body.categoryName;
  const newImagePath: string = req.body.categoryImagePath;

  try {
    await client.connect();
    const cards = client.db().collection("cards");
    cards.insertOne({ category: newName, cards: [] });

    const categoryCards = await cards.findOne({ category: "category" });

    const newCategoryCard: {
      name: string;
      type: string;
      category: string;
      imagePath: string;
      audioPath: string;
    } = {
      name: newName,
      type: "category",
      category: "category",
      imagePath: newImagePath,
      audioPath: "",
    };
    categoryCards.cards.push(newCategoryCard);

    cards.updateOne(
      { category: "category" },
      { $set: { category: "category", cards: categoryCards.cards } }
    );
  } catch (e) {
    console.log(e);
  }
});

router.post("/createnewword", async function (req: Request, res: Response) {
  const category: string = req.body.category;
  const newName: string = req.body.wordName;
  const newTranslate: string = req.body.wordTranslate;
  const newImagePath: string = req.body.wordImagePath;
  const newAudioPath: string = req.body.wordAudioPath;

  try {
    await client.connect();
    const cards = client.db().collection("cards");
    cards.insertOne({ category: newName, cards: [] });

    const categoryCards = await cards.findOne({ category: category });

    const newCategoryCard: {
      name: string;
      translate: string;
      type: string;
      category: string;
      imagePath: string;
      audioPath: string;
    } = {
      name: newName,
      translate: newTranslate,
      type: "word",
      category: category,
      imagePath: newImagePath,
      audioPath: newAudioPath,
    };
    console.log(newCategoryCard);
    categoryCards.cards.push(newCategoryCard);

    cards.updateOne(
      { category: category },
      { $set: { cards: categoryCards.cards } }
    );
  } catch (e) {
    console.log(e);
  }
});

router.post("/deletecategory", async function (req: Request, res: Response) {
  const categoryName: string = req.body.categoryName;

  try {
    await client.connect();
    const cards = client.db().collection("cards");
    await cards.deleteOne({ category: categoryName });

    const categoryCards = await cards.findOne({ category: "category" });

    const cardIndex = categoryCards.cards.findIndex(
      (card: {
        name: string;
        type: string;
        category: string;
        imagePath: string;
        audioPath: string;
      }) => card.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (cardIndex > -1) {
      categoryCards.cards.splice(cardIndex, 1);
    }

    await cards.updateOne(
      { category: "category" },
      { $set: { category: "category", cards: categoryCards.cards } }
    );
  } catch (e) {
    console.log(e);
  }
});

router.post("/deleteword", async function (req: Request, res: Response) {
  const category: string = req.body.category;
  const wordName: string = req.body.wordName;

  try {
    await client.connect();
    const cards = client.db().collection("cards");
    const categoryCards = await cards.findOne({ category: category });

    const cardIndex = categoryCards.cards.findIndex(
      (card: {
        name: string;
        type: string;
        category: string;
        imagePath: string;
        audioPath: string;
      }) => card.name.toLowerCase() === wordName.toLowerCase()
    );
    if (cardIndex > -1) {
      categoryCards.cards.splice(cardIndex, 1);
    }

    await cards.updateOne(
      { category: category },
      { $set: { cards: categoryCards.cards } }
    );
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
// mongodb+srv://alexander:<password>@cluster0.tcllk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// const users = client.db().collection("cards");
//     users.insertMany([
// {
//   category: "category",
//   cards: [
//     {
//       name: "Fruits",
//       type: "category",
//       category: "category",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/categories/apple.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/apple.mp3",
//     },
//     {
//       name: "Action1",
//       type: "category",
//       category: "category",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/categories/dive.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/dive.mp3",
//     },
//     {
//       name: "Countries",
//       type: "category",
//       category: "category",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/categories/france.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/france.mp3",
//     },
//     {
//       name: "Animals1",
//       type: "category",
//       category: "category",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/categories/horse.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/horse.mp3",
//     },
//     {
//       name: "Action2",
//       type: "category",
//       category: "category",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/categories/jump.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/jump.mp3",
//     },
//     {
//       name: "Emotion",
//       type: "category",
//       category: "category",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/categories/laugh.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/laugh.mp3",
//     },
//     {
//       name: "Animals2",
//       type: "category",
//       category: "category",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/categories/lion.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/lion.mp3",
//     },
//     {
//       name: "Clothes",
//       type: "category",
//       category: "category",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/categories/shirt.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/shirt.mp3",
//     },
//   ],
// },
// {
//   category: "fruits",
//   cards: [
//     {
//       name: "apple",
//       translate: "яблоко",
//       type: "word",
//       category: "fruits",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/fruits/apple.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/apple.mp3",
//     },
//     {
//       name: "avocado",
//       translate: "авокадо",
//       type: "word",
//       category: "fruits",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/fruits/avocado.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/avocado.mp3",
//     },
//     {
//       name: "banana",
//       translate: "банан",
//       type: "word",
//       category: "fruits",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/fruits/banana.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/banana.mp3",
//     },
//     {
//       name: "grape",
//       translate: "виноград",
//       type: "word",
//       category: "fruits",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/fruits/grape.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/grape.mp3",
//     },
//     {
//       name: "lemon",
//       translate: "лимон",
//       type: "word",
//       category: "fruits",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/fruits/lemon.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/lemon.mp3",
//     },
//     {
//       name: "orange",
//       translate: "апельсин",
//       type: "word",
//       category: "fruits",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/fruits/orange.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/orange.mp3",
//     },
//     {
//       name: "peach",
//       translate: "персик",
//       type: "word",
//       category: "fruits",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/fruits/peach.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/peach.mp3",
//     },
//     {
//       name: "pineapple",
//       translate: "ананас",
//       type: "word",
//       category: "fruits",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/fruits/pineapple.jpg",
//       audioPath:
//         "https://ts-server0152.herokuapp.com/audio/pineapple.mp3",
//     },
//   ],
// },
// {
//   category: "action1",
//   cards: [
//     {
//       name: "dance",
//       translate: "танцевать",
//       type: "word",
//       category: "action1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action1/dance.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/dance.mp3",
//     },
//     {
//       name: "draw",
//       translate: "рисовать",
//       type: "word",
//       category: "action1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action1/draw.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/draw.mp3",
//     },
//     {
//       name: "jump",
//       translate: "прыгать",
//       type: "word",
//       category: "action1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action1/jump.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/jump.mp3",
//     },
//     {
//       name: "point",
//       translate: "указывать",
//       type: "word",
//       category: "action1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action1/point.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/point.mp3",
//     },
//     {
//       name: "ride",
//       translate: "ездить",
//       type: "word",
//       category: "action1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action1/ride.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/ride.mp3",
//     },
//     {
//       name: "run",
//       translate: "бегать",
//       type: "word",
//       category: "action1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action1/run.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/run.mp3",
//     },
//     {
//       name: "sing",
//       translate: "петь",
//       type: "word",
//       category: "action1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action1/sing.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/sing.mp3",
//     },
//     {
//       name: "skip",
//       translate: "прыгать",
//       type: "word",
//       category: "action1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action1/skip.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/skip.mp3",
//     },
//   ],
// },
// {
//   category: "countries",
//   cards: [
//     {
//       name: "Australia",
//       translate: "Австралия",
//       type: "word",
//       category: "countries",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/countries/australia.jpg",
//       audioPath:
//         "https://ts-server0152.herokuapp.com/audio/australia.mp3",
//     },
//     {
//       name: "Brazil",
//       translate: "Бразилия",
//       type: "word",
//       category: "countries",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/countries/brazil.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/brazil.mp3",
//     },
//     {
//       name: "China",
//       translate: "Китай",
//       type: "word",
//       category: "countries",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/countries/china.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/china.mp3",
//     },
//     {
//       name: "France",
//       translate: "Франция",
//       type: "word",
//       category: "countries",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/countries/france.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/france.mp3",
//     },
//     {
//       name: "Greece",
//       translate: "Греция",
//       type: "word",
//       category: "countries",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/countries/greece.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/greece.mp3",
//     },
//     {
//       name: "Italy",
//       translate: "Италия",
//       type: "word",
//       category: "countries",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/countries/italy.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/italy.mp3",
//     },
//     {
//       name: "Japan",
//       translate: "Япония",
//       type: "word",
//       category: "countries",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/countries/japan.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/japan.mp3",
//     },
//     {
//       name: "Russia",
//       translate: "Россия",
//       type: "word",
//       category: "countries",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/countries/russia.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/russia.mp3",
//     },
//   ],
// },
// {
//   category: "animals1",
//   cards: [
//     {
//       name: "fish",
//       translate: "рыба",
//       type: "word",
//       category: "animals1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals1/fish.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/fish.mp3",
//     },
//     {
//       name: "frog",
//       translate: "жаба",
//       type: "word",
//       category: "animals1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals1/frog.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/frog.mp3",
//     },
//     {
//       name: "giraffe",
//       translate: "жираф",
//       type: "word",
//       category: "animals1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals1/giraffe.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/giraffe.mp3",
//     },
//     {
//       name: "horse",
//       translate: "лошадь",
//       type: "word",
//       category: "animals1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals1/horse.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/horse.mp3",
//     },
//     {
//       name: "pig",
//       translate: "свинья",
//       type: "word",
//       category: "animals1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals1/pig.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/pig.mp3",
//     },
//     {
//       name: "rabbit",
//       translate: "кролик",
//       type: "word",
//       category: "animals1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals1/rabbit.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/rabbit.mp3",
//     },
//     {
//       name: "sheep",
//       translate: "овца",
//       type: "word",
//       category: "animals1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals1/sheep.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/sheep.mp3",
//     },
//     {
//       name: "turtle",
//       translate: "черепаха",
//       type: "word",
//       category: "animals1",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals1/turtle.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/turtle.mp3",
//     },
//   ],
// },
// {
//   category: "emotion",
//   cards: [
//     {
//       name: "angry",
//       translate: "злой",
//       type: "word",
//       category: "emotion",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/emotion/angry.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/angry.mp3",
//     },
//     {
//       name: "happy",
//       translate: "счастливый",
//       type: "word",
//       category: "emotion",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/emotion/happy.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/happy.mp3",
//     },
//     {
//       name: "laugh",
//       translate: "смех",
//       type: "word",
//       category: "emotion",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/emotion/laugh.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/laugh.mp3",
//     },
//     {
//       name: "sad",
//       translate: "грусть",
//       type: "word",
//       category: "emotion",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/emotion/sad.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/sad.mp3",
//     },
//     {
//       name: "scared",
//       translate: "испуг",
//       type: "word",
//       category: "emotion",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/emotion/scared.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/scared.mp3",
//     },
//     {
//       name: "smile",
//       translate: "улыбка",
//       type: "word",
//       category: "emotion",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/emotion/smile.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/smile.mp3",
//     },
//     {
//       name: "surprised",
//       translate: "удивленный",
//       type: "word",
//       category: "emotion",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/emotion/surprised.jpg",
//       audioPath:
//         "https://ts-server0152.herokuapp.com/audio/surprised.mp3",
//     },
//     {
//       name: "tired",
//       translate: "уставший",
//       type: "word",
//       category: "emotion",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/emotion/tired.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/tired.mp3",
//     },
//   ],
// },
// {
//   category: "animals2",
//   cards: [
//     {
//       name: "cat",
//       translate: "кот",
//       type: "word",
//       category: "animals2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals2/cat.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/cat.mp3",
//     },
//     {
//       name: "chick",
//       translate: "цыпленок",
//       type: "word",
//       category: "animals2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals2/chick.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/chick.mp3",
//     },
//     {
//       name: "chicken",
//       translate: "курица",
//       type: "word",
//       category: "animals2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals2/chicken.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/chicken.mp3",
//     },
//     {
//       name: "dog",
//       translate: "собака",
//       type: "word",
//       category: "animals2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals2/dog.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/dog.mp3",
//     },
//     {
//       name: "dolphin",
//       translate: "дельфин",
//       type: "word",
//       category: "animals2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals2/dolphin.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/dolphin.mp3",
//     },
//     {
//       name: "elephant",
//       translate: "слон",
//       type: "word",
//       category: "animals2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals2/elephant.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/elephant.mp3",
//     },
//     {
//       name: "lion",
//       translate: "лев",
//       type: "word",
//       category: "animals2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals2/lion.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/lion.mp3",
//     },
//     {
//       name: "mouse",
//       translate: "мышь",
//       type: "word",
//       category: "animals2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/animals2/mouse.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/mouse.mp3",
//     },
//   ],
// },
// {
//   category: "clothes",
//   cards: [
//     {
//       name: "blouse",
//       translate: "блузка",
//       type: "word",
//       category: "clothes",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/clothes/blouse.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/blouse.mp3",
//     },
//     {
//       name: "boot",
//       translate: "ботинки",
//       type: "word",
//       category: "clothes",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/clothes/boot.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/boot.mp3",
//     },
//     {
//       name: "coat",
//       translate: "пальто",
//       type: "word",
//       category: "clothes",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/clothes/coat.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/coat.mp3",
//     },
//     {
//       name: "dress",
//       translate: "платье",
//       type: "word",
//       category: "clothes",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/clothes/dress.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/dress.mp3",
//     },
//     {
//       name: "pants",
//       translate: "штаны",
//       type: "word",
//       category: "clothes",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/clothes/pants.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/pants.mp3",
//     },
//     {
//       name: "shirt",
//       translate: "майка",
//       type: "word",
//       category: "clothes",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/clothes/shirt.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/shirt.mp3",
//     },
//     {
//       name: "shoe",
//       translate: "туфли",
//       type: "word",
//       category: "clothes",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/clothes/shoe.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/shoe.mp3",
//     },
//     {
//       name: "skirt",
//       translate: "юбка",
//       type: "word",
//       category: "clothes",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/clothes/skirt.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/skirt.mp3",
//     },
//   ],
// },
// {
//   category: "action2",
//   cards: [
//     {
//       name: "cry",
//       translate: "плакать",
//       type: "word",
//       category: "action2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action2/cry.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/cry.mp3",
//     },
//     {
//       name: "dive",
//       translate: "нырять",
//       type: "word",
//       category: "action2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action2/dive.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/dive.mp3",
//     },
//     {
//       name: "fish",
//       translate: "рыбачить",
//       type: "word",
//       category: "action2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action2/fish.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/fish.mp3",
//     },
//     {
//       name: "fly",
//       translate: "летать",
//       type: "word",
//       category: "action2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action2/fly.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/fly.mp3",
//     },
//     {
//       name: "hug",
//       translate: "обнимать",
//       type: "word",
//       category: "action2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action2/hug.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/hug.mp3",
//     },
//     {
//       name: "open",
//       translate: "открывать",
//       type: "word",
//       category: "action2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action2/open.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/open.mp3",
//     },
//     {
//       name: "play",
//       translate: "играть",
//       type: "word",
//       category: "action2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action2/play.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/play.mp3",
//     },
//     {
//       name: "swim",
//       translate: "плавать",
//       type: "word",
//       category: "action2",
//       imagePath:
//         "https://ts-server0152.herokuapp.com/images/action2/swim.jpg",
//       audioPath: "https://ts-server0152.herokuapp.com/audio/swim.mp3",
//     },
//   ],
// },
//     ]);
//     // const user = await users.findOne({ login: "admin" });
//     // console.log(user);

//   } catch (e) {
//     console.log(e);
//   }
// };
// getAdmin();

// /* GET users listing. */
// router.get("/", function (req: Request, res: Response, next) {
//   res.send("respond with a resource");
// });

// /* POST check admin */
// router.post("/", async function (req: Request, res: Response) {
//   const login: string = req.body.login;
//   const password: string = req.body.password;

//   let adminLogin: string = "";
//   let adminPassword: string = "";

//   try {
//     await client.connect();
//     const users = client.db().collection("users");
//     const user = await users.findOne({ login: "admin" });

//     adminLogin = user.login;
//     adminPassword = user.password;

//     if (login === adminLogin && password === adminPassword) {
//       res.json({
//         isAdmin: true,
//       });
//     } else {
//       console.log(adminLogin);
//       res.json({
//         isAdmin: false,
//       });
//     }
//   } catch (e) {
//     console.log(e);
//   }
