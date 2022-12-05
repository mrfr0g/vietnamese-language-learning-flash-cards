import { Box, Button, FormField, Select, TextInput } from "grommet";
import { Checkmark, Add } from "grommet-icons";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { RoundButton } from "../buttons/RoundButton";

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
      phrase: "mẹ đang làm gì",
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
      <RoundButton
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
