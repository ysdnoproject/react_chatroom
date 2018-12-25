import React from 'react';
import PropTypes from 'prop-types';
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

export default class Linkify extends React.Component {
  parse(content) {
    const linkify = new LinkifyIt();
    linkify.tlds(tlds).set({ fuzzyIP: true });
    let matches = linkify.match(content);

    if (!matches) {
      return content;
    }

    let startIndex = 0;
    let elements = [];
    matches.forEach((match, index) => {
      elements.push(content.slice(startIndex, match.index));
      elements.push(<a href={ match.url } key={ index } target="_blank">{ match.raw }</a>);
      startIndex = match.lastIndex;
    });
    elements.push(content.slice(startIndex));

    return elements;
  }

  render() {
    const parsedChildren = this.parse(this.props.children);

    return <span>{ parsedChildren }</span>;
  }
}

Linkify.propTypes = {
  children: PropTypes.string.isRequired
};
