import React, { useEffect, useState } from "react";

import { formatDistanceToNowStrict } from "date-fns";
import {
  BellIcon,
  DevicePhoneMobileIcon as PhoneIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import {
  deleteAllNotifications,
  deleteNotification,
  markAsReadNoti,
} from "../../API/notification";
import { Modal, Space, message } from "antd";
const Notifications = ({ notis, getNotis }) => {
  const deleteNoti = async (id) => {
    try {
      const response = await deleteNotification(id);
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
      getNotis();
      message.success(response.message);
    } catch (error) {
      message.success(error.message);
    }
  };

  const deleteAllNoti = async () => {
    try {
      const response = await deleteAllNotifications(notis[0].owner_id);
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
      getNotis();
      message.success(response.message);
    } catch (error) {
      message.error(error.message);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await markAsReadNoti(id);
      console.log(response);
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
      getNotis();
      message.success(response.message);
    } catch (error) {
      message.error(error.message);
    }
  };

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <section className="w-full">
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-bold flex gap-2 items-center mb-5">
          <span>Notifications</span>
          <BellIcon className="w-5" />
        </p>
        {notis.length > 0 && (
          <Space>
            <Modal
              open={open}
              title="Deleting Notification"
              onOk={deleteAllNoti}
              onCancel={handleCancel}
              footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              )}
            >
              Are you sure to delete All?
            </Modal>
            <button
              className="text-red-700 hover:underline"
              onClick={showModal}
            >
              Delete All
            </button>
          </Space>
        )}
      </div>
      {notis.length > 0 ? (
        <div className="flex flex-col gap-5">
          {notis.map((noti) => {
            return (
              <div
                key={noti._id}
                className={`w-full flex flex-col gap-2 bg-green-50 p-2 rounded-lg text-[#5052b1] ${
                  noti.isRead && "bg-slate-100"
                }`}
              >
                <div className="w-full flex justify-between">
                  <p>{noti.title}</p>
                  <p>
                    {formatDistanceToNowStrict(new Date(noti.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg">{noti.message}</p>
                  <p className="flex gap-1 items-center font-bold">
                    <PhoneIcon className="w-3" />
                    <span className="tracking-wide">{noti.phone_number}</span>
                  </p>
                </div>
                <div className="h-[1px] w-full bg-slate-300"></div>
                <div className="w-full flex gap-3 justify-end">
                  <Link
                    className="text-green-400 text-right underline"
                    to={`/productDetail/${noti.product_id}`}
                  >
                    View Bids
                  </Link>
                  <button
                    className="text-red-400 text-right hover:underline"
                    onClick={() => deleteNoti(noti._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-blue-600 text-right  "
                    disabled={noti.isRead}
                    onClick={() => markAsRead(noti._id)}
                  >
                    {noti.isRead ? "Read" : "Mark as Read"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>You don't have notificatins yet</p>
      )}
    </section>
  );
};

export default Notifications;
