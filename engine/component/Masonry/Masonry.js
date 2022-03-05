//Inspired by this article : https://w3bits.com/css-grid-masonry/

import Image from "next/image";
import React, { useEffect } from "react";
import useGetimage from "../../hooks/file/useGetImage";

/**
 *
 * @param {String} dir //path of files to display in the /public folder
 * @param {Object} masonry //Rules css for construct the masonry grid
 * @param {Number} remSizing // Default font-size css
 * @param {Number} horizontalPadding // Left and Right padding for the masonry container
 * @param {Number} verticalPadding // Top and Bottom padding for the masonry
 *
 */

export default function Masonry({
  dir = null,
  masonry,
  remSizing = 16,
  horizontalPadding = "0",
  verticalPadding = "0",
}) {
  const [filesInfo, loading] = useGetimage(dir);

  const masonryStyles = {
    gridTemplateColumns: `repeat(auto-fit , minMax(${Math.floor(
      (parseInt(masonry.width) -
        parseInt(horizontalPadding) * remSizing * 2 -
        (masonry.column - 1) * parseFloat(masonry.gap) * remSizing) /
        masonry.column
    )}px, 1fr))`,
    gridGap: `${masonry.gap ? masonry.gap : "1rem"}`,
    display: "grid",
    gridAutoRows: masonry.autoRows ? masonry.autoRows : "0",
    width: masonry.width
      ? `calc(${masonry.width} - ${masonry.gridGap})`
      : `calc(960px - ${masonry.gridGap})`,
  };

  function createGallery() {
    if (dir && dir !== null && filesInfo !== []) {
      return filesInfo.map((file, idx) => {
        //console.log("calc", file.height / file.width);
        return (
          <span
            key={idx}
            data-selector="masonry_item"
            style={{ overflow: "hidden" }}
          >
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

  function getItems() {
    if (!loading) {
      const items = document.querySelectorAll('[data-selector="masonry_item"]');
      for (const item of items) {
        resizeGridItem(item);
      }
    }
  }

  useEffect(() => {
    getItems();
    window.addEventListener("resize", getItems, true);

    return () => {
      getItems();
      window.removeEventListener("resize", getItems, true);
    };
  }, [filesInfo, masonryStyles]);

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
