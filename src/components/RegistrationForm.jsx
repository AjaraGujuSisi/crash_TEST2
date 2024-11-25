import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "./store";

const RegistrationForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleRegister = () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!username || !password || !confirmPassword) {
            setErrorMessage("Все поля должны быть заполнены.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Пароли не совпадают.");
            return;
        }

        const userExists = users.some((user) => user.username === username);

        if (userExists) {
            setErrorMessage("Пользователь с таким именем уже зарегистрирован.");
            return;
        }

        dispatch(addUser({ username, password }));
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setSuccessMessage("Регистрация прошла успешно!");
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Регистрация</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <div style={{ marginBottom: "10px" }}>
                <input type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: "8px" }}/>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "8px" }}/>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <input type="password" placeholder="Повторите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: "100%", padding: "8px" }}/>
            </div>
            <button onClick={handleRegister} style={{padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", width: "100%",}}>Зарегистрироваться</button>
        </div>
    );
};

export default RegistrationForm;
