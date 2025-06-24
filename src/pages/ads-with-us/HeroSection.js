// import FloatingCard from "./FloatingCard";
// import GenericForm from "./GenericForm";
// import ModalPopUp from "./ModalPopUp";
// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getAllProducts, getAllSubCategories,adsWithUs } from "@/Contants/APIEndpoint";
// import { Key } from "lucide-react";
// import * as yup from "yup";
// import toast, { Toaster } from "react-hot-toast";

// const fetchprod = async() => {
//   const data = await fetch(getAllProducts);
//   return data.json()
// }
// const fecthSubCategory = async() => {
//   const data = await fetch(getAllSubCategories);
//   return data.json()
// }

// const HeroSection = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [productOptions, setProductOptions] = useState([]);

//   // Fetch products using useQuery
//   const {
//     data: productsData,
//     isLoading: productsLoading,
//     error: productsError
//   } = useQuery({
//     queryKey: ['products'],
//     queryFn: fetchprod,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });

//   // Fetch subcategories using useQuery
//   const {
//     data: subCategoriesData,
//     isLoading: subCategoriesLoading,
//     error: subCategoriesError
//   } = useQuery({
//     queryKey: ['subcategories'],
//     queryFn: fecthSubCategory,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });

//   console.log("productOptions",productOptions);
  

//   // Merge and process data when both queries are successful
//   useEffect(() => {
//     if (productsData && subCategoriesData) {
//       try {
//         // Extract product names
//         const productNames = productsData.map(product => product.name);
        
//         // Extract subcategory names
//         const subCategoryNames = subCategoriesData.map(subCategory => subCategory.name);
        
//         // Merge both arrays and remove duplicates
//         const mergedOptions = [...new Set([...productNames, ...subCategoryNames])];
        
//         // Sort alphabetically for better UX
//         const sortedOptions = mergedOptions.sort();
        
//         setProductOptions(sortedOptions);
//       } catch (error) {
//         console.error('Error processing product options:', error);
//         setProductOptions([]);
//       }
//     }
//   }, [productsData, subCategoriesData]);

//   const handleFormSubmit = (formData) => {
//     console.log("Form Payload:", formData);
// console.log("baseurl ", adsWithUs);

//       fetch(adsWithUs, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             })
//                 .then(response => {
//                     if (response.status === 200) {
//                         return response.json();
//                     } else {
//                         throw new Error(`CRM API failed with status: ${response.status}`);
//                     }
//                 })
//                 .then(crmResponse => {
//                     console.log("CRM API Response:", crmResponse);
                
//                 })
//                 .catch((error) => {
//                     console.error('API Error:', error);
//                     toast.error(`Something went wrong: ${error.message}`);
                    
//                 });

//   };

//   // Loading state for product options
//   const isLoadingOptions = productsLoading || subCategoriesLoading;
  
//   // Error state
//   const hasError = productsError || subCategoriesError;

// const formSchema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   contactNo: yup
//     .string()
//     .required("Contact number is required")
//     .matches(/^\d{10}$/, "Must be exactly 10 digits"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   budget: yup
//     .number()
//     .typeError("Budget must be a number")
//     .positive("Budget must be positive")
//     .required("Budget is required"),
//   product: yup.string().required("Please select a product"),
//   additionalComments: yup.string(),
// });


// const formFields = [
//   { label: "Name", type: "text", placeholder: "Enter your full name", Key: "name" },
//   {
//     label: "Contact Number",
//     type: "tel",
//     placeholder: "Enter your contact number",
//     Key: "contactNo"
//   },
//   { label: "Email", type: "email", placeholder: "Enter your email address", Key: "email" },
//   {
//     label: "Budget",
//     type: "number", // Changed from "text" to "number"
//     placeholder: "Specify your advertising budget (INR)",
//     Key: "budget"
//   },
//   {
//     label: "Product",
//     type: "select",
//     options: productOptions,
//     placeholder: isLoadingOptions 
//       ? "Loading products..." 
//       : hasError 
//       ? "Error loading products" 
//       : "Select a product or service",
//     disabled: isLoadingOptions || hasError,
//     Key: "product"
//   },
//   {
//     label: "Additional Comments",
//     type: "textarea",
//     placeholder: "Any specific requests or preferences",
//     Key: "additionalComments"
//   },
// ];

