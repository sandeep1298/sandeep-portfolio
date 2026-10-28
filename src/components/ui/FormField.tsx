import { memo, useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

const CONTROL_CLASSES =
  "peer block w-full rounded-xl border border-black/15 bg-white/80 px-4 pb-2.5 pt-6 text-sm font-medium text-black outline-none transition-[border-color,box-shadow] duration-200 focus:border-common_voilet_color focus:ring-4 focus:ring-common_voilet_color/20 sm:text-base dark:border-white/15 dark:bg-white/5 dark:text-white";

// The label sits inside the field and floats up (transform only) on focus or once filled
const LABEL_CLASSES =
  "pointer-events-none absolute left-4 top-4 origin-left text-sm text-gray-500 transition-transform duration-200 peer-focus:-translate-y-2.5 peer-focus:scale-[0.8] peer-focus:text-common_voilet_color peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.8] sm:text-base dark:text-gray-400 motion-reduce:transition-none";

interface SharedProps {
  label: string;
  required?: boolean;
}

type InputFieldProps = SharedProps & { as?: "input" } & InputHTMLAttributes<HTMLInputElement>;
type TextareaFieldProps = SharedProps & { as: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement>;
export type FormFieldProps = InputFieldProps | TextareaFieldProps;

/** Floating-label form control; pass `as="textarea"` for multi-line input. */
function FormField(props: FormFieldProps) {
  const id = useId();
  const { label, required = false } = props;

  // A blank placeholder lets CSS detect "empty" via :placeholder-shown
  let control;
  if (props.as === "textarea") {
    const { as, label: _label, required: _required, ...textareaProps } = props;
    control = (
      <textarea
        id={id}
        placeholder=" "
        required={required}
        className={`${CONTROL_CLASSES} resize-y`}
        {...textareaProps}
      />
    );
  } else {
    const { as, label: _label, required: _required, ...inputProps } = props;
    control = (
      <input id={id} placeholder=" " required={required} className={CONTROL_CLASSES} {...inputProps} />
    );
  }

  return (
    <div className="relative">
      {control}
      <label htmlFor={id} className={LABEL_CLASSES}>
        {label}
        {required ? <span className="text-common_voilet_color"> *</span> : null}
      </label>
    </div>
  );
}

export default memo(FormField);
