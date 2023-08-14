"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Box, Grid, Stack } from "@mui/material";
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

import FormInput from "@/components/form-components/form-input";
import FormAutocomplete from "@/components/form-components/form-autocomplete";

const { useUploadThing } = generateReactHelpers();

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  category: yup.string().required("Category is required"),
  price: yup.number().required("Price is required").positive().integer(),
});

const ProductForm = ({ categories }) => {
  const { handleSubmit, control, reset } = useForm({
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
        <Stack gap="20px">
          <FormInput name="name" label="Name" control={control} />
          <FormInput
            name="description"
            label="Description"
            control={control}
            rows={3}
            multiline
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormAutocomplete
                name="category"
                label="Category"
                options={categories}
                control={control}
              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                name="price"
                label="Price"
                type="number"
                control={control}
              />
            </Grid>
          </Grid>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isUploading}
          >
            Add Product
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ProductForm;
