import React, { useState } from 'react';

const LightBox = ({ src, alt = "Skärmbild"}) => {
	const [isOpen, setIsOpen] = useState(false);
  const imgFormat = ["png", "jpg", "jpeg", "gif"]
  const extension = src.slice((src.lastIndexOf(".") +1))

	const toggleModal = () => {
    if (imgFormat.some(format => format === extension)) {
      setIsOpen(!isOpen);
      return
    }
    window.open(src, '_blank');
  }


	return (
    <>
      <li onClick={toggleModal} id="lightbox-li">
        <i className="fa-solid fa-image"></i> Skärmbild
      </li>

      {isOpen ?
        <div className="lightbox" onClick={toggleModal}>
          <img src={src} />
        </div>
        : null}
    </>
	);
};

export default LightBox;