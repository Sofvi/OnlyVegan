import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';
import {appId, baseUrl} from '../utils/variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const useMedia = (myFilesOnly) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update, user} = useContext(MainContext);

  const loadMedia = async () => {
    try {
      let json = await useTag().getFilesByTag(appId);
      // keep users files if MyFilesOnly
      if (myFilesOnly) {
        json = json.filter((file) => {
          if (file.user_id === user.user_id) {
            return file;
          }
        });
      }

      json.reverse();
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );
      setMediaArray(media);
    } catch (error) {
      console.error('List, loadMedia', error);
    }
  };
  useEffect(() => {
    loadMedia();
  }, [update]);

  const postMedia = async (fileData, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: fileData,
    };
    try {
      return await doFetch(baseUrl + 'media', options);
    } catch (error) {
      throw new Error('postUpload: ' + error.message);
    }
  };

  const deleteMedia = async (id, token) => {
    try {
      return await doFetch(baseUrl + 'media/' + id, {
        headers: {'x-access-token': token},
        method: 'delete',
      });
    } catch (error) {
      throw new Error('deleteMedia, ' + error.message);
    }
  };

  const putMedia = async (id, data, token) => {
    const options = {
      method: 'put',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'media/' + id, options);
    } catch (error) {
      throw new Error('putMedia: ' + error.message);
    }
  };

  return {mediaArray, postMedia, deleteMedia, putMedia};
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      return await doFetch(baseUrl + 'login', options);
    } catch (error) {
      throw new Error('postLogin: ' + error.message);
    }
  };
  return {postLogin};
};

// https://media.mw.metropolia.fi/wbma/docs/#api-User
const useUser = () => {
  const getUserByToken = async (token) => {
    // call https://media.mw.metropolia.fi/wbma/docs/#api-User-CheckUserName
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + 'users/user', options);
    } catch (error) {
      throw new Error('checkUser: ' + error.message);
    }
  };
  const postUser = async (userData) => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    try {
      return await doFetch(baseUrl + 'users', options);
    } catch (error) {
      throw new Error('postUser: ' + error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const result = await doFetch(baseUrl + 'users/username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('checkUsername: ' + error.message);
    }
  };

  const getUserById = async (id, token) => {
    try {
      return await doFetch(baseUrl + 'users/' + id, {
        headers: {'x-access-token': token},
      });
    } catch (error) {
      throw new Error('getUserById, ' + error.message);
    }
  };

  return {getUserByToken, postUser, checkUsername, getUserById};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      throw new Error('getFilesByTag, ' + error.message);
    }
  };

  const postTag = async (data, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'tags', options);
    } catch (error) {
      throw new Error('postTag: ' + error.message);
    }
  };
  return {getFilesByTag, postTag};
};

const useFavourite = () => {
  const postFavourite = async (fileId, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: fileId}),
    };
    try {
      return await doFetch(baseUrl + 'favourites', options);
    } catch (error) {
      throw new Error('posFavourite: ' + error.message);
    }
  };
  const getFavouritesByFileId = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId);
    } catch (error) {
      throw new Error('getFavouriterByFileId error, ' + error.message);
    }
  };
  const deleteFavourite = async (fileId, token) => {
    const options = {
      method: 'delete',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId, options);
    } catch (error) {
      throw new Error('deleteFavourite error, ' + error.message);
    }
  };

  return {
    postFavourite,
    getFavouritesByFileId,
    deleteFavourite,
  };
};

const useRating = () => {
  const getRatingsByFileId = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'ratings/file/' + fileId);
    } catch (error) {
      throw new Error('getRatingsByFileId error, ' + error.message);
    }
  };

  const postRating = async (fileId, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: fileId}),
    };
    try {
      return await doFetch(baseUrl + 'ratings', options);
    } catch (error) {
      throw new Error('postRating: ' + error.message);
    }
  };

  return {postRating, getRatingsByFileId};
};

export {useMedia, useAuthentication, useUser, useTag, useFavourite, useRating};
