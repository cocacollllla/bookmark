import styled from "styled-components";
import Icon from "./Icon";

const HeaderRight = ({
  save,
  edit,
  del,
  heart,
  heartIcon,
  onsubmitHandler,
  onEdit,
  onDelete,
  onHeart,
}) => {
  return (
    <HeaderRightContainer>
      {save && (
        <div onClick={onsubmitHandler}>
          <Icon save />
        </div>
      )}
      {edit && (
        <div onClick={onEdit}>
          <Icon edit />
        </div>
      )}
      {del && (
        <div onClick={onDelete}>
          <Icon del />
        </div>
      )}
      {heartIcon && (
        <div onClick={onHeart}>
          <Icon heartIcon heart={heart} />
        </div>
      )}
    </HeaderRightContainer>
  );
};

export default HeaderRight;

const HeaderRightContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 15px;
  right: 18px;
  z-index: 9999;
  margin-left: 10px;
  font-size: 20px;

  .icon {
    font-size: 22px;
    color: ${(props) => props.theme.gray400};
  }
`;
