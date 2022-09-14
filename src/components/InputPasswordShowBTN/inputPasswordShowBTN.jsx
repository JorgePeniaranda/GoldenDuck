import React, { Component } from "react";
import $ from 'jquery'

import './inputPasswordShowBTN.scss';

import formFunctions from '../../utils/formFunctions';

export default class inputPasswordShowBTN extends Component {
  render() {
    const ShowInput = (e) => {
      if (e.target.classList.contains('clicked')){
        $(e.target).next('input').get(0).type = 'password';
        e.target.classList.remove('clicked');
      }
      else{
        $(e.target).next('input').get(0).type = 'text'; 
        e.target.classList.add('clicked');
      }
    }
    const changeSpanColor = (e, color) =>{
      var span = $(e.target).parent().next('span');
      $(span).css('color', color);
    }
    return (
      <div className="passwordContainer">
        <span className="material-icons-outlined" id="showBTN" onClick={(e) => ShowInput(e)}/>
        <input type="password" id="passwordShowInput" name={this.props.name} onChange={e => {
          this.props.onChange(e)
          formFunctions.typingInput(e, 8)
        }} value={this.props.value} placeholder={this.props.placeholder} autoComplete='off' required={this.props.required} onClick={(e) => {
          changeSpanColor(e, 'var(--backColor)');
        }} onBlur={(e) => {
          changeSpanColor(e, '#909497');
        }}
        />
      </div>
    );
  }
}