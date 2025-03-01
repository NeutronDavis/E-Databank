import React, { FunctionComponent } from "react";

type FormProps = { children: React.ReactNode };

const FormContainer: FunctionComponent<FormProps> = (props: FormProps) => {
  return (
    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6  base-form-container">
      <div className="form-wrapper">
        <div className="form-container">
          <div className="login-Method">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
