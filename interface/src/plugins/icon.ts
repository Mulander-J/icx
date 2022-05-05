import { App } from 'vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { 
  CiIcp,IoClose,IoPower,BiMoonStars,BiSun,MdLibraryaddcheckRound,
  HiSolidHome,MdFeedbackRound,RiQuestionnaireFill,MdSendRound,
  OiClock, GiRank3,MdRefresh,MdExpandmoreRound,IoCopy,OiLinkExternal,
  IoChatboxEllipses,IoTrashBin,MdAddRound,IoSearch,RiArrowGoBackLine,
  IoLogoTwitter,IoLogoGithub,BiTelegram,IoLogoDiscord,GiEvilBook,
  MdModeeditRound,FaTools,HiSwitchVertical,MdMorehoriz,RiShareFill,
  GiMailedFist,IoSnow,
} from 'oh-vue-icons/icons'

addIcons(
  CiIcp,IoClose,IoPower,BiMoonStars,BiSun,MdLibraryaddcheckRound,
  HiSolidHome,MdFeedbackRound,RiQuestionnaireFill,MdSendRound,
  OiClock, GiRank3,MdRefresh,MdExpandmoreRound,IoCopy,OiLinkExternal,
  IoChatboxEllipses,IoTrashBin,MdAddRound,IoSearch,RiArrowGoBackLine,
  IoLogoTwitter,IoLogoGithub,BiTelegram,IoLogoDiscord,GiEvilBook,
  MdModeeditRound,FaTools,HiSwitchVertical,MdMorehoriz,RiShareFill,
  GiMailedFist,IoSnow,
);


const registIcons = (app: App) => {
  app.component("v-icon", OhVueIcon);
}
export default registIcons