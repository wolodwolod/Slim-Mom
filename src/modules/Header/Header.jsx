import { useRef, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { getIsLogin } from "../../redux/userAccount/userAccount-selectors";

import Logo from "./Logo";
import Navigation from "../../shared/components/Navigation/Navigation";
import Button from "../../shared/components/Button";
import UserInfo from "../../shared/components/UserInfo/UserInfo";
import Modal from "../../shared/components/Modal";
import { OpenIcon, CloseIcon } from "./ModalButtonIcons";

import styles from "./header.module.scss";

const modalRoot = document.querySelector("#modalRoot");

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  let visibility = useRef(null);
  const isLogin = useSelector(getIsLogin, shallowEqual);

  isModalOpen
    ? (modalRoot.style.display = "block")
    : (modalRoot.style.display = "none");
  modalRoot.style.backgroundColor = "rgba(0,0,0,0)";

  if (!isLogin) {
    visibility = { display: "block" };
  }

  const linkOnClick = () => {
    setModalOpen(false);
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerLinksBlock}>
        <Logo
          logoLinkClassName={styles.logoLink}
          logoBigClassName={styles.logoBig}
          logoMediumClassName={styles.logoMed}
          logoSmallClassName={styles.logoSmall}
          logoImg={styles.logoImg}
        />
        <div className={styles.navigationBlock} style={visibility}>
          <Navigation isVisible={true} />
        </div>
      </div>

      {!isLogin || (
        <>
          <div className={styles.userInfoBlock}>
            <UserInfo />
          </div>
          <Button
            className={styles.modalButton}
            btnText={isModalOpen ? <CloseIcon color={"black"} /> : <OpenIcon />}
            type="button"
            onClickBtn={() => setModalOpen((prevState) => !prevState)}
          />
        </>
      )}

      {!isModalOpen || (
        <Modal isModalOpen={isModalOpen}>
          <div className={styles.modalBlock}>
            <Navigation linkOnClick={linkOnClick} />
          </div>
        </Modal>
      )}
    </header>
  );
};

export default Header;
