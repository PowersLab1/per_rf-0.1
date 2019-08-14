import React, {Component} from 'react';
import {aws_saveTaskData, aws_fetchLink} from "../lib/aws_lambda";
import '../lib/external/lab.css';
import './LabJsWrapper.css';

const config = require('../config');
var _ = require('lodash');
var qs = require('query-string');

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
    console.log(this.state.encryptedMetadata);
    if (!_.isUndefined(this.state.encryptedMetadata)) {
      this.addScript(process.env.PUBLIC_URL + '/external/lab.js', () => {
          this.addScript(process.env.PUBLIC_URL + '/script.js');
      });
    }
  }

  componentDidMount() {
    var that = this;
    window.addEventListener('message', function(event) {
      if (event.data.type === 'labjs.data') {
        const data = JSON.parse(event.data.json);

        if (config.debug) {
          console.log(data);
          return;
        }

        // Package data
        const exportData = {};

        exportData.encrypted_metadata = that.state.encryptedMetadata;
        exportData.taskName = config.taskName;
        exportData.taskVersion = config.taskVersion;
        exportData.data = data;

        that.setState({sendingData: true});
        aws_saveTaskData(that.state.encryptedMetadata, JSON.stringify(exportData)).then(
          () => {
            console.log("Saved task data");
            aws_fetchLink(that.state.encryptedMetadata).then(
              (link) => that.setState({link: link})
            );
          }
        );
      }
    });

  }

  addScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.type = "module";
    script.onreadystatechange = callback;
    script.onload = callback;

    document.head.appendChild(script);
  }

  render() {
    if (_.isUndefined(this.state.encryptedMetadata)) {
      return (
        <div>
          <h2>Something went wrong. Please try again.</h2>
        </div>
      );
    } else if (!_.isUndefined(this.state.link)) {
      window.location.assign(this.state.link);
    }

    return (
      <div>
        <div className="container fullscreen" data-labjs-section="main" style={{visibility: this.state.sendingData ? 'hidden' : 'visible'}}>
          <main className="content-vertical-center content-horizontal-center">
            <div>
              <h2>Loading Experiment</h2>
              <p>The experiment is loading and should start in a few seconds</p>
            </div>
          </main>
        </div>
        <div className="center" style={{visibility: this.state.sendingData ? 'visible' : 'hidden'}}>
          <h2>Saving data... do not exit window</h2>
        </div>
      </div>
    );

  } // end render
} // end class

export default LabJsWrapper;
