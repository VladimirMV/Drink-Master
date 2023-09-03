import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { nameSchema } from 'schema';
import { useAuth } from 'redux/auth/useAuth';
import { updateUser } from 'redux/auth/operations';
import { generateFormData } from 'helpers';
import { Button, FormMessages, CancelBtn, Backdrop } from 'components';
import {
  ProfileEditContainer,
  UserAvatar,
  ProfileEditInput,
  ProfileEditForm,
  AddPhotoIcon,
  EditIcon,
  TopDecorCircle,
  BottomDecorCircle,
  FileInputBox,
  FileInput,
  IconBox,
  AwatarWrapper,
  InputNameBox,
  BtnBox,
} from './UserInfoModal.styled';
import DEFAULT_AVATAR from '../../../img/default_user_avatar.png';

const modalRoot = document.querySelector('#modal-root');

export const UserInfoModal = ({ toggle }) => {
  const [avatarURL, setAvatarURL] = useState(null);
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors, dirtyFields },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(nameSchema),
  });

  const { user } = useAuth();

  useEffect(() => {
    const handleCloseEsc = evt => {
      if (evt.code === 'Escape') {
        toggle();
        return;
      }
    };
    document.addEventListener('keydown', handleCloseEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseEsc);
    };
  }, [toggle]);

  const handelBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      toggle();
    }
  };

  const imageURL = avatarURL ? URL.createObjectURL(avatarURL) : null;

  const avatarChange = evt => {
    const value = evt.target.files[0];

    setAvatarURL(value);
  };

  const onSubmit = async data => {
    const name = data.name;
    const reqBody = { name, avatarURL };

    const formData = generateFormData(reqBody);

    try {
      await dispatch(updateUser(formData));

      toggle();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return createPortal(
    <Backdrop onClick={handelBackdropClick}>
      <ProfileEditContainer>
        <CancelBtn cancelClick={toggle} />

        <ProfileEditForm onSubmit={handleSubmit(onSubmit)}>
          <FileInputBox>
            <AwatarWrapper>
              <UserAvatar
                src={imageURL ? imageURL : DEFAULT_AVATAR}
                alt="User Avatar"
              />
              <IconBox>
                <AddPhotoIcon />
              </IconBox>
            </AwatarWrapper>

            <FileInput
              name="avatarURL"
              type="file"
              accept="image/*, .png, .jpg, .gif, .web"
              {...register('avatarURL')}
              onChange={avatarChange}
            />
          </FileInputBox>

          <InputNameBox>
            <Controller
              name="name"
              control={control}
              defaultValue={user.name}
              render={({ field }) => (
                <ProfileEditInput
                  type="text"
                  {...field}
                  valid={!errors.name && dirtyFields.name}
                  invalid={dirtyFields.name && errors.name}
                />
              )}
            />

            <EditIcon />
          </InputNameBox>
          <FormMessages
            invalidValue={dirtyFields.name && errors.name}
            validValue={!errors.name && dirtyFields.name}
            errorMessage={errors.name?.message}
            checkMessage="This is valid name"
          />
          <BtnBox>
            <Button
              minWidth="100%"
              minHeight="54px"
              disabled={!isValid || !isDirty}
            >
              Save changes
            </Button>
          </BtnBox>
        </ProfileEditForm>

        <TopDecorCircle></TopDecorCircle>
        <BottomDecorCircle></BottomDecorCircle>
      </ProfileEditContainer>
    </Backdrop>,
    modalRoot
  );
};

UserInfoModal.propTypes = {
  toggle: PropTypes.func.isRequired,
};