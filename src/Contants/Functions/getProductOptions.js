// import CategoryResponse from "../CategoryResponse";

const convertToSlug = (Text) => {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

export const getCategoryOptions = (categoryResponse) => {
    const categories = categoryResponse?.map(cat => {
        return { value: cat.url, label: cat.categoryName };
    }) || [];
    
    return [...categories, { value: 'other', label: 'Other' }];
};

const getProductOptions = (selectedCategory, categoryResponse) => {
    if (selectedCategory === 'other') {
        return [{ value: 'other', label: 'Other' }];
    }

    const selectedCategoryData = categoryResponse?.find(cat => cat.url === selectedCategory);
    if (selectedCategoryData) {
        const subCategoryOptions = selectedCategoryData?.subCategory?.map(subCat => {
            return { value: convertToSlug(subCat.categoryName), label: subCat.categoryName };
        });

        const productOptions = selectedCategoryData?.subCategory?.map(subCat => {
            return subCat?.products?.map(product => {
                return { value: convertToSlug(product.name), label: product.name };
            });
        });

        const products = productOptions.flat();
        return [...subCategoryOptions, ...products];
    }
    return [];
};

export default getProductOptions;