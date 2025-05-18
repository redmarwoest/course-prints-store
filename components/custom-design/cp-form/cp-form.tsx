"use client";
import {
  Autocomplete,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTime } from "luxon";
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import styles from "../../../app/styles/ui-components/cp-form.module.scss";

import {
  basicColors,
  brownColors,
  darkBlueColors,
  greenColors,
  lightBlueColors,
} from "../../../constants/cp-color-scheme/cp-color-scheme";
import {
  fetchClubDetails,
  fetchClubNames,
} from "../../../services/club-service";

import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import { useProduct } from "components/product/product-context";
import { VariantSelectorForm } from "components/product/variant-selector-form";
import { Product, ProductVariant } from "lib/shopify/types";
import { ClubOption, FormData, GolfClub } from "../../../app/types/types";
import { usePosterContext } from "../../../components/custom-design/poster-context";
import CpSelectedClub from "../cp-form-components/cp-selected-club/cp-selected-club";

const sizePrices: Record<string, number> = {
  "21 x 29.7 cm": 29.95,
  "30 x 40 cm": 39.95,
  "40 x 50 cm": 49.95,
  "50 x 70 cm": 59.95,
};

const framePrice = 19.95;

const colorSchemes = [
  { name: "basic", color: basicColors.backgroundColor },
  { name: "lightBlue", color: lightBlueColors.backgroundColor },
  { name: "green", color: greenColors.backgroundColor },
  { name: "darkBlue", color: darkBlueColors.backgroundColor },
  { name: "brown", color: brownColors.backgroundColor },
];

