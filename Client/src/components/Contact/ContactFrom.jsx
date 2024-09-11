import React from "react";
import { Form, Input } from "antd";
const ContactFrom = () => {
  return (
    <div className="w-[35vw] rounded-lg bg-slate-100 p-10 pt-8 ">
      <p className="text-sm mb-3">Get in Touch</p>
      <p className="text-4xl mb-2">Let's Chat and Reach out to Us!</p>
      <p className="text-md mb-3">
        Have questions or feedback? We're here to help! Send us a message and we
        will reply within 24 hours.
      </p>
      <Form layout="vertical" className="">
        <Form.Item label={"Full Name"} name={"name"} className="">
          <Input placeholder="Your name" />
        </Form.Item>
        <Form.Item label={"Email Address"} name={"email"}>
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item label={"Message"} name={"message"}>
          <Input placeholder="leave a message" />
        </Form.Item>
        <button className="w-full bg-[#5052b1] py-2 text-white font-bold tracking-wide rounded-lg">
          Contact
        </button>
      </Form>
    </div>
  );
};

export default ContactFrom;
