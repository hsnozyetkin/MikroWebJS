import defaultImage from './defaultImage'

export const getDarknes = (state) => {
  return state.darknes;
}
export const getIsLoding = (state) => {
  return state.isLoading;
}

export const getDefaultImage = () => {
  return defaultImage.defaultImage
}
