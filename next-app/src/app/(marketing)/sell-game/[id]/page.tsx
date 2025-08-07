// "use client";


// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { useForm, SubmitHandler } from "react-hook-form";
// import axios from "../../../../../utils/axios";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Image from 'next/image';


// type GameField = {
//   id: number;
//   label: string;
//   type: "text" | "number";
//   icon?: string;
//   required?: boolean;
// };

// interface IFormValues {
//   [key: string]: string | number | FileList | undefined;
// }

// const GameForm = () => {
//   const { id } = useParams();
//   const [fields, setFields] = useState<GameField[]>([]);
//   const [gameName, setGameName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [fetchError, setFetchError] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState("");
//   const [submitError, setSubmitError] = useState("");

//     type FormData = yup.InferType<typeof validationSchema>;


//   const validationSchema = React.useMemo(() => {
//     const shape: { [key: string]: yup.AnySchema } = {};




//     fields.forEach((field) => {
//       let validator =
//         field.type === "number"
//           ? yup.number().typeError("Must be a number")
//           : yup.string();

//       if (field.required !== false) {
//         validator = validator.required("This field is required");
//       }
//       shape[field.label] = validator;
//     });

//     // Price validation
//     shape["price"] = yup
//       .number()
//       .typeError("Price must be a number")
//       .required("Price is required");

//     // File validation for images (max 5MB, jpeg/png/jpg formats)
//     const fileSchema = yup
//       .mixed()
//       .test("fileSize", "Image too large (max 5MB)", (value) => {
//         if (!value) return true;
//         if (!(value instanceof FileList)) return false;
//         return value.length === 0 || value[0]?.size <= 5 * 1024 * 1024;
//       })
//       .test("fileFormat", "Unsupported format (jpeg, jpg, png only)", (value) => {
//         if (!value) return true;
//         if (!(value instanceof FileList)) return false;
//         return (
//           value.length === 0 ||
//           ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type)
//         );
//       });

//     shape["image1"] = fileSchema.required("Image 1 is required");
//     shape["image2"] = fileSchema.required("Image 2 is required");
//     shape["image3"] = fileSchema.required("Image 3 is required");

//     return yup.object().shape(shape);
//   }, [fields]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     watch,
//   } = useForm<IFormValues>({
//     resolver: yupResolver(validationSchema),
//     mode: "onBlur",
//   });



//   // Fetch dynamic fields and game name on mount
//   useEffect(() => {
//     const fetchFields = async () => {
//       setFetchError("");
//       setLoading(true);
//       try {
//         const [{ data: fieldData }, { data: gamesData }] = await Promise.all([
//           axios.get(`/api/games/${id}/fields`),
//           axios.get(`/api/games`),
//         ]);
//         const dynamicFields = fieldData.fields || [];
//         setFields(dynamicFields);

//         const game = (gamesData.games || []).find((g:FormData ) => g.id == id);
//         if (game) setGameName(game.name);
//       } catch {
//         setFetchError("Failed to fetch form definitions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFields();
//   }, [id]);

//   // Submit handler: build FormData properly
//  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
//   setSubmitError("");
//   setSubmitSuccess("");

//   try {
//     const formData = new FormData();

//     // Add dynamic fields (key = game_field_id, value = value)
//     fields.forEach((field) => {
//       const value = data[field.label];
//       if (value !== undefined && !(value instanceof FileList)) {
//         formData.append(String(field.id), String(value));
//       }
//     });

//     // Append static fields
//     formData.append("price", String(data.price));
//     formData.append("game_id", String(id)); // Required by backend
//     formData.append("status", "active"); // You can make this dynamic if needed

//     // Append images
//     (["image1", "image2", "image3"] as const).forEach((imgKey) => {
//       const fileList = data[imgKey];
//       if (fileList instanceof FileList && fileList.length > 0) {
//         formData.append(imgKey, fileList[0]);
//       }
//     });

//     // Submit to backend
//     await axios.post(`/api/games/${id}/submit`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     setSubmitSuccess("Game details submitted successfully!");
//     reset();
//   } catch  {
//       // const error = err as AxiosError<{ message?: string }>;

//     setSubmitError("Failed to submit game details. Please try again.");
//   }
// };


