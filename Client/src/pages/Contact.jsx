import React from "react";
import ContactFrom from "../components/Contact/ContactFrom";
import csImg from "../assets/CustomerService.jpg";
import Address from "../components/Contact/Address";
const Contact = () => {
  return (
    <section className="w-full flex gap-10 p-5">
      <ContactFrom />
      <div>
        <img
          src={csImg}
          alt="customer service Img"
          className="w-[350px] h-[320px] object-cover"
        />
        <Address />
      </div>
    </section>
  );
};

export default Contact;
