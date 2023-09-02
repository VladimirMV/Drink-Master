// Libs
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
// Styled components
import {
  DescriptionBox,
  FileInputBox,
  CustomFileInputWrapper,
  ImagePreview,
  CustomFileInput,
  CustomFileInputIcon,
  CustomFileInputText,
  DefaultFileInput,
  TextFieldsWrapper,
  Label,
  InputHeading,
  TextInput,
  selectStyles,
} from './RecipeDescriptionFields.styled';
// Icons
import { AiOutlinePlus } from 'react-icons/ai';

export const RecipeDescriptionFields = ({
  register,
  control,
  errors,
  glassesList,
  categoriesList,
  state,
  handleFileInputChange,
  handleInputChange,
  handleSelectChange,
}) => {
  const imageURL = state.drinkThumb
    ? URL.createObjectURL(state.drinkThumb)
    : null;

  return (
    <DescriptionBox>
      <FileInputBox>
        <CustomFileInputWrapper>
          {imageURL && (
            <ImagePreview
              src={imageURL}
              alt="Preview loaded image"
            ></ImagePreview>
          )}

          {!imageURL && (
            <CustomFileInput>
              <CustomFileInputIcon>
                <AiOutlinePlus size={28} />
              </CustomFileInputIcon>
              <CustomFileInputText>Add image</CustomFileInputText>
            </CustomFileInput>
          )}

          <DefaultFileInput
            type="file"
            name="drinkThumb"
            accept="image/*, .png, .jpg, .gif, .web"
            {...register('drinkThumb')}
            onChange={handleFileInputChange}
          />
        </CustomFileInputWrapper>
        {errors.drinkThumb?.message && (
          <p style={{ color: 'deeppink' }}>{'Add a photo of yor drink'}</p>
        )}
      </FileInputBox>

      <TextFieldsWrapper>
        <div>
          <Label>
            <InputHeading>Enter item title</InputHeading>
            <TextInput
              type="text"
              name="drink"
              {...register('drink')}
              value={state.drink}
              onChange={handleInputChange}
            />
          </Label>
          {errors.drink && (
            <p style={{ color: 'deeppink' }}>
              {'Enter the title of your drink'}
            </p>
          )}
        </div>

        <div>
          <Label>
            <InputHeading>Enter about recipe</InputHeading>
            <TextInput
              type="text"
              name="about"
              {...register('about')}
              value={state.about}
              onChange={handleInputChange}
            />
          </Label>
          {errors.about && (
            <p style={{ color: 'deeppink' }}>
              {'Tell us a few words about your drink'}
            </p>
          )}
        </div>

        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Label>
                <InputHeading>Category</InputHeading>
                <Select
                  {...field}
                  placeholder="Select from options..."
                  unstyled
                  styles={selectStyles}
                  options={categoriesList}
                  defaultValue={state.category}
                  onChange={selectedOption => {
                    field.onChange(selectedOption);
                    handleSelectChange(field.name);
                  }}
                />
              </Label>
            )}
          />
          {errors.category && (
            <p style={{ color: 'deeppink' }}>{'Chose the category of drink'}</p>
          )}
        </div>

        <div>
          <Controller
            name="glass"
            control={control}
            render={({ field }) => (
              <Label>
                <InputHeading>Glass</InputHeading>
                <Select
                  {...field}
                  placeholder="Select from options..."
                  unstyled
                  styles={selectStyles}
                  options={glassesList}
                  defaultValue={state.glass}
                  onChange={selectedOption => {
                    field.onChange(selectedOption);
                    handleSelectChange(field.name);
                  }}
                />
              </Label>
            )}
          />
          {errors.glass && (
            <p style={{ color: 'deeppink' }}>
              {
                'Chose the glass that you think is the best to use with your drink'
              }
            </p>
          )}
        </div>
      </TextFieldsWrapper>
    </DescriptionBox>
  );
};

RecipeDescriptionFields.propTypes = {
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  glassesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  state: PropTypes.shape({
    about: PropTypes.string.isRequired,
    category: PropTypes.object,
    drink: PropTypes.string.isRequired,
    drinkThumb: PropTypes.object,
    glass: PropTypes.object,
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
};