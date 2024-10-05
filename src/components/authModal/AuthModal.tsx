import { modalDropIn } from "@/data";
import { getAuthModalDict } from "./dict";

import dynamic from "next/dynamic";

interface IProps {
  locale: "ru" | "en";
}

const DynamicModal = dynamic(
  () =>
    import("@/components/modal/Modal").then((mod) => ({
      default: mod.Modal,
    })),
  { ssr: false }
);

const DynamicAuthForm = dynamic(
  () =>
    import("@/components/authForm/AuthForm").then((mod) => ({
      default: mod.AuthForm,
    })),
  { ssr: false }
);

export async function AuthModal({ locale }: IProps) {
  const dict = await getAuthModalDict(locale);

  return (
    <DynamicModal
      stateName="showModal"
      actionName="setShowModal"
      variants={modalDropIn}
      width={400}
      height={400}
    >
      <DynamicAuthForm dict={dict} />
    </DynamicModal>
  );
}
