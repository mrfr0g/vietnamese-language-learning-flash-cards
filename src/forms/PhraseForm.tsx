import { Box, Button, FormField, Select, TextInput } from "grommet";
import { Checkmark, Add } from "grommet-icons";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

export interface PhraseFormFields {
  id: string;
  phrase: string;
  lang: string;
}

interface PhraseFormProps {
  defaultValues?: PhraseFormFields;
  alternateBackground?: boolean;
  onSubmit: (update: PhraseFormFields) => void;
}

export function PhraseForm({
  defaultValues,
  alternateBackground,
  onSubmit,
}: PhraseFormProps) {
  const { control, handleSubmit, reset } = useForm<PhraseFormFields>({
    defaultValues: {
      phrase: "bạn đang làm gì",
      lang: "vi-VN",
      ...defaultValues,
    },
  });

  const handleFormSubmit = useCallback(
    (update: PhraseFormFields) => {
      reset({
        phrase: "",
        lang: "",
      });
      onSubmit(update);
    },
    [onSubmit]
  );

  return (
    <Box
      direction="row"
      gap="xxsmall"
      pad="small"
      background={alternateBackground ? "brand-accent" : "transparent"}
    >
      <Controller
        control={control}
        name="phrase"
        render={({ field }) => (
          <FormField label="Phrase">
            <TextInput {...field} />
          </FormField>
        )}
      />
      <Controller
        control={control}
        name="lang"
        render={({ field }) => (
          <FormField label="Language">
            <Select
              options={["en-US", "vi-VN"]}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </FormField>
        )}
      />
      <Button
        style={{
          height: "32px",
          borderRadius: "100%",
          background: "rgba(255, 255, 255, .7)",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, .4)",
          alignSelf: "center",
        }}
        icon={
          defaultValues?.id ? (
            <Checkmark color="brand" size="small" />
          ) : (
            <Add color="brand" size="small" />
          )
        }
        onClick={handleSubmit(handleFormSubmit)}
      />
    </Box>
  );
}
