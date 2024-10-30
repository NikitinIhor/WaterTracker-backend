import { Router } from 'express';
import {
  getAllWaterTracker,
  getWaterTrackerById,
} from '../services/waterTracker.js';

export const waterTrackerRouter = Router();

waterTrackerRouter.get('/', async (req, res) => {
  try {
    const data = await getAllWaterTracker();

    res.json({
      status: 200,
      message: `Seccessfully found waterTracker`,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

waterTrackerRouter.get('/id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getWaterTrackerById(id);

    if (!id) {
      return res.status(404).json({
        message: `waterTracker with id: ${id} not found`,
      });
    }

    res.json({
      status: 200,
      message: `WaterTracker with id: ${id} was seccessfully found`,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
