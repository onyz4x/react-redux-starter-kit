import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'
import { DatePicker } from 'antd';
import { translate } from 'react-i18next';
import i18n from 'i18next';
export const HomeView = ({t}) => (
  <div>
    <h4>Welcome!</h4>
    {t("appName")}
    <img
      alt='This is a duck, because Redux!'
      className={classes.duck}
      src={DuckImage} />
    <DatePicker />

    <input type="button" onClick={()=>{i18n.changeLanguage('en', (err, t) => {});}} value="ToEn"></input>
    <input type="button" onClick={()=>{i18n.changeLanguage('zh', (err, t) => {});}} value="ToZh"></input>
  </div>
)

export default translate()(HomeView)
