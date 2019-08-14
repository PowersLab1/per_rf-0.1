import React, {Component} from 'react';
import {aws_saveTaskData, aws_fetchLink} from "../lib/aws_lambda";
import '../lib/external/lab.css';

var _ = require('lodash');
var qs = require('query-string');

// Import lab js and add to window
window.lab = require('../lib/external/lab.js');

// Import questlib
require('questlib');

class LabJsWrapper extends Component {
  constructor(props) {
    super(props);

    const params = qs.parse(
      this.props.location.search,
      {ignoreQueryPrefix: true}
    );

    this.state = {
      encryptedMetadata: params.id,
      sendingData: false,
      link: undefined,
    };
  }

  componentDidMount() {
    if (!_.isUndefined(this.state.encryptedMetadata)) {
      this.addScript(process.env.PUBLIC_URL + '/script.js', true);
    }

    /* labjs.data is formatted as follows:
      element0 contains:
        - duration
        -
    */

    window.addEventListener('message', function(event) {
      if (event.data.type === 'labjs.data') {
        const data = event.data.json;
        console.log(data);

        this.setState({sendingData: true});
        aws_saveTaskData(this.state.encryptedMetadata, data).then(
          () => {
            aws_fetchLink(this.state.encryptedMetadata).then(
              (link) => this.setState({link: link})
            );
          }
        );
      }
    });

  }

  addScript(src, defer=false) {
    const script = document.createElement("script");
    script.src = src;
    script.defer = defer;
    document.body.appendChild(script);
  }

  render() {
    if (_.isUndefined(this.state.encryptedMetadata)) {
      return (
        <div>
          <h2>Something went wrong. Please try again.</h2>
        </div>
      );
    } else if (this.state.sendingData) {
      if (!_.isUndefined(this.state.link)) {
        window.location.assign(this.state.link);
      }
      return (
        <div>
          <h2>Please wait... Do not exit window!</h2>
        </div>
      );
    }

    return (
      <div className="container fullscreen" data-labjs-section="main">
        <main className="content-vertical-center content-horizontal-center">
          <div>
            <h2>Loading Experiment</h2>
            <p>The experiment is loading and should start in a few seconds</p>
          </div>
        </main>
      </div>
    );

  } // end render
} // end class

export default LabJsWrapper;
