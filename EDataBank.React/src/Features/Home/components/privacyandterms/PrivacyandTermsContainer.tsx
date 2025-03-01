import React, { createContext, useContext } from "react";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { Tabs } from "antd";
import { PrimaryButton } from "@fluentui/react";

import { homeStore as HomeStore } from "../../store/HomeStore";
import { PrivacyPolicy } from "../../types/interfaces";
import { observer } from "mobx-react-lite";

const HomeStoreCtx = createContext(HomeStore);
const { TabPane } = Tabs;
type Props = {};

const PrivacyandTermsContainer = observer((props: Props) => {
  const homeStore = useContext(HomeStoreCtx);
  const onRenderFooterContent = React.useCallback(
    () => (
      <div>
        <PrimaryButton
          onClick={() => {
            homeStore.showPrivacyPanel = false;
          }}
        >
          I Agree
        </PrimaryButton>
      </div>
    ),
    [homeStore.showPrivacyPanel]
  );
  return (
    <Panel
      isOpen={homeStore.showPrivacyPanel}
      onDismiss={() => {
        homeStore.showPrivacyPanel = false;
      }}
      type={PanelType.medium}
      hasCloseButton={true}
      headerTextProps={{ hidden: true }}
      closeButtonAriaLabel="Close"
      onRenderFooterContent={onRenderFooterContent}
      isFooterAtBottom={true}
    >
      <Tabs
        tabPosition="top"
        type="card"
        defaultActiveKey={PrivacyPolicy.Privacy}
        activeKey={homeStore.privacyPanel}
        onChange={(key) => {
          homeStore.privacyPanel = key as PrivacyPolicy;
        }}
        size="large"
      >
        <TabPane tab="Privacy Policy" key={PrivacyPolicy.Privacy}>
          <div id="content">
            <div className="medical-facility-sec">
              <div className="med-block">
                <h2>EDataBank.com Privacy Policy</h2>
                <div className="white-bg">
                  <p>
                    Welcome to the EDataBank.com site (the "Site"). Nuovo Forte
                    Limited ("Nuovo Forte") knows that you care how information
                    about you is used and shared and we appreciate your
                    confidence that we will do so carefully and sensibly. By
                    visiting the Site you are accepting the practices described
                    in this Privacy Policy.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Modification</h2>
                <div className="white-bg">
                  <p>
                    Nuovo Forte reserves the right to change any of the terms of
                    this Policy at any time and in its sole discretion. Any
                    changes will be effective upon posting on the Site and Nuovo
                    Forte will use reasonable measures to ensure that changes
                    are prominently posted in a manner designed to afford notice
                    to users of the Site. You are responsible to periodically
                    check for the most current terms that apply to your
                    transactions on the Site. YOUR CONTINUED USE OF THIS SITE
                    AND THE SERVICES FOLLOWING THE POSTING OF ANY CHANGES WILL
                    CONSTITUTE YOUR ACCEPTANCE OF SUCH CHANGES. IF YOU DO NOT
                    AGREE TO THE CHANGES, DO NOT CONTINUE TO USE THE SERVICES OR
                    THIS SITE.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>
                  What Personal Information About Customers Does Nuovo Forte
                  Gather?
                </h2>
                <div className="white-bg">
                  <p>
                    The information we learn from customers helps us personalize
                    and continually improve your service experience at Nuovo
                    Forte. Here are the types of information we gather.
                  </p>
                  <div className="smallhead" id="infoYouGive">
                    Information You Give Us:
                  </div>
                  We receive and store any information you enter on our Site or
                  give us in any other way. You can choose not to provide
                  certain information, but then you might not be able to take
                  advantage of many of our features. We use the information that
                  you provide for such purposes as responding to your requests,
                  customizing future service for you, improving our services,
                  and communicating with you.
                  <br />
                  <div className="smallhead" id="automaticInfo">
                    Automatic Information:
                  </div>
                  We receive and store certain types of information whenever you
                  interact with us. For example, like many web sites, we use
                  "cookies," and we obtain certain types of information when
                  your web browser accesses Nuovo Forte or advertisements and
                  other content served by or on behalf of Nuovo Forte on other
                  web sites.
                  <br />
                  <div className="smallhead" id="emailComm">
                    E-mail Communications:
                  </div>
                  To help us make e-mails more useful and interesting we often
                  receive a confirmation when you open e-mail from Nuovo Forte
                  if your computer supports such capabilities. We also compare
                  our customer list to lists received from other companies in an
                  effort to avoid sending unnecessary messages to our customers.
                  <br />
                  <div className="smallhead" id="otherSources">
                    Information from Other Sources:
                  </div>
                  We might receive information about you from other sources and
                  add it to our account information.
                  <br />
                </div>
              </div>
              <div className="med-block">
                <h2>What about Cookies?</h2>
                <div className="white-bg">
                  <p>
                    Cookies are alphanumeric identifiers that we transfer to
                    your computer's hard drive through your web browser to
                    enable our systems to recognize your browser and to provide
                    features such as, recommended for you, personalized
                    advertisements on other web sites (e.g., Nuovo Forte
                    affiliates with content served by Nuovo Forte and web sites
                    using checkout by Nuovo Forte Payment Service), and storage
                    of items in your Service Cart between visits.
                  </p>
                  <p>
                    The Help portion of the toolbar on most browsers will tell
                    you how to prevent your browser from accepting new cookies,
                    how to have the browser notify you when you receive a new
                    cookie, or how to disable cookies altogether. Additionally,
                    you can disable or delete similar data used by browser
                    add-ons, such as Flash cookies, by changing the add-ons
                    settings or visiting the web site of its manufacturer.
                    However, because cookies allow you to take advantage of some
                    of Nuovo Forte' essential features, we recommend that you
                    leave them turned on.{" "}
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Does Nuovo Forte Share the Information It Receives?</h2>
                <div className="white-bg">
                  <p>
                    Information about our customers is an important part of our
                    business and we are not in the business of selling it to
                    others. We share customer information only as described
                    below and with subsidiaries controlled by Nuovo Forte that
                    either are subject to this Privacy Policy or follow
                    practices at least as protective as those described in this
                    Privacy Policy.
                  </p>
                  <div className="smallhead" id="affiliatedBusiness">
                    Affiliated Businesses We Do Not Control.
                  </div>
                  We work closely with affiliated businesses. In some cases,
                  such as Platform service providers, these businesses operate
                  at Nuovo Forte or sell offerings to you at Nuovo Forte. In
                  other cases, we operate business units, provide services, or
                  sell product lines jointly with these businesses. You can tell
                  when a third party is involved in your transactions and we
                  share customer information related to those transactions with
                  that third party.
                  <br />
                  <div className="smallhead" id="thirdParty">
                    Third-Party Service Providers
                  </div>
                  We employ other companies and individuals to perform functions
                  on our behalf. Examples include completing transactions,
                  delivering packages, sending postal mail and e-mail, removing
                  repetitive information from customer lists, analyzing data,
                  providing marketing assistance, providing search results and
                  links (including paid listings and links), processing credit
                  card payments, and providing customer service. They have
                  access to personal information needed to perform their
                  functions but may not use it for other purposes.
                  <br />
                  <div className="smallhead" id="promotionalOffers">
                    Promotional Offers
                  </div>
                  Sometimes we send offers to selected groups of Nuovo Forte
                  customers on behalf of other businesses. When we do this we do
                  not give that business your name and address.
                  <br />
                  <div className="smallhead" id="businessTransfers">
                    Business Transfers
                  </div>
                  As we continue to develop our business we might sell or buy
                  stores, subsidiaries, or business units. In such transactions,
                  customer information generally is one of the transferred
                  business assets but remains subject to the promises made in
                  any pre-existing Privacy Policy (unless, of course, the
                  customer consents otherwise). Also, in the unlikely event that
                  Nuovo Forte Limited or substantially all of its assets are
                  acquired, customer information will of course be one of the
                  transferred assets.
                  <br />
                  <div className="smallhead" id="protection">
                    Protection of Nuovo Forte and Others
                  </div>
                  We release account and other personal information when we
                  believe release is appropriate to comply with the law; enforce
                  or apply our Terms of Use and other agreements; or protect the
                  rights, property, or safety of Nuovo Forte, our users or
                  others. This includes exchanging information with other
                  companies and organizations for fraud protection and credit
                  risk reduction. Obviously, however, this does not include
                  selling, renting, sharing, or otherwise disclosing personally
                  identifiable information from customers for commercial
                  purposes in violation of the commitments set forth in this
                  Privacy Policy.
                  <br />
                  <div className="smallhead" id="withYourConsent">
                    With Your Consent
                  </div>
                  Other than as set out above, you will receive notice when
                  information about you might go to third parties and you will
                  have an opportunity to choose not to share the information.
                  <br />
                </div>
              </div>
              <div className="med-block">
                <h2>How Secure Is Information About Me?</h2>
                <div className="white-bg">
                  <p>
                    We work to protect the security of your information during
                    transmission by using software that encrypts information you
                    input.
                  </p>
                  <p>
                    We reveal only the last four digits of your credit card
                    numbers when confirming a transaction. Of course, we
                    transmit the entire credit card number to the appropriate
                    credit card company during transaction processing.
                  </p>
                  <p>
                    It is important for you to protect against unauthorized
                    access to your password and to your computer. Be sure to
                    sign off when finished using a shared computer.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>
                  What about Third-Party Advertisers and Links to Other
                  Websites?
                </h2>
                <div className="white-bg">
                  <p>
                    Our site includes third-party advertising and links to other
                    web sites. We do not provide any personally identifiable
                    customer information to these advertisers or third-party web
                    sites.
                  </p>
                  <p>
                    These third-party web sites and advertisers, or Internet
                    advertising companies working on their behalf, sometimes use
                    technology to send the advertisements that appear on our web
                    site directly to your browser. They automatically receive
                    your IP address when this happens. They may also use
                    cookies, JavaScript, web beacons (also known as action tags
                    or single-pixel gifs), and other technologies to measure the
                    effectiveness of their ads and to personalize advertising
                    content. We do not have access to or control over cookies or
                    other features that they may use and the information
                    practices of these advertisers and third-party web sites are
                    not covered by this Privacy Policy. Please contact them
                    directly for more information about their privacy practices.{" "}
                  </p>
                  <p>
                    Nuovo Forte also displays personalized third-party
                    advertising based on personal information about customers,
                    such as purchases on Nuovo Forte, visits to Nuovo Forte
                    Affiliate web sites, or use of payment services like
                    Checkout by Nuovo Forte on other web sites. Although Nuovo
                    Forte does not provide any personal information to
                    advertisers, advertisers (including ad-serving companies)
                    may assume that users who interact with or click on a
                    personalized advertisement meet their criteria to
                    personalize the ad.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>What Information Can I Access?</h2>
                <div className="white-bg">
                  <p>
                    Nuovo Forte gives you access to a broad range of information
                    about your account and your interactions with Nuovo Forte
                    for the purpose of viewing and, in certain cases, updating
                    that information. Examples of information you can access
                    easily at Nuovo Forte include up-to-date information
                    regarding recent transactions; personally identifiable
                    information (including name, e-mail, password,
                    communications and personalized advertising preferences,
                    address book; payment settings (including credit card
                    information and gift certificate, gift card, and check
                    balances); e-mail notification settings (including Alerts);
                    Platform service provider accounts; and Your Profile.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Children"s Privacy</h2>
                <div className="white-bg">
                  <p>
                    Nuovo Forte is very sensitive to the issue of children"s
                    privacy and makes every effort to protect the privacy of
                    children using the Internet. It is possible that the Site,
                    products, and services may not be appropriate for children.
                    Children (persons under the age of 18) are not eligible to
                    do business with us.{" "}
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Data Processing and Safe Harbor</h2>
                <div className="white-bg">
                  <p>
                    Nuovo Forte is committed to proper Internet practices and
                    full compliance with the CAN-SPAM Act of 2003 (15 U.S.C. "
                    7701). It is our policy to prohibit the sending of
                    unsolicited or "Spam" e-mail by this Site or any of our
                    marketing partners.
                  </p>
                  <p>
                    The European Union ("EU") maintains strict privacy laws and
                    these rules differ significantly from United States ("US")
                    and Canadian laws. To reconcile these differences, the US
                    and the EU have created a Safe Harbor that defines mutually
                    acceptable privacy operations. This Site adheres to the Safe
                    Harbor principals. For more information see
                    www.export.gov/safeharbor.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>What Choices Do I Have?</h2>
                <div className="white-bg">
                  <p>
                    As discussed above, you can always choose not to provide
                    information, even though it might be needed to make a
                    purchase or to take advantage of such Nuovo Forte features.
                  </p>
                  <p>
                    You can add or update certain information on pages. When you
                    update information, we usually keep a copy of the prior
                    version for our records.
                  </p>
                  <p>
                    If you do not want to receive e-mail or other mail from us,
                    please adjust your Preferences. If you do not want to
                    receive Terms of Use updates, Policy updates and other legal
                    notices from us those notices will still govern your use of
                    the Site and it is your responsibility to review them for
                    changes.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Notices and Revisions</h2>
                <div className="white-bg">
                  <p>
                    If you choose to visit Nuovo Forte, your visit and any
                    dispute over privacy is subject to this Policy and our Terms
                    of Use, including limitations on damages, resolution of
                    disputes, and application of the laws of the Province of
                    Ontario, Canada. If you have any concern about privacy at
                    Nuovo Forte, please contact us with a thorough description
                    and we will try to resolve it. Our business changes
                    constantly and our Privacy Policy and Terms of Use will
                    change also. We may e-mail periodic reminders of our notices
                    and conditions, unless you have instructed us not to, but
                    you should check our web site frequently to see recent
                    changes. Unless stated otherwise, our current Privacy Policy
                    applies to all information that we have about you and your
                    account. We stand behind the promises we make and will not
                    materially change our policies and practices to make them
                    less protective of customer information collected in the
                    past without the consent of affected customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Terms of Use" key={PrivacyPolicy.Terms}>
          <div id="content">
            <div className="medical-facility-sec">
              <div className="med-block">
                <h2>EDataBank.com Terms of Use</h2>
                <div className="white-bg">
                  <p>
                    Welcome to Nuovo Forte Platform at the EDataBank.com site
                    (the "Site"). Any person wishing to access the Site to
                    purchase items or use any of the web services made available
                    by us or our affiliates (the "Services") must accept these
                    terms of use (the "Agreement"). BY CLICKING THE "I Accept"
                    BUTTON YOU AGREE TO BE BOUND BY THE TERMS OF THIS AGREEMENT.
                    If your use of the Site is as a Nuovo Forte Affiliate or
                    Nuovo Forte Service provider or Nuovo Forte Medical Facility
                    you are also subject to the terms, conditions and
                    requirements of those programs. In the event of a conflict
                    between the requirements of those programs and this
                    Agreement, the applicable program terms will control.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Modification</h2>
                <div className="white-bg">
                  <p>
                    Nuovo Forte Limited ("Nuovo Forte") reserves the right to
                    change any of the terms and conditions in this Agreement and
                    in any policies governing the Site or Services at any time
                    and in its sole discretion. Any changes will be effective
                    upon posting on the Site and Nuovo Forte will use reasonable
                    measures to ensure that changes are prominently posted in a
                    manner reasonably designed to afford notice to users of the
                    Site. You are responsible to periodically check for the most
                    current terms that apply to your transactions on the Site.
                    YOUR CONTINUED USE OF THIS SITE AND THE SERVICES FOLLOWING
                    THE POSTING OF ANY CHANGES WILL CONSTITUTE YOUR ACCEPTANCE
                    OF SUCH CHANGES. IF YOU DO NOT AGREE TO THE CHANGES, DO NOT
                    CONTINUE TO USE THE SERVICES OR THIS SITE.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Eligibility</h2>
                <div className="white-bg">
                  <p>
                    Use of the Site and Services is limited to parties that
                    lawfully can enter into and form contracts under applicable
                    law. For example, EDataBank.com does not sell products for
                    purchase by children. We sell children's products for
                    purchase by adults. If you are under 18, you may use
                    EDataBank.com only with the involvement of a parent or
                    guardian.{" "}
                  </p>
                  <p>
                    You also represent and warrant that if you are a business,
                    you are duly organized, validly existing and in good
                    standing under the laws of the country in which your
                    business is registered and that you have the authority to
                    enter into this Agreement and perform your obligations
                    hereunder.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Nuovo Forte's Role</h2>
                <div className="white-bg">
                  <p>
                    The Site provides a platform for service providers or
                    medical facilities and buyers or patients to come together
                    to negotiate and complete transactions. Nuovo Forte is not
                    involved in the actual transaction between service providers
                    or medical facility and buyers or patients. Nuovo Forte is
                    not an agent of either party and has no authority to act for
                    either the buyer or patient or the service provider or
                    medical facility for any purpose. Nuovo Forte will not act
                    as either party's representative in connection with
                    resolving any disputes between participants related to or
                    arising out of any transaction. Nuovo Forte urges service
                    providers or medical facilities and buyers or patients to
                    cooperate with each other to resolve disputes.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Nuovo Forte Reservation of Rights</h2>
                <div className="white-bg">
                  <p>
                    Nuovo Forte retains the right to determine the content,
                    appearance, design, functionality and all other aspects of
                    the Site and the Services. We reserve the right to re-design
                    and alter the Site and the Services from time to time in
                    order to improve the quality of your experience at the Site.
                    We may in our sole discretion withhold for investigation,
                    refuse to process, restrict shipping destinations, stop
                    and/or cancel any transactions. As a service provider or
                    medical facility, you will stop and/or cancel transactions
                    for your products if we ask you to do so. As a buyer or
                    patient, we will only refund to you amounts you paid (less
                    transaction fees) for a transaction that we stop or cancel
                    for which the service has not been rendered and we are yet
                    to release payment to the service provider or medical
                    facility.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Your Account</h2>
                <div className="white-bg">
                  <p>
                    To access the Services offered by Nuovo Forte you must
                    create an account on our Site associated with a valid e-mail
                    address. Unless expressly authorized by Nuovo Forte you may
                    only create one account per email address. To create an
                    account and register, you must provide your real name,
                    address, phone number and e-mail address and other
                    information required by the application form. Valid credit
                    or debit card information will be needed when you conduct a
                    purchase on our Site. You are responsible for all activities
                    that occur under your account, regardless of whether the
                    activities are undertaken by you, your employees or a third
                    party (including your contractors or agents). Nuovo Forte
                    and its affiliates are not responsible for unauthorized
                    access to your account. You will contact us immediately if
                    you believe an unauthorized party may be using your account
                    or if your account information is lost or stolen.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Password Security</h2>
                <div className="white-bg">
                  <p>
                    Your password may be used only to access the Site, use the
                    Services, electronically sign your transactions, and review
                    your completed transactions. You are solely responsible for
                    maintaining the security of your password. You may not
                    disclose your password to any third party (other than third
                    parties authorized by you to use your account) and are
                    solely responsible for any use of or action taken under your
                    password on this Site. If your password is compromised, you
                    must change your password.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>The Nuovo Forte Payment Service</h2>
                <div className="white-bg">
                  <p>
                    In order to buy items on the Nuovo Forte Platform, you must
                    use Nuovo Forte Payment Service (the "Payment Service"). A
                    Buyer"s or Patient"s authorized credit or debit card payment
                    ("Payment Transaction") is credited and transferred to the
                    Service provider"s or medical facility's designated account
                    ("Service provider / medical facility's Account"). The Buyer
                    or Patient may authorize a Payment Transaction with any
                    major credit or debit card accepted by Nuovo Forte. The
                    Payment Service helps facilitate Platform transactions.
                    However, Nuovo Forte is not a party to the transaction
                    between the buyer or patient and the service provider or
                    medical facility. In case of a dispute the service provider
                    or medical facility and buyer or patient will resolve any
                    dispute directly and not through the Payment Service.{" "}
                  </p>
                  <p>
                    The Payment Service is available to individuals and
                    businesses who meet the terms of eligibility for the Nuovo
                    Forte online platform community and whose applications are
                    acceptable to Nuovo Forte. The Payment Service is generally
                    available seven (7) days per week, twenty-four (24) hours
                    per day, except for scheduled downtime due to system
                    maintenance.{" "}
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Returns and Refunds</h2>
                <div className="white-bg">
                  <p>
                    For any products or services purchased the service provider
                    or medical facility will provide customer return and refund
                    policies which will be displayed on the Site and under which
                    any returns and refunds will be processed by the service
                    provider or medical facility. Any service provider or
                    medical facility"s return and refund policy will be at least
                    as favorable as the then-current Nuovo Forte return and
                    refund policies.{" "}
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Nuovo Forte Participation</h2>
                <div className="white-bg">
                  <p>
                    Employees of Nuovo Forte and its affiliates are permitted to
                    use and enjoy the benefits of the Site in their personal
                    capacity unless they have information about a particular
                    product or service that is not publicly available to any
                    buyer or patient or service provider or medical facility
                    using the Site. Employees of Nuovo Forte or its affiliates,
                    when participating in any transaction in their personal
                    capacity, are subject to this Agreement and the same
                    policies and procedures as any buyer or patient or service
                    provider or medical facility on the Site.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Illegal Activity</h2>
                <div className="white-bg">
                  <div className="smallhead" id="fraud">
                    a. Compliance with Laws; Fraud
                  </div>
                  The Site and Services may be used only for lawful purposes and
                  in a lawful manner. You agree to comply with all applicable
                  laws, statutes, and regulations. You may not register under a
                  false name or use an invalid or unauthorized credit or debit
                  card. You may not impersonate any participant or use another
                  participant's password(s). Fraudulent conduct may be reported
                  to law enforcement, and Nuovo Forte will cooperate to ensure
                  that violators are prosecuted to the fullest extent of the
                  law. You may not post unlawful, harmful, or obscene content or
                  content that infringes on trademarks or copyrights or content
                  that is defamatory about Nuovo Forte or it"s users.
                  <br />
                  <div className="smallhead" id="investigate">
                    b. Investigation
                  </div>
                  Nuovo Forte has the right, but not the obligation, to monitor
                  any activity and content associated with this Site and
                  investigate as we deem appropriate. Nuovo Forte also may
                  investigate any reported violation of its policies or
                  complaints and take any action that it deems appropriate. Such
                  action may include, but is not limited to, issuing warnings,
                  suspension or termination of service, denying access, and/or
                  removal of any materials on the Site including registrations,
                  entries and listings. Nuovo Forte reserves the right and has
                  absolute discretion to remove, screen, or edit any content
                  that violates these provisions or is otherwise deemed
                  objectionable.
                  <br />
                  <div className="smallhead" id="disclosure">
                    c. Disclosure of Information
                  </div>
                  Nuovo Forte also reserves the right to report any activity
                  that it suspects violates any law or regulation to appropriate
                  law enforcement officials, regulators, or other third parties.
                  In order to cooperate with governmental requests, to protect
                  Nuovo Forte's systems and customers, or to ensure the
                  integrity and operation of Nuovo Forte's business and systems,
                  Nuovo Forte may access and disclose any information it
                  considers necessary or appropriate, including but not limited
                  to user contact details, IP addressing and traffic
                  information, usage history, and posted content.
                  <br />
                </div>
              </div>
              <div className="med-block">
                <h2>Privacy; Use of Nuovo Forte Transaction Information</h2>
                <div className="white-bg">
                  <p>
                    Please read the EDataBank.com Privacy Policy. The Privacy
                    Policy may be changed by us in the future. You should check
                    the Privacy Policy frequently for changes. Nuovo Forte and
                    its affiliates may communicate with you in connection with
                    your registrations, entries, listings, sales, and the
                    Services, electronically and in other media, and your
                    consent to such communications regardless of any "Customer
                    Communication Preferences" (or similar preferences or
                    requests) you may have indicated on the Site or by any other
                    means. When you use the Services, some personally
                    identifiable information about you, including your feedback
                    and the e-mail address associated with your account, may be
                    displayed on the Site and may be viewed by potential buyers
                    or patients.
                  </p>
                  <p>
                    You will not directly or indirectly disclose or use any
                    information or data acquired from Nuovo Forte or its
                    affiliates as a result of this Agreement, the transactions
                    contemplated hereby or the parties' performance hereunder
                    (collectively, "Nuovo Forte Transaction Information") except
                    that you may disclose this information as necessary for you
                    to perform your obligations under this Agreement, provided
                    that you ensure that every recipient uses the information
                    only for that purpose and complies with the restrictions
                    applicable to you related to that information. The terms of
                    this section do not prevent you from using other information
                    that you obtain apart from the Nuovo Forte Transaction
                    Information, even if such information is identical to Nuovo
                    Forte Transaction Information, provided that you do not
                    target communications on the basis of the intended recipient
                    being a EDataBank.com user.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>No Warranties</h2>
                <div className="white-bg">
                  <p>
                    THE SITE AND THE SERVICES ARE PROVIDED ON AN "AS IS" BASIS.
                    NUOVO FORTE MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY
                    KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION:
                  </p>
                  <p>
                    a. THE IMPLIED WARRANTIES OF SERVICE PROVIDERABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
                    NON-INFRINGEMENT;
                    <br />
                    b. THAT THE SITE OR THE SERVICES WILL MEET YOUR
                    REQUIREMENTS, WILL ALWAYS BE AVAILABLE, ACCESSIBLE,
                    UNINTERRUPTED, TIMELY, SECURE, OR OPERATE WITHOUT ERROR;
                    <br />
                    c. THAT THE INFORMATION, CONTENT, MATERIALS, OR PRODUCTS
                    INCLUDED ON THE SITE WILL BE AS REPRESENTED BY SERVICE
                    PROVIDERS, AVAILABLE FOR SALE AT THE TIME OF FIXED PRICE
                    SALE, LAWFUL TO SELL, OR THAT SERVICE PROVIDERS OR MEDICAL
                    FACILITIES OR BUYERS OR PATIENTS WILL PERFORM AS PROMISED;
                    <br />
                    d. ANY IMPLIED WARRANTY ARISING FROM COURSE OF DEALING OR
                    USAGE OF TRADE; AND
                    <br />
                    e. ANY OBLIGATION, LIABILITY, RIGHT, CLAIM, OR REMEDY IN
                    TORT, WHETHER OR NOT ARISING FROM THE NEGLIGENCE OF NUOVO
                    FORTE. TO THE FULL EXTENT PERMISSIBLE UNDER APPLICABLE LAW,
                    NUOVO FORTE DISCLAIMS ANY AND ALL SUCH WARRANTIES.
                    <br />
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>General Release</h2>
                <div className="white-bg">
                  <p>
                    BECAUSE NUOVO FORTE IS NOT INVOLVED IN TRANSACTIONS BETWEEN
                    BUYERS OR PATIENTS AND SERVICE PROVIDERS OR MEDICAL
                    FACILITIES OR OTHER PARTICIPANT DEALINGS, IF A DISPUTE
                    ARISES BETWEEN ONE OR MORE PARTICIPANTS, EACH OF YOU RELEASE
                    NUOVO FORTE (AND ITS AGENTS AND EMPLOYEES) FROM CLAIMS,
                    DEMANDS, AND DAMAGES (ACTUAL AND CONSEQUENTIAL) OF EVERY
                    KIND AND NATURE ARISING OUT OF OR IN ANY WAY CONNECTED WITH
                    SUCH DISPUTES.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Indemnity/Limitation of Liability</h2>
                <div className="white-bg">
                  <div className="smallhead" id="defence">
                    a. Indemnity and Defense
                  </div>
                  In as much as Nuovo Forte is not a party to the transactions
                  between buyers or patients and service providers or medical
                  facilities you will defend, indemnify and hold harmless Nuovo
                  Forte and its affiliates (and their respective employees,
                  directors, agents and representatives) from and against any
                  and all claims, costs, losses, damages, judgments, penalties,
                  interest and expenses (including reasonable attorneys' fees)
                  that arises out of or relates to: (i) any actual or alleged
                  breach of your representations, warranties, or obligations set
                  forth in this Agreement; or (ii) your own website or other
                  sales channels, the products you sell, any content you
                  provide, the advertisement, offer, sale or return of any
                  products or service you sell, any actual or alleged
                  infringement of any intellectual property or proprietary
                  rights by any products or service you sell or content you
                  provide, or service provider or medical facility taxes or the
                  collection, payment or failure to collect or pay service
                  provider or medical facility taxes.
                  <br />
                  <div className="smallhead" id="limitationOfLib">
                    b. Limitation of Liability
                  </div>
                  NUOVO FORTE WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND,
                  INCLUDING WITHOUT LIMITATION DIRECT, INDIRECT, INCIDENTAL,
                  PUNITIVE, AND CONSEQUENTIAL DAMAGES, ARISING OUT OF OR IN
                  CONNECTION WITH THIS AGREEMENT, THE SITE, THE SERVICES, THE
                  INABILITY TO USE THE SERVICES, OR THOSE RESULTING FROM ANY
                  GOODS OR SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED
                  OR TRANSACTIONS ENTERED INTO THROUGH THE SITE OR THE SERVICES.
                  <br />
                </div>
              </div>
              <div className="med-block">
                <h2>Applicable Law</h2>
                <div className="white-bg">
                  <p>
                    By visiting the Site you agree that the laws of Nuovo
                    Forte"s registered office jurisdiction, including without
                    limitation the Electronic Commerce Act (S.O. 2000, c.17, as
                    amended), govern this Agreement without giving effect to
                    principles of conflicts of laws.{" "}
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Disputes</h2>
                <div className="white-bg">
                  <p>
                    If a complaint or dispute arises you and Nuovo Forte will
                    first make good faith and reasonable efforts to utilize
                    Nuovo Forte" internal dispute resolution mechanism or other
                    informal mechanisms in order to resolve the dispute. If the
                    complaint remains unresolved, you and Nuovo Forte will
                    utilize an online alternative dispute resolution ("ADR")
                    service provider -- a cost-effective solution that can
                    bridge both geographic and cultural barriers. You and Nuovo
                    Forte consent to ADR as set forth in this provision as the
                    exclusive means of resolving any dispute in the event that
                    resolution by informal methods is unsuccessful. A party
                    shall initiate any ADR proceeding through an established
                    online alternative dispute resolution provider mutually
                    agreed upon by the parties. In the event that you and Nuovo
                    Forte do not agree on a mutually acceptable online ADR
                    provider, each party shall select an ADR provider and those
                    providers shall select an ADR provider to mediate the
                    dispute. This selection will be binding on you and Nuovo
                    Forte. The ADR provider and the parties must comply with the
                    following rules: (i) the arbitration shall be conducted
                    solely by telephone, online and/or based on written
                    submissions; (ii) the arbitration shall not involve personal
                    appearance by the parties or witnesses unless otherwise
                    mutually agreed by the parties; and (iii) any judgment on
                    the award rendered by the arbitrator may be entered in any
                    court of competent jurisdiction. The ADR provider will:{" "}
                  </p>
                  <p>
                    a. give reasonable notice to the parties that their dispute
                    will be heard by the forum;
                    <br />
                    b. provide a clear description of its procedures and costs;
                    <br />
                    c. apply only the laws of Nuovo Forte"s registered office
                    jurisdiction in its evaluation and decision;
                    <br />
                    d. provide each party a reasonable opportunity to be heard
                    through the presentation of oral testimony by telephone,
                    online and/or by written argument and documentary evidence
                    and the offering of written argument and documentary
                    evidence in explanation or rebuttal;
                    <br />
                    e. provide to each of the parties a written statement of its
                    decision and the reasons for the decision, except under
                    circumstances j ustifying confidentiality.
                    <br />
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Copyright</h2>
                <div className="white-bg">
                  <p>
                    All content included on the Site, such as text, graphics,
                    logos, button icons, images, audio clips, digital downloads,
                    data compilations, and software, is the property of Nuovo
                    Forte or its content suppliers and is protected by United
                    States and international copyright laws. The compilation of
                    all content on this Site is the exclusive property of Nuovo
                    Forte and is protected by U.S. and international copyright
                    laws. All software used on this site is the property of
                    Nuovo Forte or its software suppliers and is protected by
                    United States and international copyright laws.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Your Grant</h2>
                <div className="white-bg">
                  <p>
                    By entering into this Agreement and registering on the
                    platform, you grant us a royalty-free, non-exclusive,
                    worldwide, perpetual, irrevocable right and license to use,
                    reproduce, perform, display, distribute, adapt, modify,
                    re-format, create derivative works of, and otherwise
                    commercially or non-commercially exploit in any manner, any
                    and all of the content you submit to Nuovo Forte and its
                    affiliates, and to sublicense the foregoing rights to our
                    affiliates and operators of any website or other online
                    point of presence (other than the Site) through which the
                    Site and/or products or services available thereon are
                    syndicated, offered, merchandised, advertised or described;
                    provided, however, that we will not alter any of your
                    trademarks (i.e., trademarks of yours that you provide to us
                    in non-text form for branding purposes that are separate
                    from and not embedded or otherwise incorporated in any
                    product specific information or materials) from the form
                    provided by you (except to re-size trademarks to the extent
                    necessary for presentation, so long as the relative
                    proportions of such trademarks remain the same) and will
                    comply with your removal requests as to specific uses of
                    your trademarks (provided you are unable to do so using
                    standard functionality made available to you via the Site or
                    Services); provided further, however, that nothing in this
                    Agreement will prevent or impair our right to use without
                    your consent the content and any other materials provided by
                    you, to the extent that such use is allowable without a
                    license from you or your affiliates under applicable law
                    (e.g., fair use under copyright law, referential use under
                    trademark law, or valid license from a third party). You
                    represent and warrant that you own or otherwise control all
                    of the rights to the content you submit to Nuovo Forte and
                    its affiliates, and that the use of such materials by Nuovo
                    Forte and its affiliates will not infringe upon or violate
                    the rights of any third party.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>General Provisions</h2>
                <div className="white-bg">
                  <div className="smallhead" id="agreement">
                    a. Entire Agreement
                  </div>
                  This Agreement, including any provisions incorporated by
                  reference, and the general terms and conditions of the Site,
                  including but not limited to the Privacy Notice, constitutes
                  the entire agreement of the parties with respect to the
                  subject matter hereof, and supersedes and cancels all prior
                  and contemporaneous agreements, claims, representations, and
                  understandings of the parties in connection with the subject
                  matter hereof.
                  <br />
                  <div className="smallhead" id="beneficiary">
                    b. No Agency; Third-Party Beneficiary
                  </div>
                  Nuovo Forte is not your agent, fiduciary, trustee, or
                  representative. Nothing expressed or mentioned in or implied
                  from this Agreement is intended or shall be construed to give
                  to any person other than the parties hereto any legal or
                  equitable right, remedy, or claim under or in respect to this
                  Agreement. This Agreement and all of the representations,
                  warranties, covenants, conditions, and provisions hereof are
                  intended to be and are for the sole and exclusive benefit of
                  Nuovo Forte and you.
                  <br />
                  <div className="smallhead" id="serva">
                    c. Severability
                  </div>
                  If any provision of this Agreement shall be deemed unlawful,
                  void, or for any reason unenforceable, then that provision
                  shall be deemed severed from these terms and conditions and
                  shall not affect the validity and enforceability of any
                  remaining provisions.
                  <br />
                  <div className="smallhead" id="waiver">
                    d. No Waiver
                  </div>
                  We will not be considered to have waived any of our rights or
                  remedies described in this Agreement unless the waiver is in
                  writing and signed by us. No delay or omission by us in
                  exercising our rights or remedies will impair or be construed
                  as a waiver. Any single or partial exercise of a right or
                  remedy will not preclude further exercise of any other right
                  or remedy. Nuovo Forte's failure to enforce the strict
                  performance of any provision of this Agreement will not
                  constitute a waiver of Nuovo Forte's right to subsequently
                  enforce such provision or any other provisions of this
                  Agreement.
                  <br />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab=" Terms & Conditions" key={PrivacyPolicy.Conditions}>
          <div id="content">
            <div className="medical-facility-sec">
              <div className="med-block">
                <h2>
                  EDataBank.com Service Provider or Medical Facility Program
                  Terms and Conditions
                </h2>
                <div className="white-bg">
                  <p>
                    This Service provider or medical facility Agreement
                    (“Agreement”) contains the terms and conditions that govern
                    your participation in the Nuovo Forte Service Provider or
                    Medical Facility Program (the “Program”). For purposes of
                    reading this Agreement, “we” and its variants means Nuovo
                    Forte Limited and “you” are the applicant. “Nuovo Forte
                    Site” means the EDataBank.com site. “Your site or profile”
                    means any site and any software application that you link to
                    the Nuovo Forte Site. “Services” means any of the web
                    services made available by us or our affiliates
                  </p>
                  <p className="cap">
                    BY CHECKING THE BOX INDICATING THAT YOU AGREE TO THE TERMS
                    AND CONDITIONS OF THIS AGREEMENT OR BY CONTINUING TO
                    PARTICIPATE IN THE SERVICE PROVIDER OR MEDICAL FACILITY
                    PROGRAM FOLLOWING OUR POSTING OF A CHANGE TO THIS AGREEMENT
                    OR TO OTHER OPERATIONAL DOCUMENTS (AS DEFINED BELOW), YOU
                    (A) AGREE TO BE BOUND BY THIS SERVICE PROVIDER OR MEDICAL
                    FACILITY AGREEMENT; (B) ACKNOWLEDGE THAT YOU ARE NOT RELYING
                    ON ANY REPRESENTATION, GUARANTEE, OR STATEMENT OTHER THAN AS
                    PROVIDED IN THIS AGREEMENT (C) AFFIRM THAT YOU ARE LAWFULLY
                    ABLE TO ENTER INTO CONTRACTS (E.G., YOU ARE NOT A MINOR);
                    AND (D) IF YOU ARE REPRESENTING A COMPANY OR OTHER LEGAL
                    ENTITY, THEN YOU WARRANT THAT YOU ARE AUTHORIZED TO BIND
                    YOUR COMPANY TO THIS AGREEMENT
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Description of the Program</h2>
                <div className="white-bg">
                  <p>
                    The Service Provider or Medical Facility Program provides a
                    platform for third-party service providers or medical
                    facilities and buyers or patients to negotiate and complete
                    transactions. Nuovo Forte is not involved in the actual
                    transaction between service providers or medical facilities
                    and buyers or patients and is not the agent of and has no
                    authority to act for either party for any purpose. As a
                    service provider or medical facility, you may list any item
                    on the Nuovo Forte Site unless it is a prohibited item as
                    defined in this Agreement (“Excluded Products or Services”)
                    or is otherwise prohibited by law. A “Product or Service” is
                    any item sold through the Nuovo Forte Site other than
                    Excluded Products or Services
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Program Requirements</h2>
                <div className="white-bg">
                  <p>
                    By participating in the Program you agree that you will
                    comply with this Agreement, Nuovo Forte Terms of Use and all
                    policies and other documents referred to in this Agreement
                    (collectively, “Operational Documents”).
                  </p>
                  <p>
                    You will provide us with any information that we request to
                    verify your compliance with this Agreement or any
                    Operational Documents. If we determine that you have not
                    complied with any requirement of this Agreement or other
                    Operational Documents, we may (in addition to aany other
                    rights or remedies available to us) withhold amounts payable
                    to you under this Agreement, terminate this Agreement, or
                    both.
                  </p>
                  <p>In addition, you hereby consent to us:</p>
                  <ul className="dots-list">
                    <li>
                      sending you emails relating to the Program from time to
                      time;
                    </li>
                    <li>
                      monitoring, recording, using, and disclosing information
                      about your site or profile and visitors to your site or
                      profile that we obtain in connection with your
                      participation in the Program provided that any information
                      will be handled in accordance with the Privacy Policy; and
                    </li>
                    <li>
                      monitoring your site or profile to verify compliance with
                      this Agreement and the Operational Documents.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="med-block">
                <h2>Enrollment</h2>
                <div className="white-bg">
                  <p>
                    To begin the enrollment process, you must submit a complete
                    and accurate Program application. You must identify your
                    site or profile in your application. We will evaluate your
                    application and notify you of its acceptance or rejection.
                    We may reject your application if we determine that your
                    site or profile is unsuitable. Unsuitable sites or profiles
                    include those that:
                  </p>
                  <ul className="alpha-list">
                    <li>
                      do not have valid license to operate in your jurisdiction;
                    </li>
                    <li>
                      use staff with no valid license to work in your
                      jurisdiction;
                    </li>
                    <li>promote or contain sexually explicit materials;</li>
                    <li>promote violence or contain violent materials;</li>
                    <li>
                      promote or contain libelous or defamatory materials;
                    </li>
                    <li>
                      promote discrimination, or employ discriminatory practices
                      based on race, sex, religion, nationality, disability,
                      sexual orientation, or age;
                    </li>
                    <li>promote or undertake illegal activities;</li>
                    <li>
                      include any trademark of Nuovo Forte or its affiliates, or
                      a variant or misspelling of a trademark of Nuovo Forte or
                      its affiliates, in any domain name;
                    </li>
                    <li>
                      include any trademark of Nuovo Forte or its affiliates in
                      any username, group name, or other identifier on any
                      social networking website; or
                    </li>
                    <li>otherwise violate intellectual property rights.</li>
                    <p>
                      If we reject your application, you are welcome to reapply
                      at any time. However, if we accept your application and we
                      later determine that your site or profile is unsuitable,
                      we may terminate this Agreement.
                    </p>
                    <p>
                      You will ensure that the information in your Program
                      application and otherwise affiliated with your account,
                      including your email address and other contact information
                      and identification of your site or profile, is at all
                      times complete, accurate, and up-to-date. We may send
                      notifications, approvals and other communications relating
                      to the Program and this Agreement to the email address
                      then-currently affiliated with your Program account. You
                      will be deemed to have received all notifications,
                      approvals, and other communications sent to that email
                      address even if the email address affiliated with your
                      account is no longer current.
                    </p>
                  </ul>
                </div>
              </div>
              <div className="med-block">
                <h2>Your Account</h2>
                <div className="white-bg">
                  <p>
                    To access the Services offered by us, you must create an
                    account on our Site associated with a valid e-mail address.
                    Unless explicitly permitted, you may only create one account
                    per email address. To create an account and register, you
                    must provide your real name, address, phone number and
                    e-mail address. Valid credit or debit card information will
                    be needed when you conduct a purchase on our Site. Valid
                    business bank account information will be needed when you
                    carry out a sale of your product or service on our Site.
                  </p>
                  <p>
                    You are responsible for all activities that occur under your
                    account, regardless of whether the activities are undertaken
                    by you, your employees or a third party (including your
                    contractors or agents) and we and our affiliates are not
                    responsible for unauthorized access to your account. You
                    will contact us immediately if you believe an unauthorized
                    third party may be using your account or if your account
                    information is lost or stolen.
                  </p>
                </div>
              </div>

              <div className="med-block">
                <h2>Password Security</h2>
                <div className="white-bg">
                  <p>
                    Your password may be used only to access the Site, use the
                    Services, electronically sign your transactions and review
                    your completed transactions. You are solely responsible for
                    maintaining the security of your password. You may not
                    disclose your password to any third party (other than third
                    parties authorized by you to use your account) and are
                    solely responsible for any use of or action taken under your
                    password on this Site. If your password is compromised, you
                    must change your password.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Fees and Payment Terms</h2>
                <div className="white-bg">
                  <p>
                    You agree that when your item sells or your service is
                    provided, Nuovo Forte will collect the sales price from the
                    buyer or patient. Before depositing product or service sales
                    price into your account Nuovo Forte will deduct the
                    following:
                  </p>

                  <p>
                    a) A transaction charge of five percent (5%) of the product
                    or service price (the "Fee").
                    <br />
                    b) Any amounts due to Affiliates provided that such amounts
                    are as offered by you when you sign-up for the Nuovo Forte
                    Affiliate Program.
                    <br />
                    c) Any sales taxes that Nuovo Forte is under obligation to
                    withhold and pay directly to your Country Government.
                    <br />
                  </p>

                  <p>
                    You will be responsible for payment of charges from
                    providers of payment solutions such as credit or debit card
                    or PayPal, and such charges will be applied before the
                    balance of sales price after above deductions is deposited
                    in your account. Shipping costs, if applicable, will be
                    collected from buyer or patients and paid directly to
                    providers of shipping solutions.{" "}
                  </p>
                  <p>
                    Applicable Fee and payment terms may vary in the future. You
                    should check regularly for applicable Fee and payment terms.{" "}
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Your Transactions</h2>
                <div className="white-bg">
                  <p>
                    For sales where you list goods or services at a fixed price
                    ("fixed price sales"), you are obligated to sell the goods
                    or services at the listed price to buyer or patients who
                    meet the terms of sale. By listing an item in a fixed price
                    sale, you represent and warrant to prospective buyer or
                    patients that you have the right and ability to sell, and
                    that the listing is accurate, current, and complete and is
                    not misleading or otherwise deceptive.{" "}
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Your Obligation</h2>
                <div className="white-bg">
                  <p>
                    By entering into this Agreement and posting a listing for a
                    fixed price sale, you agree to complete the transaction in
                    accordance with this Agreement.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Service Provider or Medical Facility Taxes.</h2>
                <div className="white-bg">
                  <p>
                    You agree that it is your responsibility to determine
                    whether Service Provider or Medical Facility Taxes apply to
                    your transactions and to collect, report, and remit the
                    correct Service Provider or Medical Facility Taxes to the
                    appropriate tax authority. You also agree that Nuovo Forte
                    is not obligated to determine whether Service Provider or
                    Medical Facility Taxes apply and is not responsible to
                    collect, report, or remit any sales, use, or similar taxes
                    arising from any transaction. "Service Provider or Medical
                    Facility Taxes" means any and all sales, goods and services,
                    use, excise, import, export, value added, consumption and
                    other taxes and duties assessed, incurred or required to be
                    collected or paid for any reason in connection with any
                    advertisement, offer or sale of products or services by you
                    on or through the Site, or otherwise in connection with any
                    action, inaction or omission of you or any of affiliate of
                    yours, or any of your or their respective employees, agents,
                    contractors or representatives.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Applicable Policies and Guidelines</h2>
                <div className="white-bg">
                  <p>
                    You agree to abide by the procedures and guidelines
                    published on the Nuovo Forte Site for conducting fixed price
                    sales, which are incorporated by reference in this
                    Agreement. The procedures and guidelines explain the
                    processes and set out acceptable conduct and prohibited
                    practices. We may change these procedures and guidelines in
                    the future, and such changes will be effective immediately
                    upon posting on the Nuovo Forte Site. You should refer
                    regularly to the Site to understand the current procedures
                    and guidelines for participating and to be sure that the
                    items you offer for sale can be sold or services you provide
                    can be provided on the Site.{" "}
                  </p>
                  <p>
                    For each item you list on the Site, you will provide to us
                    the state or country from which the item ships, if
                    applicable. You will provide to us (using the processes and
                    timing that we designate) any requested information
                    regarding shipment or service delivery, tracking (to the
                    extent available) and transaction status, and we may make
                    any of this information publicly available. You may send
                    customers emails concerning shipping confirmation of product
                    or delivery of service you sell in a format and manner
                    reasonably acceptable to us. Promptly after shipment of a
                    customer's transaction (or any portion of the customer's
                    transaction) or delivery of services, you will accurately
                    inform us that the service has been delivered or transaction
                    has been shipped (and, in the case of a customer transaction
                    that is shipped in more than one shipment, accurately inform
                    us which portion of the transaction has been shipped), using
                    our standard functionality for communicating such
                    information when we make that functionality available to you
                    ("Confirmation of Shipment or Service Delivered"). If you
                    fail to provide Confirmation of Shipment or Service
                    Delivered within the time frame specified by us we may in
                    our sole discretion cancel (and/or direct you to stop and/or
                    cancel) any such transaction, and you will stop and/or
                    cancel any such transaction upon such request by us. You
                    will comply with any instructions from the manufacturer,
                    distributor and/or licensor of a product or service
                    regarding Street Date for Delivery (which means the date, if
                    any, specified by the manufacturer, distributor and/or
                    licensor of a product or service as the date before which
                    such product or service should not be delivered or otherwise
                    made available to customers) or the Street Date for
                    Disclosure (which means the date, if any, specified by the
                    manufacturer, distributor and/or licensor of a product or
                    service as the date before which specified information
                    regarding such product or service (e.g., title of a book)
                    should not be disclosed publicly).
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>The Nuovo Forte Payment Service</h2>
                <div className="white-bg">
                  <p>
                    IN ORDER TO SELL ITEMS ON NUOVO FORTE PLATFORM YOU MUST
                    REGISTER WITH NUOVO FORTE AND USE THE NUOVO FORTE PAYMENT
                    SERVICE (the "Payment Service").
                  </p>

                  <p>
                    a. The Payment Service facilitates the purchase of service
                    provider or medical facility items listed on the Site. A
                    buyer or patient's authorized credit or debit card payment
                    ("Payment Transaction") is credited to a registered service
                    provider or medical facility's Account Summary, and funds
                    are periodically transferred to the service provider or
                    medical facility's designated checking account ("Service
                    Provider or Medical Facility's Account"). The buyer or
                    patient may authorize a Payment Transaction with any major
                    credit or debit card accepted by Nuovo Forte. While the
                    Payment Service facilitates Platform transactions, Nuovo
                    Forte is not the purchaser of the service provider or
                    medical facility's goods or services. Service provider or
                    medical facility will resolve any disputes directly with
                    buyer or patients and not through the Payment Service. As a
                    service provider or medical facility, you must register
                    online with Nuovo Forte to use the Payment Service. You must
                    provide us true and accurate information when registering
                    and must maintain and update that information as applicable.
                    You will not impersonate any person or use a name that you
                    are not legally authorized to use. You authorize us to
                    verify your information (including any updated information),
                    to obtain credit reports about you in order to approve your
                    use of the Payment Service and also from time to time while
                    you are registered with the Payment Service (including
                    credit reports about service provider's or medical
                    facility's spouse if service provider or medical facility
                    lives in a community property state) and to obtain an
                    initial credit authorization from your credit or debit card
                    issuer at the time of your registration.
                    <br />
                    b. The Payment Service is available only to applicants who
                    meet the terms of eligibility for the Nuovo Forte online
                    platform community, who have been issued a credit or debit
                    card acceptable by Nuovo Forte, and whose applications are
                    otherwise acceptable to Nuovo Forte.
                    <br />
                    c. The Payment Service is generally available seven (7) days
                    per week, twenty-four (24) hours per day, except for
                    scheduled downtime due to system maintenance. We can
                    initiate Payment Transaction credits to Service Provider's
                    or Medical Facility's Account only on a Business Day when
                    the automated clearing houses are open for business. A
                    Business Day is a Monday through Friday, excluding federal
                    banking holidays. We will inform you of each completed
                    transaction using our standard procedures. In addition, you
                    can access your Payment Service transaction information
                    online in your Service Provider or Medical Facility Account.
                    You may access the Service Provider's or Medical Facility's
                    Transactions feature only with a browser or app that is
                    compatible with the Payment Service, including any security
                    features that are a part of the Payment Service.
                    <br />
                    d. You may provide refunds or adjustments to buyers or
                    patients for their Platform purchases through the Payment
                    Service using functionality we enable for your account. This
                    functionality may be modified or discontinued by us at any
                    time without notice and is subject to the limitations on the
                    Site and the terms of this Agreement. You may not create
                    invoices for Platform sales.
                    <br />
                    e. Transfers to your Service Provider's or Medical
                    Facility's Account will generally be credited within 5
                    Business Days of the date we initiate the transfer. On
                    occasion we may send you a paper check instead of an
                    electronic credit. We will do so, for instance, if your bank
                    will not accept an electronic credit to Service Provider's
                    or Medical Facility's Account.
                    <br />
                    f. If we reasonably conclude based on information available
                    to us that your actions and/or performance in connection
                    with the Platform may result in buyer or patient disputes,
                    chargebacks or other claims, then we may, in our discretion,
                    delay initiating remittances and withhold payments to be
                    made or that are otherwise due to you under this Agreement
                    for the shorter of: (a) a period of 90 days following the
                    initial date of suspension; or (b) completion of any
                    investigation(s) regarding any service provider or medical
                    facility actions and/or performance in connection with this
                    Agreement. We will not be liable to you if we act in
                    accordance with the provisions of this Section.
                    <br />
                    g. All notices will be sent by e-mail or will be posted on
                    the Site or by any other means then specified by Nuovo
                    Forte. We will send notices to you at the e-mail address
                    maintained in Nuovo Forte's records for you. You will
                    monitor your e-mail messages frequently to ensure awareness
                    of any notices sent by us. You will send notices to us using
                    the functionality for contacting Nuovo Forte provided on the
                    Nuovo Forte Site from time to time.
                    <br />
                    h. There is no fee for registering for the Payment Service,
                    but you will be responsible for paying transaction fees
                    charged by providers of credit or debit cards or other
                    payment solutions such as PayPal.
                    <br />
                    i. We may earn interest or other compensation from the
                    balances in our accounts that result from the timing
                    difference between our being paid by buyer or patient and
                    our bank account being debited to pay Payment Transaction
                    credits. We may obtain reimbursement of any amounts owed by
                    you by deducting from future payments owed to you, reversing
                    any credits to your Service Provider's or Medical Facility's
                    Account, charging your credit card, or seeking reimbursement
                    from you by any other lawful means. You authorize us to use
                    any of the foregoing methods to seek reimbursement,
                    including the debiting of your credit or debit card or
                    checking account.
                    <br />
                    j. You may terminate your participation in the Payment
                    Service at any time by informing us using the method
                    provided by Nuovo Forte for such termination. We may
                    terminate your participation in the Payment Service program
                    at any time upon notice to you. Upon termination, you must
                    pay us whatever Fees were incurred prior to the effective
                    date of the termination. Upon termination, any pending
                    transactions will be canceled.
                    <br />
                    k. Upon termination we reserve the right to set off against
                    any payments to be made to you, an amount adequate to cover
                    chargebacks, refunds, adjustments or other amounts paid to
                    buyer or patients in connection with Platform purchases from
                    Service Provider or Medical Facility's Account for a
                    prospective three-month period. At the end of such period
                    following termination, we will disburse to you any amount
                    not used to offset chargebacks, refunds, adjustments, or
                    such other amounts paid to buyers or patients, or seek
                    reimbursement from you via any of the means authorized in
                    this Agreement for any additional amount required to offset
                    payments to buyers or patients, as applicable.
                    <br />
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Nuovo Forte Reservation of Rights</h2>
                <div className="white-bg">
                  <p>
                    Nuovo Forte retains the right to determine the content,
                    appearance, design, functionality and all other aspects of
                    the Site and the Services. We reserve the right to re-design
                    and alter the Site and the Services from time to time in
                    order to improve the quality of your experience at the Site.
                    We may at our discretion withhold for investigation, refuse
                    to process, restrict shipping destinations, stop and/or
                    cancel any transactions. As a service provider or medical
                    facility, you will stop and/or cancel transactions for your
                    products or services if we ask you to do so. You will refund
                    any customer that has been charged for a transaction that we
                    stop or cancel.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Nuovo Forte Participation</h2>
                <div className="white-bg">
                  <p>
                    . Employees of Nuovo Forte and its affiliates are permitted
                    to participate in their personal capacity (i.e., not as
                    Nuovo Forte employees, representatives, or agents of Nuovo
                    Forte or its affiliates) in the transactions conducted
                    through this Site (unless they have confidential information
                    about a particular item). Employees of Nuovo Forte and its
                    affiliates, when participating in any transaction in their
                    personal capacity, are subject to Nuovo Forte Terms of Use
                    and the procedures and guidelines contained on the Site.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Returns and Refunds</h2>
                <div className="white-bg">
                  <p>
                    For all of your products or services you will provide us
                    with your customer return and refund policies for display on
                    the Site and accept and process returns, refunds and
                    adjustments relating to your products or services in
                    accordance with this Agreement and the posted policies at
                    the time of the applicable transaction. If you notify us of
                    any changes to these policies, we will use commercially
                    reasonable efforts to post the changes. No change will be
                    effective as to your products or services until we post the
                    change on the Site. Your policies will be at least as
                    favorable as the then-current Nuovo Forte refund policies
                    published on the Nuovo Forte Site. You will determine and
                    calculate the amount of all refunds and adjustments
                    (including any taxes, shipping and handling or other
                    charges) or other amounts to be paid by you to buyers or
                    patients in connection with Platform purchases, using
                    functionality we enable for your account, and will route all
                    such payments through Nuovo Forte. We will provide any such
                    payments to the buyers or patients (which may be in the same
                    payment form originally used to purchase your product or
                    service) and you will reimburse us for all amounts so paid.
                    When a sale is returned, the buyer or patient receives a
                    100% refund less transaction charge, if applicable. Payouts
                    from that sale are debited back out of the corresponding
                    vendor and affiliate accounts. We may offset such payments
                    against any amounts to be remitted or paid by Nuovo Forte to
                    you under this Agreement or seek reimbursement from you via
                    any of the means authorized. In case of a return Nuovo Forte
                    will refund the Fee less charges from payment solution
                    providers, and the balance will be refunded by you.{" "}
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Illegal Activity</h2>
                <div className="white-bg">
                  <div className="smallhead" id="16a">
                    a. Compliance with Laws; Fraud
                  </div>
                  The Site and Services may be used only for lawful purposes and
                  in a lawful manner. You agree to comply with all applicable
                  laws, statutes, and regulations. You may not register under a
                  false name or use an invalid or unauthorized credit or debit
                  card. You may not impersonate any participant or use another
                  participant's password(s). Such fraudulent conduct is a
                  violation of federal and state laws. Fraudulent conduct may be
                  reported to law enforcement, and Nuovo Forte will cooperate to
                  ensure that violators are prosecuted to the fullest extent of
                  the law. You may not post unlawful, harmful, or obscene
                  content or content that infringes on trademarks or copyrights
                  or content that is defamatory about Nuovo Forte or it's users.
                  <br />
                  <div className="smallhead" id="16b">
                    b. Investigation
                  </div>
                  Nuovo Forte has the right, but not the obligation, to monitor
                  any activity and content associated with this Site and
                  investigate as we deem appropriate. Nuovo Forte also may
                  investigate any reported violation of its policies or
                  complaints and take any action that it deems appropriate. Such
                  action may include, but is not limited to, issuing warnings,
                  suspension or termination of service, denying access, and/or
                  removal of any materials on the Site, including listings.
                  Nuovo Forte reserves the right and has absolute discretion to
                  remove, screen, or edit any content that violates these
                  provisions or is otherwise objectionable.
                  <br />
                  <div className="smallhead" id="16c">
                    c. Disclosure of Information
                  </div>
                  Nuovo Forte also reserves the right to report any activity
                  that it suspects violates any law or regulation to appropriate
                  law enforcement officials, regulators, or other third parties.
                  In order to cooperate with governmental requests, to protect
                  Nuovo Forte's systems and customers, or to ensure the
                  integrity and operation of Nuovo Forte's business and systems,
                  Nuovo Forte may access and disclose any information it
                  considers necessary or appropriate, including but not limited
                  to user contact details, IP addressing and traffic
                  information, usage history, and posted content.
                  <br />
                </div>
              </div>
              <div className="med-block">
                <h2>Privacy; Use of Nuovo Forte Transaction Information</h2>
                <div className="white-bg">
                  <p>
                    Please read the EDataBank.com Privacy Policy. The Privacy
                    Policy may be changed by us in the future. You should check
                    the Privacy Policy frequently for changes. Nuovo Forte and
                    its affiliates may communicate with you in connection with
                    your listings, sales, and the Services electronically and in
                    other media, and your consent to such communications
                    regardless of any "Customer Communication Preferences" (or
                    similar preferences or requests) you may have indicated on
                    the Site or by any other means. When you use the Services,
                    some personally identifiable information about you,
                    including your feedback and the e-mail address associated
                    with your account, may be displayed on the Site and may be
                    viewed by potential buyer or patients.
                  </p>
                  <p>
                    You will not directly or indirectly disclose, convey or use
                    any transaction information or other data or information
                    acquired from Nuovo Forte or its affiliates as a result of
                    this Agreement, the transactions contemplated hereby or the
                    parties' performance hereunder (collectively, "Nuovo Forte
                    Transaction Information"), except you may disclose this
                    information as necessary for you to perform your obligations
                    under this Agreement, provided that you ensure that every
                    recipient uses the information only for that purpose and
                    complies with the restrictions applicable to you related to
                    that information. The terms of this section do not prevent
                    you from using other information that you obtain apart from
                    the Nuovo Forte Transaction Information, even if such
                    information is identical to Nuovo Forte Transaction
                    Information, provided that you do not target communications
                    on the basis of the intended recipient being a
                    EDataBank.com user.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>No Warranties</h2>
                <div className="white-bg">
                  <p>
                    THE SITE AND THE SERVICES ARE PROVIDED TO YOU ON AN "AS IS"
                    BASIS. NUOVO FORTE MAKES NO OTHER REPRESENTATIONS OR
                    WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
                    WITHOUT LIMITATION:
                  </p>

                  <p>
                    a. THE IMPLIED WARRANTIES OF SERVICE PROVIDER OR MEDICAL
                    FACILITYABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE,
                    AND NON-INFRINGEMENT;
                    <br />
                    b. THAT THE SITE OR THE SERVICES WILL MEET YOUR
                    REQUIREMENTS, WILL ALWAYS BE AVAILABLE, ACCESSIBLE,
                    UNINTERRUPTED, TIMELY, SECURE, OR OPERATE WITHOUT ERROR;
                    <br />
                    c. THAT SERVICE PROVIDER OR MEDICAL FACILITIES OR BUYER OR
                    PATIENTS WILL PERFORM AS PROMISED;
                    <br />
                    d. ANY IMPLIED WARRANTY ARISING FROM COURSE OF DEALING OR
                    USAGE OF TRADE; AND
                    <br />
                    e. ANY OBLIGATION, LIABILITY, RIGHT, CLAIM, OR REMEDY IN
                    TORT, WHETHER OR NOT ARISING FROM THE NEGLIGENCE OF NUOVO
                    FORTE. TO THE FULL EXTENT PERMISSIBLE UNDER APPLICABLE LAW,
                    NUOVO FORTE DISCLAIMS ANY AND ALL SUCH WARRANTIES.
                    <br />
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>General Release</h2>
                <div className="white-bg">
                  <p>
                    BECAUSE NUOVO FORTE IS NOT INVOLVED IN TRANSACTIONS BETWEEN
                    BUYERS OR PATIENTS AND SERVICE PROVIDERS OR MEDICAL
                    FACILITIES OR OTHER PARTICIPANT DEALINGS, IF A DISPUTE
                    ARISES YOU RELEASE NUOVO FORTE (AND ITS AGENTS AND
                    EMPLOYEES) FROM CLAIMS, DEMANDS, AND DAMAGES (ACTUAL AND
                    CONSEQUENTIAL) OF EVERY KIND AND NATURE, KNOWN AND UNKNOWN,
                    SUSPECTED AND UNSUSPECTED, DISCLOSED AND UNDISCLOSED,
                    ARISING OUT OF OR IN ANY WAY CONNECTED WITH SUCH DISPUTES.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Indemnity/Limitation of Liability</h2>
                <div className="white-bg">
                  <div className="smallhead" id="20a">
                    a. Indemnity and Defense
                  </div>
                  In as much as Nuovo Forte is not a party to the transactions
                  between buyers or patients and service providers or medical
                  facilities you will defend, indemnify and hold harmless Nuovo
                  Forte and its affiliates (and their respective employees,
                  directors, agents and representatives) from and against any
                  and all claims, costs, losses, damages, judgments, penalties,
                  interest and expenses (including reasonable attorneys' fees)
                  that arises out of or relates to: (i) any actual or alleged
                  breach of your representations, warranties, or obligations set
                  forth in this Agreement; or (ii) your own website or other
                  sales channels, the products or services you sell, any content
                  you provide, the advertisement, offer, sale or return of any
                  products or services you sell, any actual or alleged
                  infringement of any intellectual property or proprietary
                  rights by any products or services you sell or content you
                  provide, or Service provider or medical facility Taxes or the
                  collection, payment or failure to collect or pay Service
                  Provider or Medical Facility Taxes. <br />
                  <div className="smallhead" id="20b">
                    b. Limitation of Liability
                  </div>
                  NUOVO FORTE WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND,
                  INCLUDING WITHOUT LIMITATION DIRECT, INDIRECT, INCIDENTAL,
                  PUNITIVE, AND CONSEQUENTIAL DAMAGES, ARISING OUT OF OR IN
                  CONNECTION WITH THIS AGREEMENT, THE SITE, THE SERVICES, THE
                  INABILITY TO USE THE SERVICES, OR RESULTING FROM ANY GOODS OR
                  SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR
                  TRANSACTIONS ENTERED INTO THROUGH THE SITE OR THE SERVICES.
                  <br />
                </div>
              </div>
              <div className="med-block">
                <h2>Applicable Law</h2>
                <div className="white-bg">
                  <p>
                    The laws of Nuovo Forte's registered office jurisdiction,
                    including without limitation the Electronic Commerce Act
                    (S.O. 2000, c.17, as amended), govern this Agreement without
                    giving effect to principles of conflicts of laws.{" "}
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Disputes</h2>
                <div className="white-bg">
                  <p>
                    If a complaint or dispute arises you and Nuovo Forte will
                    first make good faith and reasonable efforts to utilize
                    Nuovo Forte's internal dispute resolution mechanism or other
                    informal mechanisms in order to resolve the dispute. If the
                    complaint remains unresolved, you and Nuovo Forte will
                    utilize an online alternative dispute resolution ('ADR')
                    service provider-- a cost-effective solution that can bridge
                    both geographic and cultural barriers. You and Nuovo Forte
                    consent to ADR as set forth in this provision as the
                    exclusive means of resolving any dispute in the event that
                    resolution by informal methods is unsuccessful. A party
                    shall initiate any ADR proceeding through an established
                    online alternative dispute resolution provider mutually
                    agreed upon by the parties. In the event that you and Nuovo
                    Forte do not agree on a mutually acceptable online ADR
                    provider, each party shall select an ADR provider and those
                    providers shall select an ADR provider to mediate the
                    dispute. This selection will be binding on you and Nuovo
                    Forte. The ADR provider and the parties must comply with the
                    following rules: (a) the arbitration shall be conducted in
                    the English language solely by telephone, online and/or
                    based on written submissions; (b) the arbitration shall not
                    involve personal appearance by the parties or witnesses
                    unless otherwise mutually agreed by the parties; and (c) any
                    judgment on the award rendered by the arbitrator may be
                    entered in any court of competent jurisdiction. The ADR
                    provider will:{" "}
                  </p>
                  <p>
                    a. give reasonable notice to the parties that their dispute
                    will be heard by the forum;
                    <br />
                    b. provide a clear description of its procedures and costs;
                    <br />
                    c. apply only the laws of Nuovo Forte's registered office
                    jurisdiction in its evaluation and decision;
                    <br />
                    d. provide each party a reasonable opportunity to be heard
                    through the presentation of oral testimony by telephone,
                    online and/or by written argument and documentary evidence
                    and the offering of written argument and documentary
                    evidence in explanation or rebuttal; and
                    <br />
                    e. provide to each of the parties a written statement of its
                    decision and the reasons for the decision, except under
                    circumstances justifying confidentiality.
                    <br />
                  </p>

                  <p>
                    You further acknowledge and agree that our rights in the
                    Content are of a special, unique, extraordinary character,
                    giving them peculiar value, the loss of which cannot be
                    readily estimated or adequately compensated for in monetary
                    damages.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Your Grant</h2>
                <div className="white-bg">
                  <p>
                    By entering into this Agreement and listing an item, you
                    grant us a royalty-free, non-exclusive, worldwide,
                    perpetual, irrevocable right and license to use, reproduce,
                    perform, display, distribute, adapt, modify, re-format,
                    create derivative works of, and otherwise commercially or
                    non-commercially exploit in any manner, any and all of the
                    content you submit to Nuovo Forte and its affiliates, and to
                    sublicense the foregoing rights to our affiliates and
                    operators of any website or other online point of presence
                    (other than the Site) through which the Site and/or products
                    or services or services available thereon are syndicated,
                    offered, merchandised, advertised or described; provided,
                    however, that we will not alter any of your trademarks
                    (i.e., trademarks of yours that you provide to us in
                    non-text form for branding purposes that are separate from
                    and not embedded or otherwise incorporated in any product or
                    service specific information or materials) from the form
                    provided by you (except to re-size trademarks to the extent
                    necessary for presentation, so long as the relative
                    proportions of such trademarks remain the same) and will
                    comply with your removal requests as to specific uses of
                    your trademarks (provided you are unable to do so using
                    standard functionality made available to you via the Site or
                    Services); provided further, however, that nothing in this
                    Agreement will prevent or impair our right to use without
                    your consent the content and any other materials provided by
                    you, to the extent that such use is allowable without a
                    license from you or your affiliates under applicable law
                    (e.g., fair use under copyright law, referential use under
                    trademark law, or valid license from a third party). You
                    represent and warrant that you own or otherwise control all
                    of the rights to the content you submit to Nuovo Forte and
                    its affiliates, and that the use of such materials by Nuovo
                    Forte and its affiliates will not infringe upon or violate
                    the rights of any third party.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>Term and Termination</h2>
                <div className="white-bg">
                  <p>
                    The term of this Agreement will begin upon our acceptance of
                    your Program application and will end when terminated by
                    either you or us. Either you or we may terminate this
                    Agreement at any time, with or without cause, by giving the
                    other party written notice of termination. Upon any
                    termination of this Agreement, any and all licenses you have
                    with respect to the Program will automatically terminate and
                    you will promptly remove from your site or profile and
                    delete or otherwise destroy all links to the Nuovo Forte
                    Site, all Nuovo Forte Marks, and any other materials
                    provided or made available by to you under this Agreement or
                    otherwise in connection with the Program. We may withhold
                    accrued unpaid amounts owing to you for a reasonable period
                    of time following termination to ensure that the correct
                    amount is paid. Upon any termination of this Agreement, all
                    rights and obligations of the parties will be extinguished,
                    except that the rights and obligations of the parties under
                    Sections titled Service Provider or Medical Facility Taxes,
                    Returns and Refunds, Privacy, Use of Nuovo Forte Transaction
                    Information, General Release, and Indemnity/Limitation of
                    Liability, together with any accrued but unpaid payment
                    obligations of either of us under this Agreement, will
                    survive the termination of this Agreement. No termination of
                    this Agreement will relieve either party for any liability
                    for any breach of, or liability accruing under, this
                    Agreement prior to termination.
                  </p>
                </div>
              </div>
              <div className="med-block">
                <h2>General Provisions</h2>
                <div className="white-bg">
                  <div className="smallhead" id="25a">
                    a. Entire Agreement
                  </div>
                  This Agreement, the Terms of Use, Privacy Policy and other
                  Operational Documents incorporated by reference constitute the
                  entire agreement of the parties and supersedes and cancels any
                  prior agreements or understandings of the parties in
                  connection with the subject matter hereof.
                  <br />
                  <div className="smallhead" id="25b">
                    b. Severability
                  </div>
                  If any provision of this Agreement shall be deemed unlawful,
                  void, or for any reason unenforceable, then that provision
                  shall be deemed severable from these terms and conditions and
                  shall not affect the validity and enforceability of any
                  remaining provisions.
                  <br />
                  <div className="smallhead" id="25c">
                    c. No Waiver
                  </div>
                  We will not be considered to have waived any of our rights or
                  remedies described in this Agreement unless the waiver is in
                  writing and signed by us. No delay or omission by us in
                  exercising our rights or remedies will impair or be construed
                  as a waiver. Any single or partial exercise of a right or
                  remedy will not preclude further exercise of any other right
                  or remedy. Nuovo Forte's failure to enforce the strict
                  performance of any provision of this Agreement will not
                  constitute a waiver of Nuovo Forte's right to subsequently
                  enforce such provision or any other provisions of this
                  Agreement.
                  <br />
                  <div className="smallhead" id="25d">
                    d. No Assignment
                  </div>
                  You may not assign this Agreement, by operation of law or
                  otherwise, without our express prior written approval. Subject
                  to that restriction, this Agreement will be binding on, inure
                  to the benefit of, and be enforceable against the parties and
                  their respective successors and assigns.
                  <br />
                  <div className="smallhead" id="25e">
                    e. Conflicts
                  </div>
                  In the event of any conflict between this Agreement and the
                  Operational Documents this Agreement will control over the
                  remainder of the Operational Documents.
                </div>
              </div>
              <div className="med-block">
                <div className="text-center">
                  <p className="footer-txt">© EDataBank 2021</p>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Panel>
  );
});

export default PrivacyandTermsContainer;
