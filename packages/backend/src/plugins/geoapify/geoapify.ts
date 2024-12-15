import express, { Router, Request, Response } from 'express';
import axios from 'axios';

const GEOAPIFY_API_KEY = '78009e6ebd4a4204aa39c0d47332b767';

const router: Router = Router();

router.use(express.json());

router.post('/distance', async (req: Request, res: Response) => {
  const { start, end } = req.body;

  try {
    const response = await axios.get(`https://api.geoapify.com/v1/routing?waypoints=${start}|${end}&mode=drive&apiKey=${GEOAPIFY_API_KEY}`);
    const distance = response.data.features[0].properties.distance;
    res.json({ distance: (distance / 1000).toFixed(2) }); // Convert meters to kilometers
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch distance' });
  }
});

export default router;
