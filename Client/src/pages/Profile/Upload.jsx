import React, { useEffect, useState } from "react";
import {
  CloseCircleOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Space, message } from "antd";
import {
  upload,
  getProductImages,
  deleteSavedImages,
} from "../../API/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/Slices/loaderSlice";
const Upload = ({ editProductId, setActiveTapKey }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state) => state.user.loader);
  const getImages = async () => {
    try {
      const response = await getProductImages(editProductId);
      if (!response.isSuccess) {
        throw new Error("There is no images you have uploaded");
      } else {
        setOldImages(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);
  // to handle the state changing of files selection
  const onChangeHandler = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);

    const previewImages = filesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setImages((prev) => prev.concat(...filesArray));
    setPreviewImages((prev) => prev.concat(...previewImages));
  };
  // to handle deleting the unfavoured image
  const imageDeleteHandler = (image) => {
    const indextoDelete = previewImages.findIndex((img) => img === image);
    if (indextoDelete !== -1) {
      const updatedImages = [...images];
      updatedImages.splice(indextoDelete, 1);

      setPreviewImages((prevImg) => prevImg.filter((img) => img !== image));
      setImages(updatedImages);
      console.log(images);
      console.log(previewImages);
      URL.revokeObjectURL(image);
    }
  };

  // to handle deleting the saved product image
  const savedImageDeleteHandler = async (img) => {
    setOldImages((prev) => prev.filter((i) => i !== img));
    try {
      const response = await deleteSavedImages({
        product_id: editProductId,
        imageToDelete: img,
      });
      if (!response?.isSuccess) {
        throw new Error("Something went wrong deleting the image");
      } else {
        message.success(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  // to handle uploading images to the server
  const uploadImagesHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoader(true));
    if (previewImages.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < images.length; i++) {
        formData.append("product_images", images[i]);
      }
      formData.append("product_id", editProductId);
      try {
        const response = await upload(formData);
        if (response.isSuccess) {
          message.success(response.message);
          setActiveTapKey("1");
        }
      } catch (error) {
        console.log(error);
        message.error(error.message);
      }
    }
    dispatch(setLoader(false));
  };
  return (
    <section>
      <h1 className="text-2xl  font-bold mb-5">Upload your product's images</h1>
      <div className="mb-10">
        {oldImages.length > 0 && (
          <>
            <h2 className="font-medium mb-3 text-orange-600">
              Images that you have already uploaded!
            </h2>
            <div className="flex flex-row gap-5 m flex-wrap">
              {oldImages.map((img) => (
                <div className="basis-1/4 relative h-20 " key={img}>
                  <img
                    src={img}
                    className="h-full w-full  rounded-md object-cover opacity-75"
                    alt={"Product Image"}
                  />
                  <CloseCircleOutlined
                    className="cursor-pointer absolute left-[50%] top-1/3 translate-x-[-50%] text-2xl"
                    onClick={() => savedImageDeleteHandler(img)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={uploadImagesHandler}
      >
        <label
          className="text-base w-fit cursor-pointer border-2 border-dashed border-stone-600 p-4 flex gap-2 items-center justify-start"
          htmlFor="image"
        >
          <PlusOutlined />
          <span>upload</span>
        </label>
        <input
          name="product_images"
          type="file"
          id="image"
          hidden
          multiple
          accept="image/png,image/jpg,image/jpeg"
          onChange={onChangeHandler}
        />

        {previewImages.length > 0 && (
          <>
            <div className="flex flex-row gap-5 flex-wrap  mt-7">
              {previewImages.map((img, index) => (
                <div className="basis-1/4 relative h-20 " key={index}>
                  <img
                    src={img}
                    className="h-full w-full  rounded-md object-cover opacity-75"
                    alt={index}
                  />
                  <CloseCircleOutlined
                    className="cursor-pointer absolute left-[50%] top-1/3 translate-x-[-50%] text-2xl"
                    onClick={() => imageDeleteHandler(img)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        <button
          className="p-3 bg-gray-600 text-white mt-5 rounded-md"
          type="submit"
          disabled={isProcessing}
        >
          <span>Upload Images</span>{" "}
          {isProcessing && (
            <Space>
              <SyncOutlined spin />
            </Space>
          )}
        </button>
      </form>
    </section>
  );
};

export default Upload;
