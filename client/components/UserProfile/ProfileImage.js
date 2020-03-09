import React, { useState, useEffect } from 'react';
import firebase from '../../firebase'

const ProfileImage = ({ firstName, lastName, email, title, personId, isAdmin }) => {
  const [image, setImage ] = useState(null)
  const [imageUpdated, setImageUpdated ] = useState(false)
  let storage = firebase.storage()

  const uploadAvatar = (file) => {
    console.log(file)
    const storageRef = storage.ref();
    const childRef = storageRef.child('images')
    const profileImage = childRef.child(`${personId}`)
    profileImage.put(file).then(snapshot => {
      setImageUpdated(true)
    })
    // const uploadTask = profileImage.put(file)
    // return uploadTask
  }

  useEffect(() => {
      const pathReference = storage.ref().child('images')
      pathReference.child(`${personId}`).getDownloadURL().then(url => {
        setImage(url)
      }).catch(err => {
        console.log(err.code)
      })
  }, [imageUpdated])

  const onChangeFile = evt => {
    let fileObj = evt.target.files[0]; //File object
    uploadAvatar(fileObj)
  }

  const deleteImage = () => {
    const storageRef = storage.ref();
    const childRef = storageRef.child('images')
    const profileImage = childRef.child(`${personId}`)
    profileImage.delete().then(() => {
      setImage(null)
      setImageUpdated(false)
    })
  }

  return (
    <div>
    {
      image ?
      <button onClick={deleteImage}>Remove Image</button>
      :
      <input type="file" id="img" name="img" accept="image/*" onChange={onChangeFile}/>
    }
      {
        image && <img height='200px' width='auto' src={image} alt='avatar' />
      }
    </div>
  );
};

export default ProfileImage;