//   const formButtons = [
//     {
//       label: "Submit",
//       type: "submit",
//       className: "bg-headupb2b hover:bg-orange-600 text-white",
//     },
//     {
//       label: "Cancel",
//       type: "button",
//       onClick: () => setIsModalOpen(false),
//       className: "bg-gray-300 hover:bg-gray-400 text-gray-800",
//     },
//   ];

//   return (
//     <section className="flex flex-col md:flex-row items-center py-16 px-6 bg-white">
//       {/* Left Side */}
//       <div className="md:w-1/2 text-center md:text-left">
//         <div className="text-headupb2b font-semibold text-lg md:text-xl mb-2">
//           High‑Performance Advertising
//         </div>
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
//           Reach <span className="text-headupb2b">50,000+</span> Infra{" "}
//           <span className="text-headupb2b">Decision Makers</span> Monthly
//         </h1>
//         <p className="text-gray-700 text-base mb-6 leading-relaxed">
//           <strong>Let's put your brand in front of the right businesses.</strong>
//         </p>

//         <p className="text-gray-700 text-base mb-6 leading-relaxed">
//           With Headsup B2B, your brand gets direct access to an expansive
//           decision-maker audience. We ensure your content reaches the
//           decision-makers most likely to engage and convert into loyal buyers.
//         </p>

//         <div className="flex flex-wrap gap-4 justify-center md:justify-start">
//           <button
//             className="bg-headupb2b text-white py-3 px-6 rounded-full text-base md:text-lg font-medium hover:bg-white hover:text-black hover:border border-headupb2b"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Show Interest
//           </button>
//           <a href="mailto:tanshi@headsupcorporation.com">
//             <button className="border border-headupb2b text-headupb2b py-3 px-6 rounded-full text-base md:text-lg font-medium hover:text-black">
//               Talk to our Expert
//             </button>
//           </a>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="md:w-1/2 mt-12 md:mt-0">
//         <FloatingCard />
//       </div>

//       {/* Modal */}
//       <div>
//         <ModalPopUp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//           <GenericForm
//             inputs={formFields}
//             buttons={formButtons}
//             onSubmit={handleFormSubmit}
//             schema={formSchema}
//           />
//         </ModalPopUp>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import FloatingCard from "./FloatingCard";
import GenericForm from "./GenericForm";
import ModalPopUp from "./ModalPopUp";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query"; // useMutation is removed
import { getAllProducts, getAllSubCategories, adsWithUs } from "@/Contants/APIEndpoint";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";

// Fetch functions remain the same
const fetchprod = async() => {
  const data = await fetch(getAllProducts);
  return data.json()
}

const fecthSubCategory = async() => {
  const data = await fetch(getAllSubCategories);
  return data.json()
}

