"use client";

import { useStore } from "@/store";

export function Header() {
  const setShowModal = useStore((state) => state.setShowModal);

  return (
    <>
      <button onClick={() => setShowModal(true)}>открыть модалку</button>
    </>
  );
}
