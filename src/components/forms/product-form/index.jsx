"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Autocomplete, TextField, Button, Box, Grid } from "@mui/material";
import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
} from "@files-ui/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { isArrayOfFile } from "@/utils";
import { toast } from "react-toastify";
import { addProductAction, checkProductAction } from "@/app/_actions/product";

const { useUploadThing } = generateReactHelpers();

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  category: yup.string().required("Category is required"),
  price: yup.number().required("Price is required").positive().integer(),
});

const ProductForm = ({ categories }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [extFiles, setExtFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);

  const { isUploading, startUpload } = useUploadThing("productImage");

  const onSubmit = async (data) => {
    try {
      await checkProductAction(data.name);

      const files = extFiles.map((item) => item.file);
      const imageSrc = isArrayOfFile(files)
        ? await startUpload(files).then((res) => {
            return res[0].fileUrl ?? null;
          })
        : null;

      await addProductAction({
        ...data,
        image: imageSrc,
      });

      toast.success("Product added successfully.");

      reset();
      setExtFiles(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateFiles = (incommingFiles) => {
    setExtFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setExtFiles(extFiles.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  return (
    <Box maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              margin="normal"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              multiline
              rows={3}
              margin="normal"
            />
          )}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="category"
              control={control}
              defaultValue={categories[0].value}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, val) => field.onChange(val.value)}
                  options={categories}
                  isOptionEqualToValue={(option, value) => {
                    return option.value === value;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      fullWidth
                      error={!!errors.category}
                      helperText={errors.category?.message}
                      margin="normal"
                    />
                  )}
                  renderOption={(liProps, option) => (
                    <li {...liProps} key={option.value}>
                      {option.label}
                    </li>
                  )}
                  getOptionLabel={(option) =>
                    categories.find((cat) => cat.value === option)?.label || ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  type="number"
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  margin="normal"
                />
              )}
            />
          </Grid>
        </Grid>
        <Box paddingY="20px">
          <Dropzone
            onChange={updateFiles}
            minHeight="195px"
            value={extFiles}
            accept="image/*"
            maxFiles={1}
            maxFileSize={5 * 1024 * 1024}
            label="Drag'n drop product image here or click to browse"
          >
            {(extFiles || []).map((file) => (
              <FileMosaic
                {...file}
                key={file.id}
                onDelete={onDelete}
                onSee={handleSee}
                preview
              />
            ))}
          </Dropzone>
          <FullScreen
            open={imageSrc !== undefined}
            onClose={() => setImageSrc(undefined)}
          >
            <ImagePreview src={imageSrc} />
          </FullScreen>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isUploading}
        >
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
