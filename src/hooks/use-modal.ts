"use client";

import { useState } from "react";

export default function useModal(InitialModalOpen = false) {
  const [isOpen, setIsOpen] = useState(InitialModalOpen);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  return { isOpen, setIsOpen, closeModal, openModal };
}
