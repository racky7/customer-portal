import { useEffect, useState } from "react";
import { Customer } from "../../types/customer";
import "./customer-details.css";
import { generateRandomImages } from "../../lib/customer";

type CustomerDetailsProps = {
  customer: Customer | undefined;
};

export default function CustomerDetails({ customer }: CustomerDetailsProps) {
  const [images, setImages] = useState<{ url: string; isLoading: boolean }[]>(
    []
  );

  useEffect(() => {
    if (customer) {
      setImages(() => {
        return customer.images.map((image) => ({
          url: image,
          isLoading: true,
        }));
      });
    }
    return () => {
      setImages([]);
    };
  }, [customer]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newImages = generateRandomImages(9);
      setImages(() => {
        return newImages.map((image) => ({
          url: image,
          isLoading: true,
        }));
      });
    }, 10000);
    return () => {
      setImages([]);
      clearInterval(interval);
    };
  }, []);

  const handleImageLoad = (currentIndex: number) => {
    setImages((prevImages) => {
      return prevImages.map((prevImage, prevIndex) => {
        if (prevIndex === currentIndex) {
          return {
            ...prevImage,
            isLoading: false,
          };
        }
        return prevImage;
      });
    });
  };

  if (!customer) {
    return (
      <div className="no-active-customer">
        Please select a customer from the list
      </div>
    );
  }

  return (
    <div className="customer-details-area">
      <div className="customer-name">{customer.name}</div>
      <div className="customer-title">{customer.title}</div>
      <div className="customer-address">{customer.address}</div>
      <div className="customer-images">
        {images?.map((image, index) => {
          return (
            <div
              className="image-box"
              key={index}
              style={{
                background: image.isLoading ? "lightgray" : "transparent",
                animation: image.isLoading ? "pulse 2s infinite" : "none",
              }}
            >
              <img
                loading="lazy"
                src={image.url}
                alt=""
                className="single-image"
                onLoad={() => {
                  handleImageLoad(index);
                }}
                style={{
                  opacity: image.isLoading ? 0 : 1,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
