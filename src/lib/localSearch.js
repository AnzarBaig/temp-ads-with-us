import Fuse from 'fuse.js';
import nlp from 'compromise';

// Preprocess the search term to extract potential keywords
function preprocessSearchTerm(searchTerm) {
    const doc = nlp(searchTerm);
    let keywords = doc.terms().out('array');
    // Remove words less than 3 characters
    keywords = keywords.filter(keyword => keyword.length > 3);
    return keywords;
}

function searchSubcategoriesAndProducts(data, searchTerm) {
    console.log("--data--", data);

    let results = [];

    if (searchTerm.length < 2) {
        return results;
    }

    // Preprocess the search term to extract potential keywords
    const keywords = preprocessSearchTerm(searchTerm);
    if (keywords.length === 0) {
        keywords.push(searchTerm); // Fall back to using the whole search term if no keywords are found
    }

    // Create a list of items to search through
    const itemsToSearch = [];

    // Iterate over each category
    data?.forEach(category => {
        itemsToSearch.push({
            categoryName: category.categoryName,
            tags: category.tags || [],
            slug: category.url,
            type: 'category',
            originalData: category
        });

        category.subCategory.forEach(subCategory => {
            itemsToSearch.push({
                categoryName: subCategory.categoryName,
                tags: subCategory.SCTags || [],
                slug: subCategory.completeSCSlug,
                type: 'subCategory',
                originalData: subCategory,
                parentCategory: category
            });

            if (subCategory.products) {
                subCategory.products.forEach(product => {
                    itemsToSearch.push({
                        name: product.name,
                        tags: product.tags || [],
                        slug: product.completeProductSlug,
                        type: 'product',
                        originalData: product,
                        parentCategory: category,
                        parentSubCategory: subCategory
                    });
                });
            }
        });
    });

    // Set up Fuse.js options
    const options = {
        keys: [
            'categoryName',
            'name',
            'tags'
        ],
        threshold: 0.4
    };

    const fuse = new Fuse(itemsToSearch, options);

    // Search using each keyword and aggregate results
    const fuseResults = keywords.flatMap(keyword => fuse.search(keyword));

    console.log("--fuseResults--", fuseResults);

    // Process the Fuse.js results to match the original function's return format
    fuseResults.forEach(result => {
        console.log("---result---", result);
        const item = result.item;
        if (item.type === 'category') {
            if (!results.some(r => r.slug === item.slug && r.type === 'category')) {
                results.push({
                    category: item.originalData,
                    slug: item.slug,
                    type: 'category',
                });
            }
        } else if (item.type === 'subCategory' || item.type === 'product') {
            const existingCategory = results.find(r => r.category === item.parentCategory && (r.type === 'subCategory' || r.type === 'product'));
            if (existingCategory) {
                if (item.type === 'subCategory') {
                    existingCategory.items.push({
                        item: item.originalData,
                        slug: item.slug,
                        type: 'subCategory',
                    });
                } else {
                    existingCategory.items.push({
                        item: item.originalData,
                        slug: item.slug,
                        imageUrl: item.originalData.imageUrl,
                        type: 'product',
                    });
                }
            } else {
                results.push({
                    category: item.parentCategory,
                    items: [{
                        item: item.originalData,
                        slug: item.slug,
                        imageUrl: item.type === 'product' ? item.originalData.imageUrl : undefined,
                        type: item.type,
                    }],
                    type: item.type,
                });
            }
        }
    });

    return results;
}

export { searchSubcategoriesAndProducts };