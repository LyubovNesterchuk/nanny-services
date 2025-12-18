// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import css from "./AppointmentModal.module.css";
// import sprite from "/sprite.svg";
// import { toast } from "react-hot-toast";

// interface AppointmentModalProps {
//   onClose: () => void;
//   nannyName: string;
// }

// interface FormValues {
//   address: string;
//   phone: string;
//   email: string;
//   childAge: string;
//   meetingTime: string;
//   parentName: string;
//   comment: string;
// }

// const schema = yup.object({
//   address: yup.string().required("Address is required"),
//   phone: yup.string().required("Phone is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   childAge: yup.string().required("Child's age is required"),
//   meetingTime: yup.string().required("Meeting time is required"),
//   parentName: yup.string().required("Parent name is required"),
//   comment: yup.string().required("Comment is required"),
// });

// export default function AppointmentModal({
//   onClose,
//   nannyName,
// }: AppointmentModalProps) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormValues>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = (data: FormValues) => {
//   console.log("Appointment data:", data);

//   toast.success("Meeting request sent successfully!");

//   reset();
//   onClose();
// };

//   return (
    
//       <div className={css.wrapper}>
//         <button className={css.closeBtn} onClick={onClose}>
//           <svg width="24" height="24">
//             <use href={`${sprite}#icon-close`} />
//           </svg>
//         </button>

//         <h2 className={css.title}>Make an appointment with a babysitter</h2>
//         <p className={css.text}>
//           Arranging a meeting with a caregiver for your child is the first step
//           to creating a safe and comfortable environment.
//         </p>

//         <p className={css.nanny}>
//           Your nanny <span>{nannyName}</span>
//         </p>

//         <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
//           <input {...register("address")} placeholder="Address" />
//           <p className={css.error}>{errors.address?.message}</p>

//           <input {...register("phone")} placeholder="+380" />
//           <p className={css.error}>{errors.phone?.message}</p>

//           <input {...register("childAge")} placeholder="Child's age" />
//           <p className={css.error}>{errors.childAge?.message}</p>

//           <input type="time" {...register("meetingTime")} />
//           <p className={css.error}>{errors.meetingTime?.message}</p>

//           <input {...register("email")} placeholder="Email" />
//           <p className={css.error}>{errors.email?.message}</p>

//           <input {...register("parentName")} placeholder="Father's or mother's name" />
//           <p className={css.error}>{errors.parentName?.message}</p>

//           <textarea {...register("comment")} placeholder="Comment" />
//           <p className={css.error}>{errors.comment?.message}</p>

//           <button type="submit" className={css.submitBtn}>
//             Send
//           </button>

//         </form>
//       </div>
   
//   );
// }
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import css from "./AppointmentModal.module.css";
import sprite from "/sprite.svg";
import { toast } from "react-hot-toast";
import type { Nanny } from "../../types/nanny";

interface AppointmentModalProps {
  onClose: () => void;
  nanny: Nanny;
}

interface FormValues {
  address: string;
  phone: string;
  childAge: string;
  meetingTime: string;
  email: string;
  parentName: string;
  comment: string;
}

const schema = yup.object({
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d{9}$/, "Phone must contain 9 digits"),
  childAge: yup
    .string()
    .required("Child's age is required")
    .matches(/^\d+$/, "Age must be a number"),
  meetingTime: yup.string().required("Meeting time is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  parentName: yup
    .string()
    .required("Parent name is required")
    .min(2, "Name must be at least 2 characters"),
  comment: yup.string().required("Comment is required"),
});

export default function AppointmentModal({
  onClose,
  nanny,
}: AppointmentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    const finalData = {
      ...data,
      phone: `+380${data.phone}`,
      nannyId: nanny.id,
    };

    console.log("Appointment data:", finalData);

    toast.success("Meeting request sent successfully!");

    reset();
    onClose();
  };

  return (
    <div className={css.wrapper}>
      <button
        className={css.closeBtn}
        onClick={onClose}
        type="button"
        aria-label="Close modal"
      >
        <svg width="32" height="32" className={css.closeIcon}>
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>

      <h2 className={css.title}>Make an appointment with a babysitter</h2>

      <p className={css.description}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill in the form below so we
        can match you with the perfect care partner.
      </p>

      <div className={css.nannyInfo}>
        <div className={css.avatarWrapper}>
          <img
            src={nanny.avatar_url}
            alt={nanny.name}
            className={css.avatar}
          />
        </div>

        <div className={css.textName}>
          <p className={css.nannyLabel}>Your nanny</p>
          <h3 className={css.nannyName}>{nanny.name}</h3>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.row}>
          <div className={css.inputWrapper}>
            <input
              {...register("address")}
              placeholder="Address"
              className={errors.address ? css.inputError : ""}
            />
            {errors.address && (
              <p className={css.error}>{errors.address.message}</p>
            )}
          </div>

          <div className={css.inputWrapper}>
            <div className={css.phoneWrapper}>
              <span className={css.phonePrefix}>+380</span>
              <input
                {...register("phone")}
                placeholder="XXXXXXXXX"
                className={errors.phone ? css.inputError : ""}
              />
            </div>
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className={css.row}>
          <div className={css.inputWrapper}>
            <input
              {...register("childAge")}
              placeholder="Child's age"
              className={errors.childAge ? css.inputError : ""}
            />
            {errors.childAge && (
              <p className={css.error}>{errors.childAge.message}</p>
            )}
          </div>

          <div className={css.inputWrapper}>
            <div className={css.timeInputWrapper}>
              <input
                type="time"
                {...register("meetingTime")}
                className={errors.meetingTime ? css.inputError : ""}
              />
              <svg width="20" height="20" className={css.clockIcon}>
                <use href={`${sprite}#icon-clock`} />
              </svg>
            </div>
            {errors.meetingTime && (
              <p className={css.error}>{errors.meetingTime.message}</p>
            )}
          </div>
        </div>

        <div className={css.inputWrapper}>
          <input
            {...register("email")}
            placeholder="Email"
            className={errors.email ? css.inputError : ""}
          />
          {errors.email && (
            <p className={css.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={css.inputWrapper}>
          <input
            {...register("parentName")}
            placeholder="Father's or mother's name"
            className={errors.parentName ? css.inputError : ""}
          />
          {errors.parentName && (
            <p className={css.error}>{errors.parentName.message}</p>
          )}
        </div>

        <div className={css.inputWrapper}>
          <textarea
            {...register("comment")}
            placeholder="Comment"
            rows={3}
            className={errors.comment ? css.inputError : ""}
          />
          {errors.comment && (
            <p className={css.error}>{errors.comment.message}</p>
          )}
        </div>

        <button type="submit" className={css.submitBtn}>
          Send
        </button>
      </form>
    </div>
  );
}
