import React from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { MdClose, MdOutlineCheck } from "react-icons/md";
import styled from "styled-components";

const CropControl = ({
  cropData,
  setCropper,
  getCropData,
  cropVisible,
  profile,
}) => {
  return (
    <CropContainer>
      <ButtonContainer>
        <div onClick={cropVisible}>
          <MdClose />
        </div>
        <div onClick={getCropData}>
          <MdOutlineCheck />
        </div>
      </ButtonContainer>
      <Cropper
        style={{ height: 500, width: "100%" }}
        zoomTo={0.3}
        initialAspectRatio={0.8}
        src={cropData}
        viewMode={1}
        zoomable={false}
        aspectRatio={profile ? 1 : NaN}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
        guides={true}
      />
    </CropContainer>
  );
};

export default CropControl;

const CropContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.black};
  z-index: 99999;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: white;
  font-size: 1.7rem;
`;
