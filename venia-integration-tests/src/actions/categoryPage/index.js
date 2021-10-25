import {
    categoryPageAddToWishListButton,
    createWishlistButton,
    createWishlistConfirmButton,
    sharedFilterElements,
    filterModalFilterFooterButton,
    filterListItemElement,
    currentFilterTriggerElement,
    filterListShowMoreLessButtonElement,
    filterDefaultCheckboxElement,
    productsFilterModalOpenButton,
    wishlistNameField
} from '../../fields/categoryPage';

/**
 * Utility function to add product to wishlist from category page
 */
export const addProductToWishlistFromCategoryPage = productToAdd => {
    // add product to wishlist
    cy.contains(productToAdd)
        .siblings()
        .find(categoryPageAddToWishListButton)
        .click();
};

/**
 * Utility function to clear filters
 *
 * @param {Boolean} [isMobile] is mobile
 */
export const clearFilters = (isMobile = true) => {
    cy.get(
        sharedFilterElements[isMobile ? 'mobile' : 'desktop'].clearButton
    ).click();
};

/**
 * Utility function to toggle Filter Modal
 */
export const toggleFilterModal = () => {
    cy.get(productsFilterModalOpenButton).click();
};

/**
 * Utility function to apply Filters from Filter Modal
 */
export const applyFiltersFromFilterModal = () => {
    cy.get(filterModalFilterFooterButton).click();
};

/**
 * Utility function to toggle a filter block
 *
 * @param {String} filterName filter name
 * @param {Boolean} [isMobile] is mobile
 */
export const toggleFilterBlock = (filterName, isMobile = true) => {
    const filterBlockTriggerButton =
        sharedFilterElements[isMobile ? 'mobile' : 'desktop']
            .filterBlockTriggerButton;

    cy.get(filterBlockTriggerButton)
        .should('be.visible')
        .contains(filterBlockTriggerButton, filterName)
        .click();
};

/**
 * Utility function to toggle a filter's list
 *
 * @param {String} filterListName filter list name
 * @param {Boolean} [isMobile] is mobile
 */
export const toggleFilterList = (filterListName, isMobile = true) => {
    const filtersFilterBlock =
        sharedFilterElements[isMobile ? 'mobile' : 'desktop'].filterBlock;

    cy.get(filtersFilterBlock)
        .contains(filtersFilterBlock, filterListName)
        .then($filterBlock => {
            cy.wrap($filterBlock)
                .find(filterListShowMoreLessButtonElement)
                .click();
        });
};

/**
 * Utility function to select filter from list
 *
 * @param {String} filterListName filter list name
 * @param {String} filterLabel filter label
 * @param {Boolean} [isMobile] is mobile
 */
export const selectFilterFromList = (
    filterListName,
    filterLabel,
    isMobile = true
) => {
    const filtersFilterBlock =
        sharedFilterElements[isMobile ? 'mobile' : 'desktop'].filterBlock;

    cy.get(filtersFilterBlock)
        .contains(filtersFilterBlock, filterListName)
        .then($filterBlock => {
            cy.wrap($filterBlock)
                .find(filterListItemElement)
                .contains(filterListItemElement, filterLabel)
                .find(filterDefaultCheckboxElement)
                .check();
        });
};

/**
 * Utility function to clear an filter
 *
 * @param {String} filterLabel filter label
 * @param {Boolean} [isMobile] is mobile
 */
export const clearFilter = (filterLabel, isMobile = true) => {
    const filtersCurrentFilter =
        sharedFilterElements[isMobile ? 'mobile' : 'desktop'].currentFilter;

    cy.get(filtersCurrentFilter)
        .contains(filtersCurrentFilter, filterLabel)
        .then($currentFilter => {
            cy.wrap($currentFilter)
                .find(currentFilterTriggerElement)
                .click();
        });
};

/**
 * Utility function to create wishlist
 *
 * @param {String} wishlistName wishlist name
 */
export const createWishlistViaDialog = wishlistName => {
    // click on Create a List link
    cy.get(createWishlistButton).click();

    // enter wishlist name
    cy.get(wishlistNameField).type(wishlistName);

    // Create wishlist
    cy.get(createWishlistConfirmButton).click();
};
