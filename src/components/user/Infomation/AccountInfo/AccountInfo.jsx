import { useEffect, useState, useContext } from "react";
import api from "../../../../../src/services/api";
import defaultAvatar from "../../../../../src/asset/imgae/default_avatar.png";
import { Divider, Modal } from "antd";
import "./AccountInfo.css";
import googleLogo from "../../../../../src/asset/imgae/google_logo.png";
import deleteAccount from "../../../../../src/asset/icon/delete_icon.png";
import browser_icon from "../../../../../src/asset/icon/browser_icon.png";
import { UserContext } from "../../../../../src/context/AuthContext";
const AccountInfo = ({ user }) => {
  const [userInfo, setUserInfo] = useState();
  const [deviceLog, setDeviceLog] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { setUser } = useContext(UserContext);


  const formatLoginTime = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} tháng ${month} năm ${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    getUserInfo();
    getDeviceLog();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await api.getUserInfo(user.id);
      setUserInfo(response.data);
    } catch (error) {
    }
  };

  const getDeviceLog = async () => {
    try {
      const response = await api.getDeviceLog(user.id);
      setDeviceLog(response.data);
    } catch (error) {
    };
  }

  const showModal = () => {
    setEditName(userInfo?.full_name || "");
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('full_name', editName);
      if (selectedFile) {
        formData.append('profile_image', selectedFile);
      }
      await api.updateUserInfo(user.id, formData).then((res) => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const updatedUser = {
          ...currentUser,
          fullName: res.data?.user?.full_name,
          profile_image: res.data?.user?.profile_image
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // Cập nhật UserContext
        setUser(updatedUser);
      });
      getUserInfo();
      setIsModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="info-user-profile-container">
      <h1>Thông tin tài khoản</h1>
      <div className="info-user-profile">
        <div className="info-user-profile-avatar">
          <img src={userInfo?.profile_image != null ? userInfo.profile_image : defaultAvatar} alt="avatar" />
          <h2>{userInfo?.full_name}</h2>
        </div>
        <div><button onClick={showModal}>Chỉnh sửa</button></div>
      </div>
      <div className="info-user-profile-email">
        <h2>Hồ sơ</h2>
        <h3>Email</h3>
        <p >{userInfo?.email}</p> 
        <Divider />
        <h3>Mật khẩu</h3>
        <p >********</p>
        <Divider />
      </div>
      <div className="info-user-profile-gmail">
        <h2>Tài khoản đã liên kết</h2>
        <div className="info-user-profile-gmail-list">
          <img src={googleLogo} alt="google" />
          <p style={{ fontSize: "14px", fontWeight: "500" }}>Google</p>
          <p >{userInfo?.email}</p>
        </div>
      </div>
      <div className="info-user-profile-device">
        <h2>Thiết bị đăng nhập</h2>
        <div className="info-user-profile-device-list">
          {deviceLog?.map((item) => (
            <>
              <div key={item.id} style={{ fontSize: "14px", lineHeight: "22px", fontWeight: "500" }} className="info-user-profile-device-list-item">
                <img src={browser_icon} alt="browser" style={{ width: "20px", height: "20px" }} />
                {item.os} ({item.browser})
              </div>
              <div style={{ fontSize: "14px", lineHeight: "22px", fontWeight: "500" }}>
                {formatLoginTime(item.login_time)}
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="info-user-profile-delete-account">
        <h2>Quản lý tài khoản</h2>
        <button><img src={deleteAccount} alt="" /> Xóa tài khoản</button>
      </div>

      <Modal
        title="Cập nhật hồ sơ"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
        className="edit-profile-modal"
      >
        <div className="edit-profile-content">
          <div className="edit-profile-avatar">
            <img src={selectedFile ? URL.createObjectURL(selectedFile) : (userInfo?.profile_image || defaultAvatar)} alt="avatar" />
            <div className="edit-profile-avatar-hint">
              <p className="file-hint">Hỗ trợ định dạng JPG, GIF, PNG, kích thước tối đa 800KB.</p>
              <label className="upload-button">
              Tải lên ngay
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
          <div className="edit-profile-form">
            <label>Tên hiển thị</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nhập tên hiển thị"
            />
          </div>
          <div className="edit-profile-actions">
            <button className="cancel-button" onClick={handleCancel}>Huỷ bỏ</button>
            <button className="submit-button" onClick={handleUpdateProfile}>Cập nhật</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AccountInfo;