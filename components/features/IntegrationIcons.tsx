import React from "react";

interface IconProps {
  className?: string;
}

// ```
//  shein
// - zepto
// - flipkart
// - big basket
// - ola
// - shopify
// - optimizely
// - blinkit
// - swiggy
// - walmart
// - uber
// - airbnb
// - doodash
// - costco
// - instacart
// - amazon
// - aws
// - unicommece
// - google analytics
// - commerceIQ
// - whole foods market
// ```

export const IntegrationIcons = {
  shein: ({ className }: IconProps) => (
    <img
      src="/shein.png"
      alt="shein"
      className={className}
      width={100}
      height={100}
    />
  ),
  amazon: ({ className }: IconProps) => (
    <img
      src="/amazon.png"
      alt="amazon"
      className={className}
      width={100}
      height={100}
    />
  ),
  zepto: ({ className }: IconProps) => (
    <img
      src="/zepto.png"
      alt="zepto"
      className={className}
      width={100}
      height={100}
    />
  ),
  flipkart: ({ className }: IconProps) => (
    <img
      src="/flipkart.png"
      alt="flipkart"
      className={className}
      width={100}
      height={100}
    />
  ),
  ola: ({ className }: IconProps) => (
    <img
      src="/ola.png"
      alt="ola"
      className={className}
      width={100}
      height={100}
    />
  ),
  shopify: ({ className }: IconProps) => (
    <img
      src="/shopify.png"
      alt="shopify"
      className={className}
      width={100}
      height={100}
    />
  ),
  optimizely: ({ className }: IconProps) => (
    <img
      src="/optimizely.png"
      alt="optimizely"
      className={className}
      width={100}
      height={100}
    />
  ),
  blinkit: ({ className }: IconProps) => (
    <img
      src="/blinkit.jpeg"
      alt="blinkit"
      className={className}
      width={100}
      height={100}
    />
  ),
  swiggy: ({ className }: IconProps) => (
    <img
      src="/swiggy.png"
      alt="swiggy"
      className={className}
      width={100}
      height={100}
    />
  ),
  walmart: ({ className }: IconProps) => (
    <img
      src="/walmart.jpeg"
      alt="walmart"
      className={className}
      width={100}
      height={100}
    />
  ),
  uber: ({ className }: IconProps) => (
    <img
      src="/uber.jpeg"
      alt="uber"
      className={className}
      width={100}
      height={100}
    />
  ),
  airbnb: ({ className }: IconProps) => (
    <img
      src="/airbnb.png"
      alt="airbnb"
      className={className}
      width={100}
      height={100}
    />
  ),
  costco: ({ className }: IconProps) => (
    <img
      src="/costco.png"
      alt="costco"
      className={className}
      width={100}
      height={100}
    />
  ),
  instacart: ({ className }: IconProps) => (
    <img
      src="/instacart.png"
      alt="instacart"
      className={className}
      width={100}
      height={100}
    />
  ),
  googleanalytics: ({ className }: IconProps) => (
    <img
      src="/google_analytics.png"
      alt="googleanalytics"
      className={className}
      width={100}
      height={100}
    />
  ),
  commerceiq: ({ className }: IconProps) => (
    <img
      src="/commerceIQ.png"
      alt="commerceiq"
      className={className}
      width={100}
      height={100}
    />
  ),
  wholefoods: ({ className }: IconProps) => (
    <img
      src="/whole_foods_markket.jpeg"
      alt="wholefoods"
      className={className}
      width={100}
      height={100}
    />
  ),
  doordash: ({ className }: IconProps) => (
    <img
      src="/doordash.png"
      alt="doordash"
      className={className}
      width={100}
      height={100}
    />
  ),
};
