import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BottomSheetModal from "../../components/BottomSheetModal";
import { AiFillCamera } from "react-icons/ai";
import { MdModeEdit, MdOutlineContentCopy } from "react-icons/md";
import styled from "styled-components";
import { deleteStorage, userProfileUpdate } from "../../api/axios";
import { storage } from "../../config/keys";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/keys";
import { signOut } from "firebase/auth";
import CropControl from "../../components/CropControl.js";
import Loading from "../../components/Loading";
import { usersActions } from "../../store/users/users-slice";

const MyPage = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [name, setName] = useState("");
  const [isEditName, setIsEditName] = useState(false);
  const [bottomModalShow, setBottomModalShow] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [cropVisible, setCropVisible] = useState(false);
  const users = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setProfilePic(users?.photoUrl);
    setName(users?.name);
  }, [users]);

  const getCropData = async () => {
    if (typeof cropper === "undefined") return;

    setLoading(true);
    setCropVisible(false);
    const cropImage = cropper.getCroppedCanvas().toDataURL();
    const imageURL = await uploadImage(cropImage);
    await userProfileUpdate(users.uid, { photoUrl: imageURL });
    setProfilePic(imageURL);
    dispatch(usersActions.updatePhoto(imageURL));
    setLoading(false);
  };

  const uploadImage = async (cropImage) => {
    setLoading(true);
    const img = await fetch(cropImage);
    const blob = await img.blob();
    const filename = cropImage.substring(cropImage.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `users/${filename}`);

    await uploadBytes(storageRef, blob);
    const fileURL = await getDownloadURL(ref(storage, storageRef));
    setLoading(false);
    return fileURL;
  };

  const deleteProfilePic = async () => {
    setBottomModalShow(false);
    if (profilePic === "") {
      return;
    }
    setLoading(true);
    await userProfileUpdate(users.uid, { photoUrl: "" });
    await deleteStorage(profilePic);
    setProfilePic("");
    dispatch(usersActions.updatePhoto(""));
    setLoading(false);
  };

  const upload = (file) => {
    setBottomModalShow(false);
    setCropVisible(true);
    setCropData(URL.createObjectURL(file));
  };

  const updateProfileName = async () => {
    setLoading(true);
    await userProfileUpdate(users.uid, { name });
    dispatch(usersActions.updateName(name));
    setIsEditName(false);
    setLoading(false);
  };

  const copyClipboardHandler = async () => {
    await navigator.clipboard.writeText(users.code);
    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 1500);
  };

  const signOutHandler = () => {
    signOut(auth);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <MyPageContainer>
      <ProfileContainer>
        <ProfilePic>
          <Picture>
            <div className="pic">
              {profilePic === "" && (
                <img src="/assets/default_profile.jpg" alt="프로필 사진" />
              )}
              {profilePic !== "" && <img src={profilePic} alt="프로필 사진" />}
            </div>
            <div
              className="changePicButton"
              onClick={() => setBottomModalShow(true)}
            >
              <AiFillCamera className="cameraIcon" />
            </div>
            <BottomSheetModal
              isModalOpen={bottomModalShow}
              closeModal={() => setBottomModalShow(false)}
              profile
              imageUpload={(e) => {
                upload(e.target.files[0]);
              }}
              deleteProfilePic={deleteProfilePic}
            />
          </Picture>
        </ProfilePic>
        <ProfileName>
          <Name>
            {isEditName ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <span>{name}</span>
            )}

            <MdModeEdit
              className="editIcon"
              onClick={() =>
                isEditName ? updateProfileName() : setIsEditName(true)
              }
            />
          </Name>
        </ProfileName>
        <ProfileCode>
          <div className="code">{users?.code}</div>
          <div className="copy" onClick={copyClipboardHandler}>
            <MdOutlineContentCopy />
          </div>
        </ProfileCode>
        {toast && (
          <div className="toastMessage">클립보드에 복사되었습니다.</div>
        )}
      </ProfileContainer>

      <MyPageList>
        <ul>
          <li onClick={() => navigate("/friendlist")}>친구 목록</li>
          <li onClick={() => navigate("/addfriend")}>친구 추가</li>
          <li onClick={() => navigate("/recommend/myrecommend")}>추천한 책</li>
          <li onClick={() => navigate("/favorite")}>찜한 책</li>
          <li onClick={signOutHandler}>로그아웃</li>
        </ul>
      </MyPageList>

      {cropVisible && (
        <CropControl
          cropData={cropData}
          setCropper={setCropper}
          getCropData={getCropData}
          cropVisible={() => setCropVisible(false)}
          profile
        />
      )}
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .logout {
    margin-top: auto;
    padding: 30px 0;
    text-align: center;
    font-size: 0.9rem;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;

  .toastMessage {
    position: absolute;
    bottom: 10px;
    font-size: 0.8rem;
    color: ${(props) => props.theme.gray400};
  }
`;

const ProfilePic = styled.div``;

const Picture = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  margin: 0 auto;

  .pic {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid ${(props) => props.theme.mainColor};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .changePicButton {
    position: absolute;
    right: 2px;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.mainColor};

    .cameraIcon {
      font-size: 13px;
      color: white;
      text-align: center;
    }
  }
`;

const ProfileName = styled.div`
  margin: 20px 0;
  text-align: center;

  .editIcon {
    position: absolute;
    right: -20px;
    color: ${(props) => props.theme.mainColor};
  }
`;

const Name = styled.span`
  position: relative;

  input {
    padding-bottom: 5px;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    text-align: center;
  }
`;

const ProfileCode = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.gray100};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  font-size: 0.8rem;
  text-align: center;

  .code {
    padding: 7px 10px;
  }

  .copy {
    padding: 7px 10px;
    border-left: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const MyPageList = styled.div`
  li {
    padding: 20px 10px;
  }
`;
