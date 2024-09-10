import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProduct } from "../API/publicAPI";
import { createBid, getBidById } from "../API/bid";

import { Form, Input, message } from "antd";
import { TagIcon } from "@heroicons/react/24/solid";
import { CheckCircleFilled, SyncOutlined } from "@ant-design/icons";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { ClockIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import unknownProduct from "../assets/newProduct.jpg";
import { setLoader } from "../store/Slices/loaderSlice";
import BidCard from "../components/Bids/BidCard";
import { notifyOwner } from "../API/notification";

const ProductDetail = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [bids, setBids] = useState([]);
  const [selectedImg, setSelectedImg] = useState("");
  const { user } = useSelector((state) => state.user.user);
  const { isProcessing } = useSelector((state) => state.user.loader);
  const [bidLoader, setBidLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting product details
  const getProductDetail = async () => {
    dispatch(setLoader(true));
    try {
      const response = await getProduct(id);
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
      setProduct(response.product);
      setSelectedImg(response.product?.images[0]);
    } catch (error) {
      message.error(error.message);
    }
    dispatch(setLoader(false));
  };

  // getting bids for this prodcut
  const getBidsFortheProduct = async () => {
    setBidLoader(true);
    try {
      const response = await getBidById(id);
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
      setBids(response.bids);
    } catch (error) {
      console.log(error.message);
    }
    setBidLoader(false);
  };
  useEffect(() => {
    getProductDetail();
    getBidsFortheProduct();
  }, []);

  const onFinishHandler = async (values) => {
    dispatch(setLoader(true));
    values.product_id = product._id;
    values.seller_id = product.seller._id;
    values.buyer_id = user._id;

    try {
      const response = await createBid(values);
      if (!response.isSuccess) {
        form.resetFields();
        throw new Error(response.message);
      }
      getBidsFortheProduct();
      await notifyOwner({
        title: "New Bid!",
        message: `New bid placed by ${user.name}`,
        product_id: product._id,
        owner_id: product.seller._id,
        phone_number: values.phoneNumber,
      });
      form.resetFields();
      message.success(response.message);
    } catch (error) {
      message.error(error.message);
    }
    dispatch(setLoader(false));
  };
  return (
    <section className="h-full flex gap-1 pt-4">
      <div className="basis-2/5 flex flex-col items-center gap-3">
        <img
          src={selectedImg ? selectedImg : unknownProduct}
          alt={product.name}
          className="w-[80%] h-[250px] rounded-lg object-cover"
        />
        {!selectedImg && (
          <p className="text-red-600">The product doesn't include images!</p>
        )}
        <div className="w-full flex gap-2 justify-start px-5 ">
          {product.images?.length > 0 &&
            product.images.map((image, index) => (
              <img
                key={index}
                className={`w-28 h-20 rounded-lg cursor-pointer object-cover ${
                  selectedImg === image && "opacity-45"
                }`}
                src={image}
                alt={product.name}
                onClick={() => setSelectedImg(image)}
              />
            ))}
        </div>
      </div>
      <div className="basis-3/5 flex flex-col items-start gap-4 ">
        <div className="w-full flex justify-between items-center">
          <p className="text-4xl font-bold">{product.name}</p>
          <ArrowLeftIcon
            width={35}
            height={35}
            className=" px-1 text-[#5052b1] cursor-pointer rounded-full hover:bg-slate-300 "
            onClick={() => navigate(-1)}
          />
        </div>
        <p className="text-xl">{product.description}</p>
        <p className="p-2 bg-teal-600 text-white rounded-xl flex gap-2 ">
          <TagIcon className="w-5" /> <span>{product.category}</span>
        </p>
        <p className="text-3xl text-red-800  "> ${product.price}</p>
        <div className="flex gap-3">
          {product.utilities?.map((utility, index) => (
            <p className="flex gap-2" key={index}>
              <CheckCircleFilled className="text-[#5052b1]" />
              <span className="text-[#5052b1]">{utility}</span>
            </p>
          ))}
        </div>
        <p className=" flex gap-2 items-center">
          <ClockIcon className="w-5 " />
          <span className="font-bold">{product.usagePeriod}</span>
        </p>
        {/* Biting the item  */}
        <div className="w-full h-[1px] bg-slate-400"></div>
        {bids.length > 0 && (
          <div className="w-full">
            <h1 className="text-lg mb-3 font-bold">Recent bids</h1>
            <div className="w-full flex flex-col gap-2">
              {bids.map((bid, index) => (
                <BidCard key={index} bid={bid} />
              ))}
            </div>
          </div>
        )}

        {user && user?._id !== product.seller?._id && (
          <div className="w-full flex flex-col gap-5 mb-10">
            <p className="text-xl font-bold flex gap-3 items-center">
              <span>Bid this product</span>
              <ChatBubbleBottomCenterTextIcon className="w-7 text-[#5052b1]" />
            </p>
            <Form layout="vertical" onFinish={onFinishHandler}>
              <Form.Item
                name={"message"}
                label={"Message"}
                rules={[
                  { required: true, message: "Message shouldn't be blank" },
                ]}
                className="w-full"
                hasFeedback
              >
                <Input type="text" className="p-1 rounded-lg" />
              </Form.Item>
              <Form.Item
                name={"phoneNumber"}
                rules={[
                  { required: true, message: "Phone Number Must be filled" },
                ]}
                className="w-full"
                label={"Phone Number"}
                hasFeedback
              >
                <Input type="number" className="p-1 rounded-lg" />
              </Form.Item>

              <div className="w-full text-right">
                <button
                  className="p-2 bg-amber-500 rounded-md text-white text-right self-end "
                  type="submit"
                >
                  <span className={`${isProcessing && "mr-2"}`}>
                    Send Message
                  </span>
                  {isProcessing && <SyncOutlined spin />}
                </button>
              </div>
            </Form>
          </div>
        )}
        {user && user._id === product.seller?._id && bids.length < 0 && (
          <div>
            <p className="text-xl text-fuchsia-400">
              Waiting for bids to your product!
            </p>
          </div>
        )}
        {!user && (
          <div>
            <p className="text-xl flex gap-3 items-center mb-5">
              <QuestionMarkCircleIcon className="w-6" />
              <span>Do you wanna get in touch with the seller?</span>
            </p>
            <div className="flex gap-1 items-center">
              <Link to={"/login"}>
                <button className="p-1 bg-cyan-600 text-white rounded-md">
                  Login
                </button>
              </Link>
              <span>OR</span>
              <Link to={"/register"}>
                <button className="p-1 bg-tremor-brand text-white rounded-md">
                  Register
                </button>
              </Link>
              to bid this item
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;

// formatDistanceToNow(new Date(product.usagePeriod));