const CpForm = ({
  onChange,
  defaultValues,
  product,
}: {
  onChange: (data: FormData) => void;
  defaultValues: FormData;
  product?: Product | undefined;
}) => {
  const { watch, setValue, getValues, reset } = useForm<FormData>({
    defaultValues: {
      title: defaultValues.title ?? "Course Name",
      subTitle: defaultValues.subTitle ?? "Location",
      isHorizontal: defaultValues.isHorizontal ?? true,
      wallRender: defaultValues.wallRender ?? false,
      quantity: defaultValues.quantity ?? 1,
      price: defaultValues.price ?? 29.95,
      date: defaultValues.date ?? null,
      showCustomTitle: defaultValues.showCustomTitle ?? false,
      showDate: defaultValues.showDate ?? false,
      selectedSize: defaultValues.selectedSize ?? "21 x 29.7 cm",
      isLoadingClub: defaultValues.isLoadingClub ?? false,
      isAddingToCart: defaultValues.isAddingToCart ?? false,
      colorScheme: defaultValues.colorScheme ?? "basic",
      hasFrame: defaultValues.hasFrame ?? false,
    },
  });

  const [options, setOptions] = useState<ClubOption[]>([]);
  const [selectedClub, setSelectedClub] = useState<GolfClub | null>(null);
  const [clubSearchTerm, setClubSearchTerm] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const { addPoster } = usePosterContext();
  const { addCartItem } = useCart();
  const [message, formAction] = useActionState(addItem, null);
  const { state } = useProduct();

  const updateFormData = useCallback(
    (updates: Partial<FormData>) => {
      const currentValues = getValues();
      const newValues = { ...currentValues, ...updates };

      Object.entries(updates).forEach(([key, value]) => {
        setValue(key as keyof FormData, value);
      });

      onChange(newValues);
    },
    [getValues, onChange, setValue]
  );

  const handleClubSearch = useCallback(async (search?: string) => {
    const clubs = await fetchClubNames(search);
    setOptions(clubs);
  }, []);

  useEffect(() => {
    handleClubSearch();
  }, [handleClubSearch]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (clubSearchTerm) {
        handleClubSearch(clubSearchTerm);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [clubSearchTerm, handleClubSearch]);

  useEffect(() => {
    const basePrice =
      sizePrices[watch("selectedSize") as keyof typeof sizePrices] ?? 0;
    const frameCost = watch("hasFrame") ? framePrice : 0;
    const totalPrice = (basePrice + frameCost) * watch("quantity");
    setTotalPrice(totalPrice);
    updateFormData({ price: basePrice + frameCost });
  }, [
    watch("selectedSize"),
    watch("quantity"),
    watch("hasFrame"),
    updateFormData,
  ]);

  const handleClubSelect = async (clubID: string) => {
    updateFormData({ isLoadingClub: true });
    setSelectedClub(null);

    const club = await fetchClubDetails(clubID);
    updateFormData({ isLoadingClub: false });

    if (!club) return;

    const coursesWithPars = club.courses.map((course) => ({
      ...course,
      scoreCard: course.scoreCard,
    }));

    setSelectedClub({ ...club, courses: coursesWithPars });

    updateFormData({
      title: club.clubName,
      subTitle: `${club.city}, ${club.state} ${club.country}`,
      courses: coursesWithPars,
      selectedCourseIndex: 0,
      latitude: club.latitude ?? 0,
      longitude: club.longitude ?? 0,
      selectedCourseMap: club.courses[0]?.svgMap ?? "",
      showScorecard: false,
    });
  };

  const handleCourseSelect = (index: number) => {
    if (!selectedClub?.courses) return;
    updateFormData({
      selectedCourseIndex: index,
      selectedCourseMap: selectedClub.courses[index]?.svgMap ?? "",
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(1, newQuantity);
    updateFormData({ quantity: validQuantity });
  };

  const handleDateChange = (newDate: DateTime | null) => {
    updateFormData({
      date: newDate,
      underTitle: newDate?.toFormat("MMMM d, yyyy") ?? "",
    });
  };

  const handleAddToCart = async () => {
    if (!selectedClub) return;

    updateFormData({ isAddingToCart: true });
    try {
      const canvasElement = document.querySelector(
        "#canvas-element"
      ) as HTMLElement;
      if (!canvasElement) {
        throw new Error("Canvas element not found");
      }

      // Use html2canvas to capture the canvas content
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(canvasElement, {
        backgroundColor: null,
        scale: 2,
      });

      const canvasImage = canvas.toDataURL("image/png");

      const posterData = {
        ...getValues(),
        clubID: selectedClub.clubID,
        clubName: selectedClub.clubName,
        courseName:
          selectedClub.courses[watch("selectedCourseIndex") || 0]?.courseName ||
          "",
        canvasImage,
      };

      const variant = product?.variants.find((variant: ProductVariant) =>
        variant.selectedOptions.every(
          (option) => option.value === state[option.name.toLowerCase()]
        )
      );

      console.log(variant);

      const defaultVariantId =
        product?.variants.length === 1 ? product?.variants[0]?.id : undefined;
      const selectedVariantId = variant?.id || defaultVariantId;
      const finalVariante = product?.variants.find(
        (variant) => variant.id === selectedVariantId
      )!;
      const addItemAction = formAction.bind(null, selectedVariantId);

      addPoster(posterData);
      startTransition(() => {
        if (product) {
          addCartItem(finalVariante, product);
          addItemAction();
        }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      updateFormData({ isAddingToCart: false });
    }
  };

  return (
    <form className={styles["cp-form"]}>
      <div className={styles["cp-form__inner"]}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.clubName || ""}
          isOptionEqualToValue={(option, value) =>
            option.clubID === value.clubID
          }
          inputValue={clubSearchTerm}
          onInputChange={(_, newVal) => {
            setClubSearchTerm(newVal);
            if (!newVal) {
              reset();
              setSelectedClub(null);
              updateFormData({
                title: "Course Name",
                subTitle: "Location",
                courses: [],
                selectedCourseIndex: 0,
                colorScheme: "basic",
                latitude: "0",
                longitude: "0",
                selectedCourseMap: undefined,
                showScorecard: false,
                price: 0,
              });
            }
          }}
          onChange={(_, newVal) => {
            if (newVal?.clubID) handleClubSelect(newVal.clubID);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search golf course..."
              className="cp-input"
            />
          )}
        />

        {watch("isLoadingClub") && (
          <div className={styles["cp-form__loader"]}>
            <div className={styles["cp-form__loader-spinner"]} />
            <div className={styles["cp-form__loader-text"]}>
              Loading course details...
            </div>
          </div>
        )}

        {selectedClub && !watch("isLoadingClub") && (
          <>
            <CpSelectedClub
              selectedClub={selectedClub}
              selectedCourseIndex={watch("selectedCourseIndex") || 0}
              handleCourseSelect={handleCourseSelect}
              updateFormData={updateFormData}
            />

            <FormControlLabel
              className="cp-toggle"
              control={
                <Switch
                  checked={watch("showCustomTitle")}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    updateFormData({ showCustomTitle: checked });
                    if (!checked) {
                      updateFormData({
                        title: selectedClub.clubName,
                        subTitle: `${selectedClub.city}, ${selectedClub.state} ${selectedClub.country}`,
                      });
                    }
                  }}
                />
              }
              label="Custom title and location"
              labelPlacement="start"
            />

            {watch("showCustomTitle") && (
              <>
                <TextField
                  fullWidth
                  label="Custom Title"
                  value={watch("title")}
                  onChange={(e) => updateFormData({ title: e.target.value })}
                  className="cp-input"
                />
                <TextField
                  fullWidth
                  label="Custom Location"
                  value={watch("subTitle")}
                  onChange={(e) => updateFormData({ subTitle: e.target.value })}
                  className="cp-input"
                />
              </>
            )}

            <FormControlLabel
              className="cp-toggle"
              control={
                <Switch
                  checked={watch("showDate")}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    updateFormData({ showDate: checked });
                    if (!checked) {
                      updateFormData({ date: null, underTitle: "" });
                    }
                  }}
                />
              }
              label="Add date of visit"
              labelPlacement="start"
            />

            {watch("showDate") && (
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DatePicker
                  label="Select Date"
                  value={watch("date")}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      className: "cp-input",
                    },
                  }}
                />
              </LocalizationProvider>
            )}

            <FormControlLabel
              className="cp-toggle"
              control={
                <Switch
                  checked={watch("isHorizontal")}
                  onChange={(e) =>
                    updateFormData({ isHorizontal: e.target.checked })
                  }
                />
              }
              label={
                <span>
                  Orientation:{" "}
                  <strong>
                    {watch("isHorizontal") ? "Horizontal" : "Vertical"}
                  </strong>
                </span>
              }
              labelPlacement="start"
            />

            <FormControlLabel
              className="cp-toggle"
              control={
                <Switch
                  checked={watch("wallRender")}
                  onChange={(e) =>
                    updateFormData({ wallRender: e.target.checked })
                  }
                />
              }
              label="See poster on wall"
              labelPlacement="start"
            />
            <VariantSelectorForm
              options={product?.options ?? []}
              variants={product?.variants ?? []}
            />

            <div className="cp-button__container">
              <label>Select Color:</label>
              <div className={styles["color-options"]}>
                {colorSchemes.map(({ name, color }) => (
                  <button
                    key={name}
                    onClick={() => {
                      updateFormData({
                        colorScheme: name,
                      });
                    }}
                    type="button"
                    className={`${styles["color-button"]} ${
                      name === watch("colorScheme")
                        ? styles["color-button--active"]
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    title={name}
                  />
                ))}
              </div>
            </div>

            <div className="cp-button__container">
              <label>Select size:</label>
              <div className="mt-12">
                {Object.keys(sizePrices).map((sizeOption) => (
                  <button
                    key={sizeOption}
                    onClick={() => {
                      updateFormData({
                        selectedSize: sizeOption,
                      });
                    }}
                    type="button"
                    className={`cp-button mr-8 mb-8 ${
                      watch("selectedSize") === sizeOption
                        ? "cp-button__active"
                        : ""
                    }`}
                  >
                    {sizeOption}
                  </button>
                ))}
              </div>
            </div>

            <div className="cp-button__container">
              <label>Frame Options:</label>
              <div className="mt-12">
                <button
                  onClick={() => updateFormData({ hasFrame: false })}
                  type="button"
                  className={`cp-button mr-8 mb-8 ${
                    !watch("hasFrame") ? "cp-button__active" : ""
                  }`}
                >
                  No Frame
                </button>
                <button
                  onClick={() => updateFormData({ hasFrame: true })}
                  type="button"
                  className={`cp-button mr-8 mb-8 ${
                    watch("hasFrame") ? "cp-button__active" : ""
                  }`}
                >
                  With Frame
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles["cp-form__bottom"]}>
        <div className={styles["cp-form__bottom--top"]}>
          <div className={styles["cp-form__bottom--counter"]}>
            <button
              type="button"
              className="cp-button"
              onClick={() => handleQuantityChange(watch("quantity") - 1)}
            >
              -
            </button>
            <input
              type="number"
              value={watch("quantity")}
              onChange={(e) =>
                handleQuantityChange(parseInt(e.target.value, 10) || 1)
              }
            />
            <button
              type="button"
              className="cp-button"
              onClick={() => handleQuantityChange(watch("quantity") + 1)}
            >
              +
            </button>
          </div>

          <div className={styles["cp-form__bottom--price"]}>
            € {totalPrice.toFixed(2)} <span className="small">total</span>
          </div>
        </div>
        <div className={styles["cp-form__bottom--bottom"]}>
          <button
            className={`cp-button ${selectedClub ? "cp-button__active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            disabled={!selectedClub}
          >
            {watch("isAddingToCart") ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CpForm;
