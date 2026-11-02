export interface CreateClothingDTO {
  name: string;
  category: string;
  imageUrl: string;
}

export interface CreateOutfitDTO {
  name: string;
  clothingIds: string[];
}
