// import React, { useState } from "react";
// import Select from "react-select";

// const GenericForm = ({ inputs = [], buttons = [], onSubmit }) => {
//   const [formData, setFormData] = useState({});

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (onSubmit) onSubmit(formData);
//   };

//   return (
//     <form className="space-y-5 text-gray-800 w-full" onSubmit={handleFormSubmit}>
//       {inputs.map((input, index) => (
//         <div key={input.Key || index}>
//           <label className="block mb-1 font-medium">{input.label}</label>

//           {input.type === "select" ? (
//             <Select
//               isDisabled={input.disabled}
//               options={input.options?.map((option) =>
//                 typeof option === "string"
//                   ? { label: option, value: option }
//                   : option
//               )}
//               placeholder={input.placeholder || "Select an option"}
//               onChange={(selectedOption) =>
//                 handleChange(input.Key, selectedOption?.value)
//               }
//               classNames={{
//                 control: () => "border border-gray-300 rounded-md",
//               }}
//             />
//           ) : input.type === "textarea" ? (
//             <textarea
//               placeholder={input.placeholder}
//               className={`w-full border border-gray-300 rounded-md px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
//                 input.disabled ? "bg-gray-100 cursor-not-allowed" : ""
//               }`}
//               onChange={(e) => handleChange(input.Key, e.target.value)}
//               disabled={input.disabled}
//             />
//           ) : (
//             <input
//               type={input.type}
//               placeholder={input.placeholder}
//               className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
//                 input.disabled ? "bg-gray-100 cursor-not-allowed" : ""
//               }`}
//               onChange={(e) => handleChange(input.Key, e.target.value)}
//               disabled={input.disabled}
//             />
//           )}
//         </div>
//       ))}

//       <div className="flex flex-col sm:flex-row gap-4">
//         {buttons.map((btn, idx) => (
//           <button
//             key={idx}
//             type={btn.type || "button"}
//             onClick={btn.onClick}
//             className={`${
//               btn.className || ""
//             } px-6 py-3 rounded-lg text-lg font-semibold transition w-full sm:w-auto`}
//           >
//             {btn.label}
//           </button>
//         ))}
//       </div>
//     </form>
//   );
// };

// export default GenericForm;



import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";

const GenericForm = ({
  inputs = [],
  buttons = [],
  onSubmit,
  schema,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: schema ? yupResolver(schema) : undefined,
  });

  // Custom loading spinner component
  const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-400"></div>
  );

  return (
    <form
      className="space-y-5 text-gray-800 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      {inputs.map((input, index) => {
        const key = input.Key || input.key || index;

        return (
          <div key={key}>
            <label className="block mb-1 font-medium">
              {input.label}
              {input.isLoading && (
                <span className="ml-2 inline-flex items-center">
                  <LoadingSpinner />
                </span>
              )}
            </label>

            {input.type === "select" ? (
              <Controller
                name={key}
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Select
                      {...field}
                      isDisabled={input.disabled}
                      isLoading={input.isLoading}
                      options={input.options?.map((option) =>
                        typeof option === "string"
                          ? { label: option, value: option }
                          : option
                      )}
                      placeholder={input.placeholder || "Select an option"}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption?.value || null);
                      }}
                      value={
                        input.options
                          ?.map((option) =>
                            typeof option === "string"
                              ? { label: option, value: option }
                              : option
                          )
                          .find((option) => option.value === field.value) || null
                      }
                      classNames={{
                        control: (state) => 
                          `border border-gray-300 rounded-md ${
                            input.isLoading ? 'bg-gray-50' : ''
                          } ${
                            state.isFocused ? 'ring-2 ring-orange-400' : ''
                          }`,
                        placeholder: () => 
                          input.isLoading ? 'text-orange-500' : 'text-gray-400',
                      }}
                      loadingMessage={() => "Loading options..."}
                    />
                    
                    {/* Custom loading overlay for better UX */}
                    {input.isLoading && (
                      <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                        <LoadingSpinner />
                      </div>
                    )}
                  </div>
                )}
              />
            ) : input.type === "textarea" ? (
              <div className="relative">
                <textarea
                  {...register(key)}
                  placeholder={input.placeholder}
                  className={`w-full border border-gray-300 rounded-md px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                    input.disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  disabled={input.disabled}
                />
                {input.isLoading && (
                  <div className="absolute right-3 top-3">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <input
                  {...register(key)}
                  type={input.type}
                  placeholder={input.placeholder}
                  className={`w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                    input.disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  disabled={input.disabled}
                />
                {input.isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            )}

            {errors?.[key] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[key]?.message}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex flex-col sm:flex-row gap-4">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            type={btn.type || "button"}
            onClick={btn.onClick}
            disabled={btn.disabled}
            className={`${
              btn.className || ""
            } px-6 py-3 rounded-lg text-lg font-semibold transition w-full sm:w-auto flex items-center justify-center gap-2`}
          >
            {btn.disabled && btn.type === "submit" && (
              <LoadingSpinner />
            )}
            {btn.label}
          </button>
        ))}
      </div>
    </form>
  );
};

export default GenericForm;