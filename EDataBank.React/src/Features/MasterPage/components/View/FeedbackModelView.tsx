import {useContext, createContext} from "react";
import {List} from 'antd';
import { Observer, observer } from "mobx-react-lite";
import {feedbackPageStore} from "../../store/FeedbackPageStore"
import { Link } from "@fluentui/react";
import FeedbackActionTakenForm from "../Forms/FeedbackActionTakenForm";

const feedbackPageStoreCtx = createContext(feedbackPageStore);
export const FeedbackModelView = observer(()=>{
    const FeedbackPageStore = useContext(feedbackPageStoreCtx);

    const data = [
        {
          title: "User Email",
          description: FeedbackPageStore.singleFeedback.userEmail
        },
        {
          title: "Open Date",
          description: new Date(FeedbackPageStore.singleFeedback.feedbackOpenDate).toDateString()
        },
        {
          title: "StatusChange Date",
          description: new Date(FeedbackPageStore.singleFeedback.feedbackStatusChangeDate).toDateString()
        },
        {
          title: "Category",
          description: FeedbackPageStore.singleFeedback.feedbackCategory
        },
        {
          title: "Feedback Text",
          description: FeedbackPageStore.singleFeedback.feedbackText
        },
        {
          title: "Feedback Attachment",
          description:FeedbackPageStore.singleFeedback.feedbackAttachment? <Link download={"File."+FeedbackPageStore.singleFeedback.feedbackAttachment.slice(FeedbackPageStore.singleFeedback.feedbackAttachment.indexOf(";")+1,FeedbackPageStore.singleFeedback.feedbackAttachment.indexOf(";"))} href={FeedbackPageStore.singleFeedback.feedbackAttachment}>download attachment</Link>:"No File"
        },
        {
          title: "",
          description: <FeedbackActionTakenForm/>
        },
      ];
    return(
      <>
        <div className="ms-Grid-row">
            <div className="ms-Grid-col md-12">
              <Observer>
                {()=>(
                  <>
                  <List
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a>{item.title}</a>}
                                description={item.description}
                            />
                        </List.Item>
                      )}
                    />
                  </>
                )}
              </Observer>
            </div>
        </div>
      </>
    )
})
export default FeedbackModelView;