import { Collapse } from "antd";
import React from "react";
import QANDA from "../assets/qanda.png";
const QuestionsAndAnswer = () => {
  const items = [
    {
      key: "1",
      label: (
        <p className="text-[#5052b1] text-base">
          What is Zayy Sine Marketplace?
        </p>
      ),
      children: (
        <p>
          Zayy Sine is an online platform where buyers and sellers can connect
          to buy, sell, and trade various products. Our goal is to provide a
          safe and easy-to-use marketplace for all users.
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p className="text-[#5052b1] text-base">How do I create an account?</p>
      ),
      children: (
        <p>
          To create an account, click on the "Sign Up" button at the top of the
          page. You’ll need to provide a valid email address and set a password,
          or you can sign up using your Google/Facebook account.
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <p className="text-[#5052b1] text-base">
          What should I do if I have a problem with my order?
        </p>
      ),
      children: (
        <p>
          If you have an issue with your order, such as receiving the wrong item
          or not receiving it at all, please contact the seller first. If the
          problem isn’t resolved, reach out to our support team for help.
        </p>
      ),
    },
    {
      key: "4",
      label: (
        <p className="text-[#5052b1] text-base">
          Can I edit or delete my listing?
        </p>
      ),
      children: (
        <p>
          Yes, you can edit or delete your listing by going to "My Listings" in
          your dashboard and selecting the appropriate option for each item.
        </p>
      ),
    },
    {
      key: "5",
      label: (
        <p className="text-[#5052b1] text-base">
          How do I get support if I have questions?
        </p>
      ),
      children: (
        <p>
          If you have any questions or need assistance, you can contact our
          support team through the "Help" section or by emailing us at [support
          email].
        </p>
      ),
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className="w-[50vw] text-[#5052b1] pt-6">
      <p className="text-[#5052b1] text-center text-2xl font-bold mb-5">
        Frequently Asked Questions!
      </p>
      <div>
        <img src={QANDA} alt="" className="w-[350px] m-auto" />
        <Collapse
          className="bg-white"
          items={items}
          defaultActiveKey={["1"]}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default QuestionsAndAnswer;
