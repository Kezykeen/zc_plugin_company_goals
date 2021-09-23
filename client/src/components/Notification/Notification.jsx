import React, { useState } from 'react';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TimeAgo from 'timeago-react';
import NoNotification from './NoNotification';

import {
  NotificationCount,
  NotificationHeader,
  NotificationSection,
  FlexColumn,
  NotificationWrapper,
  Paragraph,
  Button,
  Grid,
  Section,
  FlexRows,
  FlexRow,
} from './styledNotification';
import { useDispatch } from 'react-redux';
import {
  deleteNotificationAsync,
  markAllNotificationsAsReadAsync,
  markNotificationAsReadAsync,
  selectNotifications,
} from '../../redux/notificationSlice';
import { useSelector } from 'react-redux';

function Notification() {
  const [isActive, setIsActive] = useState(false);
  const [index, setIndex] = useState(0);
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsReadAsync());
  };

  const handleMarkAsRead = (_id) => {
    dispatch(markNotificationAsReadAsync({ id: _id }));
  };

  const handleDelete = (_id) => {
    dispatch(deleteNotificationAsync({ id: _id }));
  };

  const handleAccordion = (e, _id) => {
    if (e.target.name !== 'create-wireframe') {
      setIsActive(!isActive);
      setIndex(_id);
    }
  };

  return (
    <NotificationSection>
      <NotificationWrapper>
        {/* Header */}
        <NotificationHeader>
          <NotificationCount style={{ marginLeft: '30px' }}>{notifications.length}</NotificationCount>
          <Button style={{ marginRight: '30px', color: '#999999', textDecoration: 'none' }}>
            {notifications.length > 0 ? (
              <span style={{ cursor: 'pointer' }} onClick={() => handleMarkAllAsRead()}>
                Mark all as read
              </span>
            ) : (
              'Empty'
            )}
          </Button>
        </NotificationHeader>
        <FlexColumn backgroundWhite>
          {notifications.length > 0 ? (
            <>
              {notifications.map(({ _id, description, header, goalName, colour, isRead, createdAt }) => {
                return (
                  <Grid key={_id} gridActive={_id === index} borderBottom>
                    <MailOutlineIcon style={{ margin: '0 auto', color: '#999999' }} />
                    <FlexColumn>
                      <FlexRows onClick={(e) => handleAccordion(e, _id)} Rows goalachievedTimeline>
                        <FlexColumn flexBasicsColumn>
                          <Paragraph style={{ marginBottom: '10px' }} goalParagraphHeader>
                            {header}
                          </Paragraph>
                          <Button status colour={colour} name="create-wireframe" goalButtonHeaderWireframe>
                            {goalName}
                          </Button>
                        </FlexColumn>
                        <FlexColumn arrowContainer>
                          {index === _id && isActive ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                          <Paragraph flexbasicsParagraph>
                            <TimeAgo datetime={createdAt} />
                          </Paragraph>
                        </FlexColumn>
                      </FlexRows>
                      {index === _id && isActive && (
                        <FlexColumn moreNotificationInfo>
                          <Paragraph moreInfo>{description}</Paragraph>
                          <FlexRows>
                            <Button btnFunction onClick={() => handleDelete(_id)}>
                              Delete
                            </Button>
                            <Button btnFunction onClick={() => handleMarkAsRead(_id)}>
                              {isRead ? 'Mark as Unread' : 'Mark as Read'}
                            </Button>
                          </FlexRows>
                        </FlexColumn>
                      )}
                    </FlexColumn>
                  </Grid>
                );
              })}
            </>
          ) : (
            <>
              <NoNotification />
            </>
          )}
        </FlexColumn>
      </NotificationWrapper>
    </NotificationSection>
  );
}

export default Notification;
