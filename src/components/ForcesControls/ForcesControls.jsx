import React, { Component, PropTypes } from 'react';

import {
  Row, Glyphicon,
  Col, DropdownButton,
  MenuItem } from 'react-bootstrap';

import { forceKeys, getForceConfig } from '../../util/forces';

import AttrControl from '../AttrControl/AttrControl';

import './ForcesControls.css';

class ForcesControls extends Component {

  static propTypes = {
    forces: PropTypes.array,
    onForceAdd: PropTypes.func,
    onForceRemove: PropTypes.func,
    onForceUpdate: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.addForce = this.addForce.bind(this);
    this.removeForce = this.removeForce.bind(this);
  }

  addForce(forceId) {
    const { onForceAdd } = this.props;

    onForceAdd(forceId);
  }

  removeForce(index) {
    const { onForceRemove } = this.props;

    onForceRemove(index);
  }


  renderAttr(attr, index, forceIndex) {
    const { onForceUpdate } = this.props;

    return (
      <AttrControl
        key={index}
        attrIndex={index}
        attr={attr}
        forceIndex={forceIndex}
        onChange={onForceUpdate}
      />
    );
  }

  renderForce(forceConfig, index) {
    return (
      <div key={index} className='forceConfig clearfix'>
        <p className='title'>
          <span className='name'>{forceConfig.name}</span>
          <span className='remove'>
            <Glyphicon glyph='remove' onClick={() => this.removeForce(index)} />
          </span>
        </p>
        {forceConfig.attrs.map((a, i) => this.renderAttr(a, i, index))}
      </div>
    );
  }

  renderForceMenuItem(forceConfig) {
    return (
      <MenuItem key={forceConfig.id} eventKey={forceConfig.id}>{forceConfig.name}</MenuItem>
    );
  }

  renderDropdownButton() {
    return (
      <DropdownButton className='forceDropdown' title="Add Force" bsStyle='primary' id="force-button" onSelect={this.addForce}>
        {forceKeys.map((f) => this.renderForceMenuItem(getForceConfig(f)))}
      </DropdownButton>
  );
}

  render() {
    const { forces } = this.props;
    return (
      <div className='ForcesControls'>
        <Row>
          <Col md={5}>
            <h3>Forces</h3>
            <p className='count'>force count: {forces.length}</p>
          </Col>
          <Col md={6} className={'pull-right'}>
            {this.renderDropdownButton()}
          </Col>
        </Row>
        <div>
          {forces.map((f,i) => this.renderForce(f,i))}
        </div>
      </div>
    );
  }
}

export default ForcesControls;
