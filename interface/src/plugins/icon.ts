import { App } from 'vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { 
  CiIcp,IoClose,IoPower,BiMoonStars,BiSun,
  HiSolidHome,MdFeedbackRound,RiQuestionnaireFill,
  OiClock, GiRank3,MdRefresh,MdExpandmoreRound,
  IoChatboxEllipses,IoTrashBin,
} from 'oh-vue-icons/icons'

addIcons(
  CiIcp,IoClose,IoPower,BiMoonStars,BiSun,
  HiSolidHome,MdFeedbackRound,RiQuestionnaireFill,
  OiClock, GiRank3,MdRefresh,MdExpandmoreRound,
  IoChatboxEllipses,IoTrashBin,
);


const registIcons = (app: App) => {
  app.component("v-icon", OhVueIcon);
}
export default registIcons