//   // Render image preview helper
//   const renderPreview = (fileList: FileList | undefined) => {
//     if (fileList && fileList.length > 0) {
//       const url = URL.createObjectURL(fileList[0]);
//       return (
//         <Image
//           src={url}
//           alt="preview"
//           className="mt-2 max-h-36 rounded border border-blue-500 object-contain shadow-glow"
//           onLoad={() => URL.revokeObjectURL(url)}
//         />
//       );
//     }
//     return null;
//   };

//   return (
  

//      <div
//     className="max-w-auto mx-auto p-8 rounded-3xl shadow-xl border-blue-700 relative overflow-hidden"
//     style={{ backgroundColor: "rgb(33, 37, 41)" }}
//   >
//     <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-6 drop-shadow-glow gaming-font select-none">
//       {gameName ? `🎮 List your game: ${gameName}` : "Loading game..."}
//     </h1>
//     <p className="text-sm text-blue-300 mb-8 tracking-wide">
//       Fill in the details below to list your game for sale.
//     </p>

//     {/* Error/success messages */}
//     {fetchError && (
//       <div className="mb-6 text-sm text-red-400 bg-red-900/70 border border-red-600 px-4 py-2 rounded-lg font-semibold shadow-glow-red">
//         {fetchError}
//       </div>
//     )}
//     {submitSuccess && (
//       <div className="mb-6 text-sm text-green-400 bg-green-900/70 border border-green-600 px-4 py-2 rounded-lg font-semibold shadow-glow-green">
//         {submitSuccess}
//       </div>
//     )}
//     {submitError && (
//       <div className="mb-6 text-sm text-red-400 bg-red-900/70 border border-red-600 px-4 py-2 rounded-lg font-semibold shadow-glow-red">
//         {submitError}
//       </div>
//     )}

//     {loading ? (
//       <div className="animate-pulse text-center py-20 text-blue-600 text-lg font-semibold">
//         Loading form fields...
//       </div>
//     ) : (
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
//         {/* Dynamic fields except images and price */}
//         {fields
//           .filter((field) => !["image1", "image2", "image3", "price"].includes(field.label))
//           .map((field) => (
//             <div key={field.id}>
//               <label className=" text-blue-300 font-semibold mb-4 gaming-font select-none flex items-center gap-3">
//                 {/* Icon or fallback */}
//                 <span className="block h-16 w-16">
//                   {field.icon ? (
//                     <Image
//                     height={600} width={600} 
//                       src={`http://localhost:8000/storage/${field.icon}`}
//                       alt={field?.label}
//                       className="h-16 w-16 object-cover rounded border border-gray-500 shadow"
//                     />
//                   ) : (
//                     <div className="h-16 w-16 flex items-center justify-center text-blue-400 bg-gray-800 rounded border border-gray-500 shadow">
//                       <FontAwesomeIcon icon={faStar} className="text-xl" />
//                     </div>
//                   )}
//                 </span>
//                 {field.label}
//                 {field.required !== false && (
//                   <span className="text-gray-900 ml-1">*</span>
//                 )}
//               </label>
//               <input
//                 type={field.type}
//                 {...register(field.label)}
//                 min={field.type === "number" ? 0 : undefined}
//                 autoComplete="off"
//                 placeholder={`Enter ${field.label}`}
//                 className={`w-full px-4 py-2 rounded-xl bg-gray-900 text-blue-300 border-2 border-blue-700
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 shadow-glow
//                   transition-colors duration-300 ${
//                     errors[field.label]
//                       ? "border-grat-600 bg-gray-900 focus:ring-gray-400 focus:border-gray-500"
//                       : ""
//                   }`}
//                 spellCheck={false}
//                 autoCorrect="off"
//                 autoCapitalize="none"
//               />
//               {errors[field.label] && (
//                 <p className="text-sm text-gray-500 mt-1 font-semibold">
//                   {errors[field.label]?.message as string}
//                 </p>
//               )}
//             </div>
//           ))}

