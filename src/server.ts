import express from 'express';
import type { Request, Response } from 'express';
import { type Clothing } from './models/clothing.model.js';
import { type CreateClothingDTO } from './dtos/clothing.dto.js';



export interface Outfit {
  id: string;
  name: string;
  clothingIds: string[];
}

export interface CreateOutfitDTO {
  name: string;
  clothingIds: string[];
}

const app = express();
app.use(express.json());

let clothingRepository: Clothing[] = [];
let outfitRepository: Outfit[] = [];

// 1. POST /api/v1/clothing - Crear Prenda
app.post('/api/v1/clothing', (req: Request, res: Response): any => {
  const body: CreateClothingDTO = req.body;
  if (!body.name || !body.category || !body.imageUrl) {
    return res.status(400).json({ error: 'Todos los campos (name, category, imageUrl) son obligatorios.' });
  }
  const newClothing: Clothing = {
    id: (clothingRepository.length + 1).toString(),
    ...body
  };
  clothingRepository.push(newClothing);
  return res.status(201).json(newClothing);
});

// 2. GET /api/v1/clothing - Obtener todas las prendas
app.get('/api/v1/clothing', (req: Request, res: Response): any => {
  const { category } = req.query;
  if (category) {
    const filtered = clothingRepository.filter(item => 
      item.category.toLowerCase() === (category as string).toLowerCase()
    );
    return res.json(filtered);
  }
  return res.json(clothingRepository);
});

// 3. GET /api/v1/clothing/:id - Obtener una prenda por ID
app.get('/api/v1/clothing/:id', (req: Request, res: Response): any => {
  const { id } = req.params;
  const item = clothingRepository.find(c => c.id === id);
  if (!item) return res.status(404).json({ error: `Prenda con ID ${id} no encontrada.` });
  return res.json(item);
});

// 4. DELETE /api/v1/clothing/:id - Eliminar una prenda
app.delete('/api/v1/clothing/:id', (req: Request, res: Response): any => {
  const { id } = req.params;
  const index = clothingRepository.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Prenda no encontrada.' });
  clothingRepository.splice(index, 1);
  return res.json({ message: 'Prenda eliminada exitosamente del armario.' });
});

// 5. POST /api/v1/outfits - Crear un Outfit
app.post('/api/v1/outfits', (req: Request, res: Response): any => {
  const body: CreateOutfitDTO = req.body;
  if (!body.name || !body.clothingIds || !Array.isArray(body.clothingIds) || body.clothingIds.length === 0) {
    return res.status(400).json({ error: 'El outfit debe tener un nombre y al menos un ID de prenda.' });
  }
  const newOutfit: Outfit = {
    id: (outfitRepository.length + 100).toString(),
    name: body.name,
    clothingIds: body.clothingIds
  };
  outfitRepository.push(newOutfit);
  return res.status(201).json(newOutfit);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
