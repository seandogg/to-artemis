import React, {Component, Fragment} from "react"
import { Editor } from "slate-react"
import { Value } from "slate"
import { Icon } from 'react-icons-kit'
import { code } from 'react-icons-kit/feather/code'
import { list } from 'react-icons-kit/feather/list'
import { underline } from 'react-icons-kit/feather/underline'
import { bold, italic } from 'react-icons-kit/feather/'
import { BoldMark, ItalicMark, FormatToolbar } from "./index";

// Update the initial content to be pulled from Local Storage if it exists.
const existingValue = JSON.parse(localStorage.getItem('content'))
const initialValue = Value.fromJSON(
    existingValue || {
      document: {
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: 'A line of text in a paragraph.',
                  },
                ],
              },
            ],
          },
        ],
      },
    }
)

export default class TextEditor extends Component {

  state = {
    value: initialValue,
  }

  // on change update the app's React State with the new editor value
  onChange = ({ value }) => {
    // save the value to local storage
    const content = JSON.stringify(value.toJSON());
    localStorage.setItem('content', content)

    this.setState({ value })

    console.log(content);
  }

  onKeyDown = (e, change) => {

    if (!e.metaKey) {return}
    e.preventDefault()

    // Decide what to do based on key code...
    switch (e.key) {
      case 'b': {
        change.toggleMark('bold');
        return true
      }

      case 'i': {
        change.toggleMark('italic');
        return true
      }

      case 'c': {
        change.toggleMark('code');
        return true
      }

      case 'u': {
        change.toggleMark('underline');
        return true
      }

      case 'l': {
        change.toggleMark('list');
        return true
      }

      default: {
        return;
      }
    }
  }

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />

      case 'italic':
        return <ItalicMark {...props} />

      case 'code':
        return <code>{props.children}</code>

      case 'list':
        return (
            <ul {...props.attributes}>
              <li>{props.children}</li>
            </ul>
        );

      case 'underline':
        return <u {...props.attributes}>{props.children}</u>;
    }
  }

  onMarkClick = (e, type) => {
    e.preventDefault();

    const { value } = this.state;

    const change = value.change().toggleMark(type);

    this.onChange(change);
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }


  render() {
    return (
      <Fragment>
        <FormatToolbar>
          <button onPointerDown={(e) => this.onMarkClick(e, 'bold')}
                  className="tooltip-icon-button"
          >
            <Icon icon={bold} />
          </button>
          <button onPointerDown={(e) => this.onMarkClick(e, 'italic')}
                  className="tooltop-icon-button"
          >
            <Icon icon={italic} />
          </button>
          <button onPointerDown={(e) => this.onMarkClick(e, 'code')}
                  className="tooltop-icon-button"
          >
            <Icon icon={code} />
          </button>
          <button onPointerDown={(e) => this.onMarkClick(e, 'list')}
                  className="tooltop-icon-button"
          >
            <Icon icon={list} />
          </button>
          <button onPointerDown={(e) => this.onMarkClick(e, 'underline')}
                  className="tooltop-icon-button"
          >
            <Icon icon={underline} />
          </button>
        </FormatToolbar>
        <form action="" onSubmit={this.handleSubmit}>
          <Editor
              value={this.state.value}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              renderMark={this.renderMark}
          />
          <button onSubmit={this.handleSubmit}>Save</button>
        </form>
      </Fragment>
    );
  }
}