//         {/* Price field */}
//         <div>
//           <label className="block text-blue-400 font-bold mb-1 gaming-font select-none">
//             💲 Price
//             <span className="text-gray-500 ml-1">*</span>
//           </label>
//           <input
//             type="number"
//             step="any"
//             min={0}
//             {...register("price")}
//             placeholder="Enter price (INR)"
//             className={`w-full px-4 py-3 rounded-2xl bg-gray-900 text-blue-300 border-2 border-blue-700
//               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 shadow-glow
//               transition-colors duration-300 ${
//                 errors.price
//                   ? "border-gray-600 bg-gray-900 focus:ring-gray-400 focus:border-gray-500"
//                   : ""
//               }`}
//             spellCheck={false}
//             autoCorrect="off"
//             autoCapitalize="none"
//           />
//           {errors.price && (
//             <p className="text-sm text-gray-500 mt-1 font-semibold">
//               {errors.price.message as string}
//             </p>
//           )}
//         </div>

//         {/* Image Inputs */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//           {["image1", "image2", "image3"].map((key) => (
//             <div key={key}>
//               <label className="block text-blue-400 mb-1 font-semibold gaming-font select-none">
//                 {key.replace("image", "Image ")}
//                 <span className="text-gray-500 ml-1">*</span>
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 {...register(key)}
//                 className={`w-full px-3 py-2 rounded-md bg-gray-900 text-blue-300 border-2 border-blue-700
//                   cursor-pointer shadow-glow transition-colors duration-300
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
//                   ${
//                     errors[key]
//                       ? "border-gray-600 bg-gray-900 focus:ring-gray-400 focus:border-gray-500"
//                       : ""
//                   }`}
//               />
//               {errors[key] && (
//                 <p className="text-sm text-gray-500 mt-1 font-semibold">
//                   {errors[key]?.message as string}
//                 </p>
//               )}
//               {renderPreview(watch(key) as FileList | undefined)}
//             </div>
//           ))}
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between items-center pt-6">
//           <button
//             type="button"
//             onClick={() => history.back()}
//             className="px-6 py-2 text-gray-300 bg-gray-800 rounded-xl font-semibold shadow hover:bg-gray-700 transition transform hover:-translate-y-0.5"
//           >
//             Back
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-8 py-3 font-extrabold text-lg rounded-2xl bg-gradient-to-r from-gray-600 via-gray-700 to-blue-600 text-white shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-glow"
//           >
//             {isSubmitting ? "Submitting..." : "Submit Listing"}
//           </button>
//         </div>
//       </form>
//     )}
//   </div>

//   );
// };

// export default GameForm;


"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z, ZodType, ZodObject, ZodRawShape, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../../../../utils/axios";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';

// 1. TYPES ---------------------------
type GameField = {
  id: number;
  label: string;
  type: "text" | "number";
  icon?: string;
  required?: boolean;
};

const imageKeys = ["image1", "image2", "image3"] as const;
type ImageKey = typeof imageKeys[number];

interface IFormValues {
  [key: string]: string | number | FileList | undefined;
}

// 2. Utility to build Zod schema for any field array + statics



export function buildSchema(fields: GameField[]) {
  const shape: ZodRawShape = {};

  // Dynamic fields
  fields.forEach((field) => {
    let validator: ZodType<any>;

    if (field.type === "number") {
      validator = z.preprocess(
        (v) => (typeof v === "string" && v !== "" ? parseFloat(v) : v),
        z
          .number()
          .refine((val) => !isNaN(val), { message: "Must be a number" })
      );
    } else {
      validator = z.string();
    }

    if (field.required !== false) {
      validator = validator.refine(
        (val) => val !== undefined && val !== "",
        { message: "This field is required" }
      );
    } else {
      validator = validator.optional();
    }

    // Cast shape so it's writable
    (shape as any)[field.label] = validator;
  });

  // Static: price
  (shape as any).price = z.preprocess(
    (v) => (typeof v === "string" && v !== "" ? parseFloat(v) : v),
    z
      .number()
      .min(0, { message: "Price is required" })
      .refine((val) => !isNaN(val), { message: "Price must be a number" })
  );

  // Static: image uploads
  const fileSchema = z
    .custom<FileList>(
      (val) => {
        if (!(val instanceof FileList)) return false;
        if (val.length === 0) return false;
        const file = val[0];
        if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) return false;
        if (file.size > 5 * 1024 * 1024) return false;
        return true;
      },
      { message: "Required image (jpeg/jpg/png, max 5MB)" }
    );

  const imageKeys = ["primary_image", "secondary_image"]; // Replace with your actual keys

  for (const key of imageKeys) {
    (shape as any)[key] = fileSchema;
  }

  return z.object(shape);
}

