import React, { Component } from 'react';
import './App.css';
import { Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, Popover, PopoverHeader, PopoverBody, UncontrolledPopover, Container, Row, Col } from 'reactstrap';
// import $ from 'jquery';

import { CopyToClipboard } from 'react-copy-to-clipboard';
// var HTMLtoJSX = require('html-2-jsx');
import HTMLtoJSX from 'html-2-jsx';
const converterxxx = new HTMLtoJSX({
  indent: '\t',
  createClass: false,
  // hideComment: true,
  // outputClassName: 'AwesomeComponent'
});

class App extends Component {
  
  constructor (props) {
    super(props);
    
    let html = `
  <div class="foo bar" style="width: 400px; padding: 20px 5px; background: white;">
    <h2 data-value="foo">Support SVG attributes</h2>
    <svg height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" fill-rule="evenodd"/></svg>
  </div>
`;
		this.state = {
      visible: true,
      isShowModal: false,
      tooltipOpen: false,
      popoverOpen: false,
      input: html,
      output: 'Tui la output',
      copied: false,
    };
    this.toggleAlert = this.toggleAlert.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.togglePopover = this.togglePopover.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleConvert = this.handleConvert.bind(this);
  }
  
  toggleAlert () {
    this.setState({
      visible: !this.state.visible
    });
  }
  toggleModal () {
    this.setState({
      isShowModal: !this.state.isShowModal
    });
  }
  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleConvert () {
    
    const result = converterxxx.convert(this.state.input);

    this.setState({
      output: result
    });
  }

  componentDidMount () {
    // $('body').css({
    //   background: 'red'
    // });
  }
  render() {
    let {visible, isShowModal, tooltipOpen, input, output, copied} = this.state;
    let myClass = copied ? 'bg' : null;
    return (
      <div className="App">
      <Container>
      <div className="container">
        <Button color="primary">Hello</Button>{' '}
        <Button color="info" onClick={this.toggleAlert}>Toogle Alert</Button> {' '}
        <Button color="secondary">Hello</Button>
        <Alert isOpen={visible} toggle={this.toggleAlert}>Helllo my name is alert</Alert>

        <hr />
        <Button onClick={this.toggleModal}>Toogle Modal</Button>
        <Modal isOpen={isShowModal}>
          <ModalHeader toggle={this.toggleModal}>Modal Title</ModalHeader>
          <ModalBody>
            lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 lorem100 
          </ModalBody>
          <ModalFooter>
              <Button color="info">Submit</Button>
              <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <hr />
        <p>Somewhere in here is a <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">tooltip</span>.</p>
        <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={this.toggleTooltip}>
          Hello world!
        </Tooltip>
        <hr />
        <Button id="Popover1" type="button">
          Launch Popover
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglePopover} trigger="hover">
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
        </Popover>
        <hr />
        <Button id="PopoverLegacy" type="button">
          Launch Popover (Legacy)
        </Button>
        <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
          <PopoverHeader>Legacy Trigger</PopoverHeader>
          <PopoverBody>
            Legacy is a reactstrap special trigger value (outside of bootstrap's spec/standard). Before reactstrap correctly supported click and focus, it had a hybrid which was very useful and has been brought back as trigger="legacy". One advantage of the legacy trigger is that it allows the popover text to be selected while also closing when clicking outside the triggering element and popover itself.</PopoverBody>
        </UncontrolledPopover>
      </div>
      </Container>
      <hr />
      <Container>
        <Row>
          <Col md="6">
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Input textarea</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows={8} name="input" value={input} onChange={this.handleChange} />
            </div>
            <Button color="info" onClick={this.handleConvert}>Convert</Button>
          </Col>
          <Col md="6">
          <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Output Pre</label>
              {/* <textarea className="form-control" id="exampleFormControlTextarea2" rows={8} name="outputx" value={this.state.output} onChange={this.handleChange} /> */}
              <pre className={myClass}>{output}</pre>
            </div>
            <CopyToClipboard text={output}
          onCopy={() => this.setState({copied: true})}>
              <Button color="info">Copy</Button>
            </CopyToClipboard>
            {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default App;
