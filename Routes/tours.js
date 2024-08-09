import express from 'express';
const router = express.Router();
import { createTour, updateTour, deleteTour, getTour, getAllTour, getToursBySearch, getFeaturedTour,
getTourCount} from '../Controller/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';


//create new tour 
router.post('/',verifyAdmin, createTour);

//update tour
router.put('/:id',verifyAdmin, updateTour);

//delete tour
router.delete('/:id', verifyAdmin,deleteTour);

//get single tour
router.get('/:id', getTour);

//get all tour
router.get('/', getAllTour);

//search tour
router.get('/search/getTourBySearch',getToursBySearch);
// /search is not coming to this rooute but it is coming to getToursBySearch


// search by featured 
router.get('/search/getFeaturedTours', getFeaturedTour);

// tour count
router.get('/search/getTourCount',getTourCount );









export default router;