// 3. REACT COMPONENT --------------------------
const GameForm = () => {
  const { id } = useParams();
  const [fields, setFields] = useState<GameField[]>([]);
  const [gameName, setGameName] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Always build latest Zod schema based on fields
  const formSchema = React.useMemo(() => buildSchema(fields), [fields]);
type IFormValuess = z.infer<ReturnType<typeof buildSchema>>;

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   reset,
  //   watch,
  // } = useForm({
  //   resolver: zodResolver(formSchema),
  //   mode: "onBlur",
  // });


  const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
  watch,
} = useForm<IFormValuess>({
  resolver: zodResolver(formSchema),
  mode: "onBlur",
});


  


  // Fetch dynamic fields & game info
  useEffect(() => {
    const fetchFields = async () => {
      setFetchError("");
      setLoading(true);
      try {
        const [{ data: fieldData }, { data: gamesData }] = await Promise.all([
          axios.get(`/api/games/${id}/fields`),
          axios.get(`/api/games`),
        ]);
        setFields(fieldData.fields || []);
        const game = (gamesData.games || []).find((g: any) => String(g.id) === String(id));
        if (game && game.name) setGameName(game.name);
      } catch {
        setFetchError("Failed to fetch form definitions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, [id]);

  // Submit handler
  const onSubmit = async (data:IFormValuess) => {
    setSubmitError("");
    setSubmitSuccess("");
    try {
      const formData = new FormData();
      // Append dynamic fields (except static ones)
      fields
        .filter(
          (field) =>
            !imageKeys.includes(field.label as ImageKey) && field.label !== "price"
        )
        .forEach((field) => {
          const val = data[field.label];
          if (val !== undefined && typeof val !== "object") {
            formData.append(String(field.id), String(val));
          }
        });
      // Static values
      formData.append("price", String(data["price"]));
      formData.append("game_id", String(id));
      formData.append("status", "active");
      // Images
      imageKeys.forEach((key) => {
        const fileList = data[key];
        if (fileList instanceof FileList && fileList.length > 0) {
          formData.append(key, fileList[0]);
        }
      });

      await axios.post(`/api/games/${id}/submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmitSuccess("Game details submitted successfully!");
      reset();
    } catch {
      setSubmitError("Failed to submit game details. Please try again.");
    }
  };

  // Image preview helper
  const renderPreview = (fileList: FileList | undefined) => {
    if (fileList && fileList.length > 0) {
      const url = URL.createObjectURL(fileList[0]);
      return (
        <Image
          src={url}
          alt="preview"
          className="mt-2 max-h-36 rounded border border-blue-500 object-contain shadow-glow"
          onLoad={() => URL.revokeObjectURL(url)}
          width={200}
          height={200}
        />
      );
    }
    return null;
  };

  return (
    <div className="max-w-auto mx-auto p-8 rounded-3xl shadow-xl border-blue-700 relative overflow-hidden" style={{ backgroundColor: "rgb(33, 37, 41)" }}>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-6 drop-shadow-glow gaming-font select-none">
        {gameName ? `🎮 List your game: ${gameName}` : "Loading game..."}
      </h1>
      <p className="text-sm text-blue-300 mb-8 tracking-wide">
        Fill in the details below to list your game for sale.
      </p>

      {fetchError && (
        <div className="mb-6 text-sm text-red-400 bg-red-900/70 border border-red-600 px-4 py-2 rounded-lg font-semibold shadow-glow-red">
          {fetchError}
        </div>
      )}
      {submitSuccess && (
        <div className="mb-6 text-sm text-green-400 bg-green-900/70 border border-green-600 px-4 py-2 rounded-lg font-semibold shadow-glow-green">
          {submitSuccess}
        </div>
      )}
      {submitError && (
        <div className="mb-6 text-sm text-red-400 bg-red-900/70 border border-red-600 px-4 py-2 rounded-lg font-semibold shadow-glow-red">
          {submitError}
        </div>
      )}

      {loading ? (
        <div className="animate-pulse text-center py-20 text-blue-600 text-lg font-semibold">
          Loading form fields...
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Dynamic fields (except images & price) */}
          {fields
            .filter((field) => ![...imageKeys, "price"].includes(field.label as any))
            .map((field) => (
              <div key={field.id}>
                <label className="text-blue-300 font-semibold mb-4 gaming-font select-none flex items-center gap-3">
                  <span className="block h-16 w-16">
                    {field.icon ? (
                      <Image
                        height={64}
                        width={64}
                        src={`http://localhost:8000/storage/${field.icon}`}
                        alt={field?.label}
                        className="h-16 w-16 object-cover rounded border border-gray-500 shadow"
                      />
                    ) : (
                      <div className="h-16 w-16 flex items-center justify-center text-blue-400 bg-gray-800 rounded border border-gray-500 shadow">
                        <FontAwesomeIcon icon={faStar} className="text-xl" />
                      </div>
                    )}
                  </span>
                  {field.label}
                  {field.required !== false && <span className="text-gray-900 ml-1">*</span>}
                </label>
                <input
                  type={field.type}
                  {...register(field.label)}
                  min={field.type === "number" ? 0 : undefined}
                  autoComplete="off"
                  placeholder={`Enter ${field.label}`}
                  className={`w-full px-4 py-2 rounded-xl bg-gray-900 text-blue-300 border-2 border-blue-700
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 shadow-glow
                    transition-colors duration-300 ${
                      errors[field.label]?.message
                        ? "border-gray-600 bg-gray-900 focus:ring-gray-400 focus:border-gray-500"
                        : ""
                    }`}
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="none"
                />
                {errors[field.label]?.message && (
                  <p className="text-sm text-gray-500 mt-1 font-semibold">
                    {String(errors[field.label]?.message)}
                  </p>
                )}
              </div>
            ))}

          {/* Price field */}
          <div>
            <label className="block text-blue-400 font-bold mb-1 gaming-font select-none">
              💲 Price
              <span className="text-gray-500 ml-1">*</span>
            </label>
            <input
              type="number"
              step="any"
              min={0}
              {...register("price")}
              placeholder="Enter price (INR)"
              className={`w-full px-4 py-3 rounded-2xl bg-gray-900 text-blue-300 border-2 border-blue-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 shadow-glow
                transition-colors duration-300 ${
                  errors.price?.message
                    ? "border-gray-600 bg-gray-900 focus:ring-gray-400 focus:border-gray-500"
                    : ""
                }`}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="none"
            />
            {errors.price?.message && (
              <p className="text-sm text-gray-500 mt-1 font-semibold">
                {String(errors.price.message)}
              </p>
            )}
          </div>

          {/* Image Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {imageKeys.map((key) => (
              <div key={key}>
                <label className="block text-blue-400 mb-1 font-semibold gaming-font select-none">
                  {`Image ${key.slice(-1)}`}
                  <span className="text-gray-500 ml-1">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register(key)}
                  className={`w-full px-3 py-2 rounded-md bg-gray-900 text-blue-300 border-2 border-blue-700
                    cursor-pointer shadow-glow transition-colors duration-300
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
                    ${errors[key]?.message
                      ? "border-gray-600 bg-gray-900 focus:ring-gray-400 focus:border-gray-500"
                      : ""
                    }`}
                />
                {errors[key]?.message && (
                  <p className="text-sm text-gray-500 mt-1 font-semibold">
                    {String(errors[key]?.message)}
                  </p>
                )}
                {renderPreview(watch(key) as FileList | undefined)}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-6">
            <button
              type="button"
              onClick={() => history.back()}
              className="px-6 py-2 text-gray-300 bg-gray-800 rounded-xl font-semibold shadow hover:bg-gray-700 transition transform hover:-translate-y-0.5"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 font-extrabold text-lg rounded-2xl bg-gradient-to-r from-gray-600 via-gray-700 to-blue-600 text-white shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-glow"
            >
              {isSubmitting ? "Submitting..." : "Submit Listing"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default GameForm;
