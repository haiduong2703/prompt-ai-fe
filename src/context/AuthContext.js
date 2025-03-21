import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null; // Lấy token từ localStorage nếu có
    });

    // Hàm đăng xuất
    const logout = () => {
        setUser(null); // Xóa thông tin user
        setToken(null); // Xóa token
        localStorage.removeItem("user"); // Xóa user khỏi localStorage
        localStorage.removeItem("token"); // Xóa token khỏi localStorage
    };

    // Hàm đăng nhập để set cả user và token
    const login = (userData, authToken) => {
        console.log("user", authToken)
        setUser(userData);
        setToken(authToken);
    };

    // Đồng bộ user và token với localStorage khi chúng thay đổi
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
export { UserContext };