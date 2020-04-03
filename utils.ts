import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";

export const getCameraRollPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
};

export const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  });
  if (!result.cancelled) {
    return result;
  }
};

export const uploadImage = async (uri: string, id: number | string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const currentUserUid = firebase.auth().currentUser.uid;
  const ref = firebase
    .storage()
    .ref()
    .child(`${currentUserUid}/${id}`);
  const putResult = ref.put(blob);
  return putResult;
};

export const getImageUrl = async (id: number | string) => {
  const currentUserUid = firebase.auth().currentUser.uid;
  const ref = firebase
    .storage()
    .ref()
    .child(`${currentUserUid}/${id}`);
  const url = ref.getDownloadURL();
  return url;
};

export const deleteImage = async (id: number | string) => {
  const currentUserUid = firebase.auth().currentUser.uid;
  const ref = firebase
    .storage()
    .ref()
    .child(`${currentUserUid}/${id}`);
  ref
    .delete()
    .then(function() {
      // File deleted successfully
    })
    .catch(function(error) {
      // Uh-oh, an error occurred!
    });
};

export const signOut = () => {
  firebase.auth().signOut();
};