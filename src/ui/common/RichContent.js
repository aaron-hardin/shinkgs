// @flow
import React, { PureComponent as Component } from "react";
import Autolinker from "autolinker.js";
import { getBoardPositions, nl2br, escapeHtml } from "../../util/string";

type Props = {
  content: ?string,
  firstLineHeading?: ?boolean,
  highlightBoardPositions?: ?boolean,
  actions: AppActions,
};

export class RichContent extends Component<Props> {
  render() {
    let { content, firstLineHeading, highlightBoardPositions, actions } = this.props;
    if (!content || !content.trim()) {
      return null;
    }
    let opts = {
      newWindow: true,
      stripPrefix: false,
      truncate: null,
      className: "RichContent-link",
      urls: true,
      email: true,
      twitter: false,
    };
    let html = nl2br(Autolinker.link(escapeHtml(content), opts));
    if (firstLineHeading) {
      html = html.replace(
        /(.+?)<br>/,
        "<div class='RichContent-heading'>$1</div>"
      );
    }
    if (highlightBoardPositions) {
      const boardPositions = getBoardPositions(html);
      if (boardPositions.length > 0) {
        let newHtml = [];
        let lastIndex = -1;
        for (let key = boardPositions.length - 1; key >= 0; key--) {
          const matchInfo = boardPositions[key];
          let endText = "";
          if (lastIndex > -1) {
            endText = html.substring(matchInfo.index + matchInfo[0].length, lastIndex);
          } else {
            endText = html.substring(matchInfo.index + matchInfo[0].length);
          }
          newHtml.unshift({isBoardPosition: false, text: endText});
          const x = "ABCDEFGHJKLMNOPQRST".indexOf(matchInfo[1].toUpperCase());
          const y = 19-parseInt(matchInfo[2]);
          newHtml.unshift({isBoardPosition: true, text: matchInfo[0], x, y});
          lastIndex = matchInfo.index;
        }
        newHtml.unshift({isBoardPosition: false, text: html.substring(0, lastIndex)});

        return (
          <div className="RichContent">
            {newHtml.map((innerHtml, index) => {
              if (innerHtml.isBoardPosition) {
                return (
                  <b
                    key={index}
                    onMouseOver={event => {actions.onMarkHover({x: innerHtml.x, y: innerHtml.y}); }}
                    onMouseOut={event => {actions.onMarkHover(null); }}
                  >
                    {innerHtml.text}
                  </b>);
              }

              return (<div key={index} className="RichContent" dangerouslySetInnerHTML={{ __html: innerHtml.text }} />);
            })}
          </div>
        )
      }
    }

    return (
      <div className="RichContent" dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
}
