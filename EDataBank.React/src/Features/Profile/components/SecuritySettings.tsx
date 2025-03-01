import { useContext, createContext, useEffect } from "react";
import { List, notification } from "antd";
import { Observer, observer } from "mobx-react-lite";
import { profileStore } from "../store/ProfileStore";
// import { toJS } from "mobx";
import PasswordForm from "./Forms/ResetPasswordForm";
import PhoneNumberForm from "./Forms/ResetPhoneNumberForm";
import EmailForm from "./Forms/ResetEmailForm";
import ResetBackupEmail from "./Forms/ResetBackupEmail";

const profileStoreCtx = createContext(profileStore);

type Props = {};
export const SecuritySettings = observer((props: Props) => {
  const ProfileStore = useContext(profileStoreCtx);

  const formatEmail = (s: string): string => {
    var i = s.indexOf("@");
    var startIndex = (i * 0.2) | 0;
    var endIndex = (i * 0.9) | 0;
    return (
      s.slice(0, startIndex) +
      s.slice(startIndex, endIndex).replace(/./g, "*") +
      s.slice(endIndex)
    );
  };

  const getData = () => [
    {
      title: "Account Password",
      description: (
        <>
          {!ProfileStore.showResetPwdForm ? (
            <div> Current Password: *******</div>
          ) : (
            <div>
              <PasswordForm />
            </div>
          )}
        </>
      ),
      actions: [
        <a
          key="Modify"
          style={{ display: !ProfileStore.showResetPwdForm ? "flex" : "none" }}
          onClick={() => {
            ProfileStore.setShowPasswordForm();
          }}
        >
          <span>Modify</span>
        </a>,
      ],
    },

    {
      title: "Security Phone",
      description: (
        <Observer>
          {() => (
            <>
              {!ProfileStore.showPhoneNumberForm ? (
                <div>
                  {" "}
                  Bound Phone：
                  {ProfileStore.resetPhoneNumber.phoneNumber
                    ? ProfileStore.resetPhoneNumber.phoneNumber.replace(
                        ProfileStore.resetPhoneNumber.phoneNumber.substring(
                          4,
                          11
                        ),
                        "*******"
                      )
                    : "1234".replace("1234".substring(4, 11), "****")}
                </div>
              ) : (
                <div>
                  <PhoneNumberForm />
                </div>
              )}
            </>
          )}
        </Observer>
      ),
      actions: [
        <a
          key="Modify"
          style={{
            display: !ProfileStore.showPhoneNumberForm ? "flex" : "none",
          }}
          onClick={() => {
            ProfileStore.setShowPhoneNumberForm();
          }}
        >
          <span>Modify</span>
        </a>,
      ],
    },

    {
      title: "Security Email",
      description: (
        <Observer>
          {() => (
            <>
              {!ProfileStore.showEmailForm ? (
                <div>
                  {" "}
                  Bound Email：
                  {formatEmail(
                    ProfileStore.resetEmail.email
                      ? ProfileStore.resetEmail.email
                      : "example@mail.com"
                  )}
                </div>
              ) : (
                <div>
                  <EmailForm />
                </div>
              )}
            </>
          )}
        </Observer>
      ),
      actions: [
        <a
          key="Modify"
          style={{ display: !ProfileStore.showEmailForm ? "flex" : "none" }}
          onClick={() => {
            ProfileStore.setShowEmailForm();
          }}
        >
          <span>Modify</span>
        </a>,
      ],
    },
    {
      title: "Backup Email",
      description: (
        <Observer>
          {() => (
            <>
              {!ProfileStore.showBackupEmailForm ? (
                <div>
                  {" "}
                  Bound Email：
                  {formatEmail(
                    ProfileStore.resetBackupEmail.email
                      ? ProfileStore.resetBackupEmail.email
                      : "example@mail.com"
                  )}
                </div>
              ) : (
                <div>
                  <ResetBackupEmail />
                </div>
              )}
            </>
          )}
        </Observer>
      ),
      actions: [
        <a
          key="Modify"
          style={{ display: !ProfileStore.showBackupEmailForm ? "flex" : "none" }}
          onClick={() => {
            ProfileStore.setShowBackupEmailForm();
          }}
        >
          <span>Modify</span>
        </a>,
      ],
    },
  ];
  return (
    <div
      className="ms-Grid"
      dir="ltr"
      style={{
        paddingTop: "8px",
        paddingRight: "40px",
        paddingBottom: "8px",
        paddingLeft: "40px",
      }}
    >
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          <List
            itemLayout="horizontal"
            id="lstsecurity"
            dataSource={getData()}
            renderItem={(item) => (
              <List.Item actions={item.actions}>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
});

export default SecuritySettings;
