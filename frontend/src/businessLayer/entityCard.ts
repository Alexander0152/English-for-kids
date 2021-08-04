export default class Card {
  private currentId: number;

  private currentName: string;

  private currentTranslate: string;

  private currentType: string;

  private currentImagePath: string;

  private currentAudioPath: string;

  private currentTrainCount: number;

  private currentGameCount: number;

  private currentMistakesCount: number;

  private currentPercent: number;

  private currentCategory: string;

  constructor(newType: string) {
    this.currentType = newType;
  }

  get id(): number {
    return this.currentId;
  }

  set id(newId: number) {
    this.currentId = newId;
  }

  get name(): string {
    return this.currentName;
  }

  set name(newName: string) {
    this.currentName = newName;
  }

  get translate(): string {
    return this.currentTranslate;
  }

  set translate(newTranslate: string) {
    this.currentTranslate = newTranslate;
  }

  get type(): string {
    return this.currentType;
  }

  set type(newType: string) {
    this.currentType = newType;
  }

  get imagePath(): string {
    return this.currentImagePath;
  }

  set imagePath(newImagePath: string) {
    this.currentImagePath = newImagePath;
  }

  get audioPath(): string {
    return this.currentAudioPath;
  }

  set audioPath(newAudioPath: string) {
    this.currentAudioPath = newAudioPath;
  }

  get trainCount(): number {
    return this.currentTrainCount;
  }

  set trainCount(newTrainCount: number) {
    this.currentTrainCount = newTrainCount;
  }

  get gameCount(): number {
    return this.currentGameCount;
  }

  set gameCount(newGameCount: number) {
    this.currentGameCount = newGameCount;
  }

  get mistakesCount(): number {
    return this.currentMistakesCount;
  }

  set mistakesCount(newMistakesCount: number) {
    this.currentMistakesCount = newMistakesCount;
  }

  get percent(): number {
    return this.currentPercent;
  }

  set percent(newPercent: number) {
    this.currentPercent = newPercent;
  }

  get category(): string {
    return this.currentCategory;
  }

  set category(newCategory: string) {
    this.currentCategory = newCategory;
  }
}
