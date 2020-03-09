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
      console.log(pathReference)
      pathReference.child(`${personId}`).getDownloadURL().then(url => {
        setImage(url)
      }).catch(err => {
        console.log(err.code)
      })

  }, [imageUpdated])

  const onChangeFile = evt => {
    console.log(evt.target.files[0])
    let fileObj = evt.target.files[0]; //File object
    uploadAvatar(fileObj)
    let fileName = evt.target.files[0].name;
  }

  return (
    <div>
      <p>Profile Image here</p>
      <input type="file" id="img" name="img" accept="image/*" onChange={onChangeFile}/>
      {
        image && <img height='200px' width='auto' src={image} alt='avatar' />
      }
    </div>
  );
};

export default ProfileImage;
