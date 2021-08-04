// import EntityCard from '../businessLayer/entityCard';

export default interface CardCategoryModel {
  category: string;

  card: { id: number; name: string; type: string; imagePath: string; audioPath: string };
}