// Function to submit form data remains the same
const submitFormData = async (formData) => {
  const response = await fetch(adsWithUs, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    // Creating a more informative error
    const errorData = await response.text(); // Get more details if API provides them
    throw new Error(`API failed with status: ${response.status}. Message: ${errorData}`);
  }

  return response.json();
};

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  
  // --- STATE MANAGEMENT REPLACEMENT FOR useMutation ---
  // State to track if the form is currently being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch products using useQuery (this part is unchanged)
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchprod,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch subcategories using useQuery (this part is unchanged)
  const {
    data: subCategoriesData,
    isLoading: subCategoriesLoading,
    error: subCategoriesError
  } = useQuery({
    queryKey: ['subcategories'],
    queryFn: fecthSubCategory,
    staleTime: 5 * 60 * 1000,
  });

  // useEffect for processing data is unchanged
  useEffect(() => {
    if (productsData && subCategoriesData) {
      try {
        const productNames = productsData.map(product => product.name);
        const subCategoryNames = subCategoriesData.map(subCategory => subCategory.name);
        const mergedOptions = [...new Set([...productNames, ...subCategoryNames])];
        const sortedOptions = mergedOptions.sort();
        setProductOptions(sortedOptions);
      } catch (error) {
        console.error('Error processing product options:', error);
        setProductOptions([]);
      }
    }
  }, [productsData, subCategoriesData]);

  // --- UPDATED FORM SUBMISSION HANDLER ---
  const handleFormSubmit = async (formData) => {
    console.log("Form Payload:", formData);
    console.log("baseurl ", adsWithUs);

    // 1. Set loading state to true to disable buttons and show "Submitting..."
    setIsSubmitting(true);

    try {
      // 2. Await the API call
      const result = await submitFormData(formData);

      // 3. Handle success
      console.log("Form submitted successfully:", result);
      // toast.success("Form submitted successfully!");
      setIsModalOpen(false); // Close modal on success

    } catch (error) {
      // 4. Handle error
      console.error('Form submission error:', error);
      toast.error(`Something went wrong: ${error.message}`);

    } finally {
      // 5. IMPORTANT: Set loading state back to false in a `finally` block
      // This ensures the form becomes usable again, whether the request succeeded or failed.
      setIsSubmitting(false);
    }
  };

  const isLoadingOptions = productsLoading || subCategoriesLoading;
  const hasError = productsError || subCategoriesError;

  // formSchema is unchanged
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    contactNo: yup
      .string()
      .required("Contact number is required")
      .matches(/^\d{10}$/, "Must be exactly 10 digits"),
    email: yup.string().email("Invalid email").required("Email is required"),
    budget: yup
      .number()
      .typeError("Budget must be a number")
      .positive("Budget must be positive")
      .required("Budget is required"),
    product: yup.string().required("Please select a product"),
    additionalComments: yup.string(),
  });

  // formFields is unchanged
  const formFields = [
    { label: "Name", type: "text", placeholder: "Enter your full name", Key: "name" },
    {
      label: "Contact Number",
      type: "tel",
      placeholder: "Enter your contact number",
      Key: "contactNo"
    },
    { label: "Email", type: "email", placeholder: "Enter your email address", Key: "email" },
    {
      label: "Monthly Budget",
      type: "number",
      placeholder: "Specify your advertising budget (INR)",
      Key: "budget"
    },
    {
      label: "Product",
      type: "select",
      options: productOptions,
      placeholder: isLoadingOptions 
        ? "Loading products..." 
        : hasError 
        ? "Error loading products - please try again" 
        : productOptions.length === 0
        ? "No products available"
        : "Select a product or service",
      disabled: isLoadingOptions || hasError,
      isLoading: isLoadingOptions,
      Key: "product"
    },
    {
      label: "Additional Comments",
      type: "textarea",
      placeholder: "Any specific requests or preferences",
      Key: "additionalComments"
    },
  ];

  // --- UPDATED formButtons to use the new `isSubmitting` state ---
  const formButtons = [
    {
      label: isSubmitting ? "Submitting..." : "Submit",
      type: "submit",
      disabled: isSubmitting,
      className: `bg-headupb2b hover:bg-orange-600 text-white ${
        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
      }`,
    },
    {
      label: "Cancel",
      type: "button",
      onClick: () => setIsModalOpen(false),
      disabled: isSubmitting, // Also disable cancel while submitting
      className: "bg-gray-300 hover:bg-gray-400 text-gray-800",
    },
  ];

  return (
    <section className="flex flex-col md:flex-row items-center py-16 px-6 bg-white">
      {/* Left Side */}
      <div className="md:w-1/2 text-center md:text-left">
        <div className="text-headupb2b font-semibold text-lg md:text-xl mb-2">
          High‑Performance Advertising
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Reach <span className="text-headupb2b">50,000+</span> Infra{" "}
          <span className="text-headupb2b">Decision Makers</span> Monthly
        </h1>
        <p className="text-gray-700 text-xl mb-6 leading-relaxed">
          <strong>Let's put your brand in front of the right businesses.</strong>
        </p>

        <p className="text-gray-700 text-base mb-6 leading-relaxed">
          With Headsup B2B’s targeted advertising, connecting you to a focused,<br/> pan-India audience of purchase-ready industrial and construction <br/> professionals, driving real results for your campaign.

        </p>

        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <button
            className="bg-headupb2b text-white py-3 px-6 rounded-full text-base md:text-lg font-medium hover:bg-white hover:text-black hover:border border-headupb2b"
            onClick={() => setIsModalOpen(true)}
          >
            Show Interest
          </button>
          <a href="mailto:tanshi@headsupcorporation.com">
            <button className="border border-headupb2b text-headupb2b py-3 px-6 rounded-full text-base md:text-lg font-medium hover:text-black">
              Talk to our Expert
            </button>
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 mt-12 md:mt-0">
        <FloatingCard />
      </div>

      {/* Modal */}
      <div>
        <ModalPopUp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <GenericForm
            inputs={formFields}
            buttons={formButtons}
            onSubmit={handleFormSubmit}
            schema={formSchema}
          />
        </ModalPopUp>
      </div>

      {/* Toast container */}
      <Toaster position="top-right" />
    </section>
  );
};

export default HeroSection;