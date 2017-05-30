// @flow
import React, {PureComponent as Component} from 'react';
import {A} from '../common';

type Props = {
  value: string | number,
  label: string,
  onMinus: Function,
  onPlus: Function
};

export default class ProposalFormInput extends Component {

  props: Props;

  render() {
    let {value, label, onMinus, onPlus} = this.props;
    return (
      <div className='ProposalForm-input'>
        <div className='ProposalForm-input-value'>
          {value}
          {' '}
          <div className='ProposalForm-input-value-label'>{label}</div>
        </div>
        <div className='ProposalForm-input-plusminus'>
          <A button className='ProposalForm-input-minus' onClick={onMinus}>
            –
          </A>
          <A button className='ProposalForm-input-plus' onClick={onPlus}>
            +
          </A>
        </div>
      </div>
    );
  }
}