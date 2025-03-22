import React, { useEffect, useState, useContext } from "react";
import api from "../../../../../src/services/api";
import defaultAvatar from "../../../../../src/asset/imgae/default_avatar.png";
import { Divider, Modal, message } from "antd";
import "./AccountInfo.css";
import googleLogo from "../../../../../src/asset/imgae/google_logo.png";
import deleteAccount from "../../../../../src/asset/icon/delete_icon.png";
import browser_icon from "../../../../../src/asset/icon/browser_icon.png";
import { UserContext } from "../../../../../src/context/AuthContext";

const AccountInfo = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [deviceLog, setDeviceLog] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { setUser } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      if (response.data?.data?.user) {
        setUserInfo(response.data.data.user);
      } else {
        message.error("Không thể lấy thông tin người dùng");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      message.error("Không thể lấy thông tin người dùng");
    }
  };

  const getDeviceLog = async () => {
    try {
      const response = await api.getDeviceLog(user.id);
      if (response.data) {
        setDeviceLog(response.data);
      }
    } catch (error) {
      console.error("Error fetching device logs:", error);
    }
  };

  const showModal = () => {
    setEditName(userInfo?.full_name || "");
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const validateFile = (file) => {
    // Check file size (800KB = 800 * 1024 bytes)
    const maxSize = 800 * 1024;
    if (file.size > maxSize) {
      message.error("Kích thước file không được vượt quá 800KB");
      return false;
    }
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      message.error("Chỉ chấp nhận file JPG, GIF, PNG");
      return false;
    }
    
    return true;
  };

  const handleUpdateProfile = async () => {
    // Check if name is provided
    if (!editName.trim()) {
      message.error("Vui lòng nhập tên hiển thị");
      return;
    }
    
    // Validate file if selected
    if (selectedFile && !validateFile(selectedFile)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('full_name', editName.trim());
      
      if (selectedFile) {
        formData.append('profile_image', selectedFile);
      }

      // For debugging
      console.log("FormData contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
      }
      
      const response = await api.updateUserInfo(user.id, formData);
      
      if (response && response.data && response.data.user) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const updatedUser = {
          ...currentUser,
          fullName: response.data.user.full_name,
          profile_image: response.data.user.profile_image
        };
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        getUserInfo();
        message.success("Cập nhật thông tin thành công");
      } else {
        message.error("Cập nhật thông tin không thành công");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Đã xảy ra lỗi khi cập nhật thông tin");
    } finally {
      setIsModalOpen(false);
      setSelectedFile(null);
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log("1")
    if (validateFile(file)) {
      console.log("2")
      setSelectedFile(file);
    } else {
      e.target.value = "";
    }
  };
  
  return (
    <div className="info-user-profile-container">
      <h1>Thông tin tài khoản</h1>
      <div className="info-user-profile">
        <div className="info-user-profile-avatar">
          <img 
            src={userInfo?.profile_image || defaultAvatar} 
            alt="avatar" 
            onError={(e) => { e.target.src = defaultAvatar; }}
          />
          <h2>{userInfo?.full_name}</h2>
        </div>
        <div><button onClick={showModal}>Chỉnh sửa</button></div>
      </div>
      <div className="info-user-profile-email">
        <h2>Hồ sơ</h2>
        <h3>Email</h3>
        <p>{userInfo?.email}</p> 
        <Divider />
        <h3>Mật khẩu</h3>
        <p>********</p>
        <Divider />
      </div>
      <div className="info-user-profile-gmail">
        <h2>Tài khoản đã liên kết</h2>
        <div className="info-user-profile-gmail-list">
          <img src={googleLogo} alt="google" />
          <p style={{ fontSize: "14px", fontWeight: "500" }}>Google</p>
          <p>{userInfo?.email}</p>
        </div>
      </div>
      <div className="info-user-profile-device">
        <h2>Thiết bị đăng nhập</h2>
        <div className="info-user-profile-device-list">
          {deviceLog && deviceLog.length > 0 ? deviceLog.map((item) => (
            <React.Fragment key={item.id}>
              <div style={{ fontSize: "14px", lineHeight: "22px", fontWeight: "500" }} className="info-user-profile-device-list-item">
                <img src={browser_icon} alt="browser" style={{ width: "20px", height: "20px" }} />
                {item.os} ({item.browser})
              </div>
              <div style={{ fontSize: "14px", lineHeight: "22px", fontWeight: "500" }}>
                {formatLoginTime(item.login_time)}
              </div>
            </React.Fragment>
          )) : (
            <p>Không có dữ liệu thiết bị</p>
          )}
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
        destroyOnClose={true}
      >
        <div className="edit-profile-content">
          <div className="edit-profile-avatar">
            <img 
              src={selectedFile ? URL.createObjectURL(selectedFile) : (userInfo?.profile_image || defaultAvatar)} 
              alt="avatar" 
              onError={(e) => { e.target.src = defaultAvatar; }}
            />
            <div className="edit-profile-avatar-hint">
              <p className="file-hint">Hỗ trợ định dạng JPG, GIF, PNG, kích thước tối đa 800KB.</p>
              <label className="upload-button">
                Tải lên ngay
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handleFileChange}
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
              maxLength={50}
            />
          </div>
          <div className="edit-profile-actions">
            <button className="account-info-cancel-button" onClick={handleCancel} disabled={isSubmitting}>Huỷ bỏ</button>
            <button 
              className="account-info-submit-button" 
              onClick={handleUpdateProfile} 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Cập nhật"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AccountInfo;