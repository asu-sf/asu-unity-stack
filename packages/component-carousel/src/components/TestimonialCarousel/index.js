// @ts-check
import { Testimonial } from "@asu-design-system/components-core/src/components/Testimonial";
import PropTypes from "prop-types";
import React from "react";

import { BaseCarousel } from "../../core/components/BaseCarousel";

/**
 * @typedef {import('../../core/components/BaseCarousel').CarouselItem} CarouselItem
 */

/**
 * @typedef {import("@asu-design-system/components-core/src/components/Testimonial").TestimonialStyle} TestimonialStyle
 */

/**
 * @typedef {{
 *  id: number
 *  quote: {
 *    title?: string
 *    content: string
 *    cite?: {
 *       name: string
 *       description?: string
 *    }
 *  }
 *  imageSource?: string
 *  imageAltText?:string
 * }} TestimonialItem
 */

/**
 * This function creates a html template which render an image
 * @param {TestimonialItem} props
 * @param {TestimonialStyle} itemStyle
 * @returns { CarouselItem }
 */
const htmlTemplate = (
  { id, imageSource, imageAltText, quote },
  itemStyle = {}
) => ({
  id,
  item: (
    <Testimonial
      imageSource={imageSource}
      imageAltText={imageAltText}
      quote={quote}
      itemStyle={itemStyle}
    />
  ),
});

/**
 *
 * @param {{
 *    testimonialItems: TestimonialItem[]
 *    itemStyle?: TestimonialStyle
 *    maxWidth: string
 *    width?: string
 *    hasPositionIndicators?: boolean
 *    hasNavButtons?: boolean
 *    imageAutoSize?: boolean
 *  }} props
 * @returns { JSX.Element }
 */
const TestimonialCarousel = ({
  width,
  maxWidth,
  testimonialItems,
  itemStyle = {},
  hasNavButtons = false,
  hasPositionIndicators = false,
  imageAutoSize = true,
}) => {
  const carouselItems = testimonialItems.map(item =>
    htmlTemplate(item, itemStyle)
  );

  return (
    <BaseCarousel
      perView={1}
      maxWidth={maxWidth}
      width={width}
      carouselItems={carouselItems}
      isFullWidth
      removeSideBackground
      hasNavButtons={hasNavButtons}
      hasPositionIndicators={hasPositionIndicators}
      imageAutoSize={imageAutoSize}
      hasPeek={false}
      hasShadow={false}
    />
  );
};

TestimonialCarousel.propTypes = {
  testimonialItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      cite: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      }),
    })
  ).isRequired,
  itemStyle: PropTypes.shape({
    containerCssClass: PropTypes.arrayOf(PropTypes.string),
    titleCssClass: PropTypes.arrayOf(PropTypes.string),
    contentCssClass: PropTypes.arrayOf(PropTypes.string),
  }),
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  imageAutoSize: PropTypes.bool,
  hasNavButtons: PropTypes.bool,
  hasPositionIndicators: PropTypes.bool,
};

export { TestimonialCarousel };
