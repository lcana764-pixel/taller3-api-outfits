export interface Clothing {
  id: string;
  name: string;
  category: string; 
  imageUrl: string;
}

export interface Outfit {
  id: string;
  name: string;
  clothingIds: string[];
}
