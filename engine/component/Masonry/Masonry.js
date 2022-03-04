//Inspired by this article : https://w3bits.com/css-grid-masonry/

import Image from "next/image";
import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import useGetimage from "../../hooks/file/useGetImage";

export default function Masonry({
  dir = null,
  masonry,
  remSizing = 16,
  horizontalPadding = "0",
  verticalPadding = "0",
}) {
  const [filesInfo, loading] = useGetimage(dir);
  const [imgCollection, setImgCollection] = useState([]);

  const masonryStyles = {
    gridTemplateColumns: `repeat(auto-fit , minMax(${Math.floor(
      (parseInt(masonry.width) -
        parseInt(horizontalPadding) * (remSizing * 2) -
        (masonry.column - 1) * (parseInt(masonry.gap) * 16)) /
        masonry.column
    )}px, 1fr))`,
    gridGap: `${masonry.gap ? masonry.gap : "1rem"}`,
    display: "grid",
    gridAutoRows: masonry.autoRows ? masonry.autoRows : "0",
  };

  function createGallery() {
    if (dir && dir !== null && imgCollection !== []) {
      return imgCollection.map((file, idx) => {
        //console.log("calc", file.height / file.width);
        return (
          <span key={idx} data-selector="masonry_item">
            <Image
              src={file.src}
              width={file.width}
              height={file.height}
              blurDataURL={file.blurDataURL}
              placeholder="blur"
              onClick={() => {
                handleClick(file, idx);
              }}
              alt=""
              data-selector="masonry_img"
            ></Image>
          </span>
        );
      });
    }
  }

  function resizeGridItem(item) {
    const rowGap = parseFloat(masonryStyles.gridGap);
    const rowSpan = Math.ceil(
      item
        .querySelector('[data-selector="masonry_img"]')
        .getBoundingClientRect().height /
        (remSizing * rowGap)
    );
    item.style.gridRowEnd = "span " + rowSpan;
  }

  function getAllItem() {
    if (!loading) {
      const items = document.querySelectorAll('[data-selector="masonry_item"]');
      for (const item of items) {
        resizeGridItem(item);
      }
    }
  }

  useLayoutEffect(() => {
    getAllItem();
  }, [filesInfo, masonryStyles]);

  useEffect(() => {
    window.addEventListener("resize", getAllItem, true);

    setImgCollection(filesInfo);
    return () => {
      window.removeEventListener("resize", getAllItem, true);
    };
  }, [filesInfo]);

  return (
    <>
      {!loading ? (
        <section
          style={{
            maxWidth: masonry.width ? masonry.width : "960px",
            width: "100%",
            padding: `${verticalPadding}  ${horizontalPadding}`,
          }}
        >
          <div style={masonryStyles}>{createGallery()}</div>
        </section>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
