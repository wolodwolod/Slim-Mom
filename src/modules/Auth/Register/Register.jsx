import { useState, useCallback } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getError } from "../../../redux/userAccount/userAccount-selectors.js";
import { userOperations } from "../../../redux/userAccount/userAccount-operations";
import { useNavigate } from "react-router-dom";

import { initialState } from "./initialState";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

import style from "./Register.module.scss";



const Register = () => {

  const dispatch = useDispatch();
  const error = useSelector(getError, shallowEqual);
  !error || console.log(error);
  const navigate = useNavigate();

  const [form, setForm] = useState({ ...initialState });
  const { userName, email, password, passwordConfirmation } = form;  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Введені паролі не співпадають!");
      return;
    }
    // console.log(userName, email, password);
    const userData = {
    name: userName,
    email,
    password
  };
    dispatch(userOperations.registerUser(userData));

    navigate('/signup/confirmation');
    setForm(initialState);
  };

  const handleChange = useCallback(({ target }) => {
    // console.log(target)
    const { name, value } = target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  return (
    <div className={style.form_wrapper}>
      <h2 className={style.form_title}>Реєстрація</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputs_wrapper}>
          <Input
            name="userName"
            value={form.userName}
            type="text"
            placeholder="Ім'я *"
            onType={handleChange}
            className={style.input}
            required
          />
          <Input
            name="email"
            value={form.email}
            type="email"
            placeholder="Електронна адреса *"
            onType={handleChange}
            className={style.input}
            required
          />
          <Input
            name="password"
            value={form.password}
            type="password"
            placeholder="Пароль *"
            onType={handleChange}
            className={style.input}
            required
          />
          <Input
            name="passwordConfirmation"
            value={form.passwordConfirmation}
            type="password"
            placeholder="Повторіть пароль *"
            onType={handleChange}
            className={style.input}
            required
          />
        </div>
        <div className={style.btn_wrapper}>
          <Button
            type="submit"
            onClickBtn={handleSubmit}
            btnText="Реєстрація"
            className={style.button}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
