import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Space } from "antd";
import userImg from "../../assets/UserImg.jpg";
const General = () => {
  const { email, name, role } = useSelector((state) => state.user.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {};

  const handleCancel = () => {
    setOpen(false);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };
  return (
    <section>
      <div className="flex justify-between mb-2">
        <h2 className="text-3xl mb-3">Admin Profile</h2>
        <Space>
          <Modal
            open={open}
            title="Title"
            onOk={logoutHandler}
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            )}
          >
            Are you sure to logout?
          </Modal>
          <Button danger type="primary" onClick={showModal}>
            Logout
          </Button>
        </Space>
      </div>

      <div className="flex gap-5 ">
        <img src={userImg} alt="profile image" className="w-32 rounded-md" />
        <div className="flex flex-col gap-3 items-start ">
          <p className="text-2xl font-bold">{name} </p>
          <p>{email} </p>
          <p className="p-1 px-2 font-bold space-x-5 bg-purple-600 text-white rounded-lg">
            {role.toUpperCase()}{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default General;
