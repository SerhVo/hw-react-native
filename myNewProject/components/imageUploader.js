import * as ImagePicker from "expo-image-picker";

export const imageUploader = async (setState, setIsShowKeyboard) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.canceled) {
    return;
  }
  setState((prev) => ({ ...prev, image: result.assets[0].uri }));
  setIsShowKeyboard(false);
};
