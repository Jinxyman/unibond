import React, { useEffect, useState } from "react";
import styles from "scss/layout/Navbar.module.scss";
import IconButton from "components/IconButton";
import useMediaQuery from "hooks/useMediaQuery";
import SidebarLeft from "./SidebarLeft";
import { IoCaretDownCircleSharp, IoMenu } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import SidebarRight from "./SidebarRight";
import { useDispatch } from "react-redux";
import { toggleState as toggleBlackScreenState } from "reduxState/slices/blackScreenSlice";
import Link from "next/link";
import { IKImage } from "imagekitio-react";
import OutsideClickDetector from "hooks/OutsideClickDetector";

function Navbar({ pageName }) {
  const isBellow1024px = useMediaQuery("(max-width : 64em)");
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isPageNameDropdownShow, setIsPageNameDropdownShow] = useState(false);
  const PagenameDropdownRef = OutsideClickDetector(() =>
    setIsPageNameDropdownShow(false)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      toggleBlackScreenState(
        isLeftSidebarOpen | isRightSidebarOpen ? true : false
      )
    );
  }, [isLeftSidebarOpen, isRightSidebarOpen]);

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className={styles.navbar}>
      <Link href="/" passHref>
        <IKImage
          path="images/Eggg.png"
          className={`${styles.logo}`}
          loading="lazy"
          lqip={{ active: true }}
          alt=""
        />
      </Link>

      {isBellow1024px ? (
        <button
          className={styles.hamburger}
          onClick={() => setIsLeftSidebarOpen(true)}
        >
          <IoMenu />
        </button>
      ) : null}

      <div className={styles.pageDetails}>
        <div className={`${styles.LogoTitle}`}>
          <h1 className="fs-30px black weight-8">UniBond</h1>
          <button className="pointer" onClick={refresh}>
            <IoMdRefresh className={`${styles.refreshIcon} gray`} />
          </button>
        </div>
        <div className={styles.pageName} ref={PagenameDropdownRef}>
          <button
            className="pointer"
            onClick={() => setIsPageNameDropdownShow((val) => !val)}
          >
            <h2
              className={`gray ${
                isBellow1024px ? "fs-12px" : "fs-18px"
              }  weight-6`}
            >
              {pageName}
            </h2>
            <IoCaretDownCircleSharp className={`${styles.downIcon} gray`} />
          </button>

          <div
            className={`${styles.pageNameDropdown} ${
              isPageNameDropdownShow ? styles.show : ""
            }`}
          >
            <p className="fs-18px">Some Text</p>
          </div>
        </div>
      </div>

      {isBellow1024px ? (
        <IconButton
          img="peoples/user.png"
          className={styles.userIcon}
          notify={true}
          onClick={() => setIsRightSidebarOpen(true)}
        ></IconButton>
      ) : null}

      {isBellow1024px ? (
        <>
          <SidebarLeft state={[isLeftSidebarOpen, setIsLeftSidebarOpen]} />
          <SidebarRight state={[isRightSidebarOpen, setIsRightSidebarOpen]} />
        </>
      ) : null}
    </div>
  );
}

export default Navbar;
