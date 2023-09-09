import unCompletionIDCardCover from "@/assets/images/common/ID-verify.png";
import unCompletionPaymentCover from "@/assets/images/common/add-card.png";
import unCompletionPaymentPasswordCover from '@/assets/images/common/key.png'

import ProfileCompletionPopupConstructor from "./ProfileCompletionPopup.vue";
import { AppContext, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createVM } from "../core";

type ProfileCompletionPopupProps = {
  image: string,
  title: string,
  content: string,
  confirmButtonText: string,
  type: string,
  action: string,
}

function ProfileCompletionPopup(props: ProfileCompletionPopupProps, appContext?: AppContext | null) {
  let vm = createVM<ProfileCompletionPopupProps>(ProfileCompletionPopupConstructor, props, appContext);
  vm!.exposed!.visible.value = true;
}

export function useProfileCompletionPopup() {
  const router = useRouter();
  const route = useRoute();
  const appContext = getCurrentInstance()?.appContext;
  return {
    idcard: (props?: ProfileCompletionPopupProps) => {
      const defaultProps = {
        image: unCompletionIDCardCover,
        title: "身份认证",
        content: "完成身份认证，可核对真实身份，\n保障合法权益",
        confirmButtonText: "立即认证",
        action: () => router.push(`/verify?from=${route.path}`),
        type: "idcard"
      };
      const newProps = Object.assign(defaultProps, props);
      ProfileCompletionPopup(newProps, appContext);
    },
    payment: (props?: ProfileCompletionPopupProps) => {
      const defaultProps = {
        image: unCompletionPaymentCover,
        title: "添加收付款信息",
        content: "请先添加收付款信息",
        confirmButtonText: "立即绑定",
        action: () => router.push(`/bank_card?from=${route.path}`),
        from: route.path,
        type: "payment"
      };
      const newProps = Object.assign(defaultProps, props);
      ProfileCompletionPopup(newProps, appContext);
    },
    paymentPassword (props?: ProfileCompletionPopupProps) {
      const defaultProps = {
        image: unCompletionPaymentPasswordCover,
        title: "设置支付密码",
        content: "请先设置支付密码",
        confirmButtonText: "立即设置",
        action: () => router.push(`/pay_password?from=${route.path}`),
        from: route.path,
        type: "payment-password"
      };
      const newProps = Object.assign(defaultProps, props);
      ProfileCompletionPopup(newProps, appContext);
    }
  };
}