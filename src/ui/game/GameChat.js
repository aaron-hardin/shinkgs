// @flow
import React, { PureComponent as Component } from "react";
import ChatMessages from "../chat/ChatMessages";
import type { GameChatSection, User, Index } from "../../model";

type Props = {
  currentUser: User,
  chatSections: Array<GameChatSection>,
  usersByName: Index<User>,
  onUserDetail: (string) => any,
  actions: AppActions,
};

export default class GameChat extends Component<Props> {
  render() {
    let { currentUser, chatSections, usersByName, onUserDetail } = this.props;
    return (
      <div className="GameChat">
        {chatSections.map(({ nodeId, moveNum, actions, messages }) => (
          <div className="GameChat-section" key={nodeId}>
            <div className="GameChat-section-title">
              {moveNum === 0 ? "Game Start" : `Move ${moveNum}`}
            </div>
            <div className="GameChat-section-actions">
              {actions.map((action) => (
                <div className="GameChat-section-actions-item" key={action}>
                  {action}
                </div>
              ))}
            </div>
            <div className="GameChat-section-messages">
              <ChatMessages
                actions={this.props.actions}
                currentUser={currentUser}
                messages={messages}
                usersByName={usersByName}
                onUserDetail={onUserDetail}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
