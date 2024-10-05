"use client";

import "./modal.css";
import cn from "clsx";

import { motion, AnimatePresence } from "framer-motion";

import { useStore, Store } from "@/store";
import { useShallow } from "zustand/react/shallow";

import type { Variants } from "framer-motion";

type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

type BooleanFuncPayloadKeys<T> = {
  [K in keyof T]: T[K] extends (payload: boolean) => void ? K : never;
}[keyof T];

interface IModalProps {
  children: React.ReactNode;
  variants: Variants;
  stateName: BooleanKeys<Store>;
  actionName: BooleanFuncPayloadKeys<Store>;
  class?: string;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
}

function Modal(props: IModalProps) {
  const { width = 350, height = 350 } = props;
  const [showModal, setShowModal] = useStore(
    useShallow((state) => [state[props.stateName], state[props.actionName]])
  );

  const onCloseModal = () => setShowModal(false);

  return (
    <>
      <AnimatePresence>
        {/* https://nextjs.org/learn-pages-router/seo/improve/dynamic-import-components */}
        {showModal && (
          <motion.div
            className={"backdrop"}
            onClick={onCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className={cn("modal", props.class)}
              style={{
                width,
                height,
              }}
              variants={props.variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
            >
              {props.children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { Modal };
