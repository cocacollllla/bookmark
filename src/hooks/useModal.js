import { useState } from "react";

const OPTION = {
  show: false,
  title: "",
  desc: "",
  text: "",
  onSubmit: () => {},
  onClose: () => {},
};

const useModal = () => {
  const [modalOption, setModalOption] = useState(OPTION);

  const showShowModal = (show, title, desc, text, onSubmitCallback) => {
    setModalOption((prev) => ({
      ...prev,
      show,
      title,
      desc,
      text,
      onSubmit: () => {
        if (onSubmitCallback) onSubmitCallback();
        setModalOption((prev) => ({ ...prev, show: false }));
      },
      onClose: () => {
        setModalOption((prev) => ({ ...prev, show: false }));
      },
    }));
  };

  return [modalOption, showShowModal];
};

export default useModal;
