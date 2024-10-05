import { AuthModal } from "@/components/authModal/AuthModal";
import { Header } from "@/components/header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <AuthModal locale="ru" />
    </>
  );
}
