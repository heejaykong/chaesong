import express from 'express';
import MemberJoin from './memberJoin';
import MemberLogin from './MemberLogin';
import recipe from './recipe';
import scrap from './scrap';
import MainPage from './mainpage';
import personalpage from './personalpage';
import recommendPage from './recommendPage';
import eat from './eat';
import search from './search';

const router = express.Router();

router.use('/MemberJoin', MemberJoin);
router.use('/MemberLogin', MemberLogin);
router.use('/recipe', recipe);
router.use('/scrap', scrap);

router.use('/MainPage', MainPage);
router.use('/personalpage', personalpage);
router.use('/recommendpage', recommendPage);
router.use('/eat', eat);
router.use('/search',search);

export default router;