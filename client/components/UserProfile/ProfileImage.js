import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import firebase from '../../firebase'
import styled from 'styled-components'
import colors from '../colors'
import images from '../imgSrc/images'
import moment from 'moment'
import Button from '@material-ui/core/Button';

// const avatarStyle = {
//   marginTop: '30px',
//   height: '150px',
//   width: '150px',
//   display: 'inline-block'
// }

const ProfileImage = ({ firstName, lastName, email, title, personId, isAdmin, team }) => {
  const [image, setImage] = useState(null)
  const [imageUpdated, setImageUpdated] = useState(false)
  let storage = firebase.storage()

  const uploadAvatar = (file) => {
    console.log(file)
    const storageRef = storage.ref();
    const childRef = storageRef.child('images')
    const profileImage = childRef.child(`${personId}`)
    profileImage.put(file).then(snapshot => {
      setImageUpdated(true)
    })
  }

  useEffect(() => {
    const pathReference = storage.ref().child('images')
    pathReference.child(`${personId}`).getDownloadURL().then(url => {
      if (url) {
        setImage(url)
      } else {
        setImage(randomImage())
      }
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

  const randomImage = () => {
    let num = Math.floor(Math.random() * images['puppies'].length)
    return images['puppies'][num]
  }

  return (
    <ProfileImageContainer>
      <AvatarWrapper>
        {
          image
            ?
            <Avatar id='profile-avatar' alt="Profile Picture" src={image} />
            :
            <Avatar id='profile-avatar' alt="Profile Picture" src={randomImage()} />
        }
      </AvatarWrapper>
      <h1>{firstName} {lastName}</h1>
      <div>{title}</div>
      <div>{team}</div>
      <div>{moment().format("ddd, MMM Do YYYY, h:mm a")}</div>
      {
        image
          ?
          <ButtonWrapper>
            <Button onClick={deleteImage}>Remove Picture</Button>
          </ButtonWrapper>
          :
          <ButtonWrapper>
            <input
              type="file"
              id="image-upload"
              name="img"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={onChangeFile}
            />
            <label htmlFor='image-upload'>
              <Button color="primary" component="span" >Upload Picture</Button>
            </label>
          </ButtonWrapper>
      }
    </ProfileImageContainer>
  );
};

const ProfileImageContainer = styled.div`
  width: 33%;
  height: 450px;
  min-height: 50%;
  margin-right: 40px;
  color: black;
  padding: 15px 0;
  background-color: ${colors.white};
  border-radius: 5px;
  box-shadow: 3px 5px 8px ${colors.blackShadow};
  text-align: center
`
const AvatarWrapper = styled.div`
  text-align: center
`

const ButtonWrapper = styled.div`
  margin: 10px;
`

export default ProfileImage;
